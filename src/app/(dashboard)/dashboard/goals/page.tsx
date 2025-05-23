"use client";

import { useState, useEffect } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Pencil, Trash2, Save, X, Check, Target, Sparkles } from "lucide-react";
import { format, addMonths, isAfter, differenceInMonths, parseISO } from "date-fns";
import { SkeletonDashboard } from "@/components/ui/skeleton-dashboard";
import { ErrorState } from "@/components/ui/error-state";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Financial Goal interface
interface FinancialGoal {
  id: string;
  title: string;
  description?: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: "savings" | "debt" | "investment" | "expense" | "income" | "other";
  createdAt: string;
}

// Goal category options
const goalCategories = [
  { value: "savings", label: "Savings", icon: <Sparkles className="h-4 w-4 mr-2" /> },
  { value: "debt", label: "Debt Repayment", icon: <Target className="h-4 w-4 mr-2" /> },
  { value: "investment", label: "Investment", icon: <Sparkles className="h-4 w-4 mr-2" /> },
  { value: "expense", label: "Expense Reduction", icon: <Target className="h-4 w-4 mr-2" /> },
  { value: "income", label: "Income Growth", icon: <Sparkles className="h-4 w-4 mr-2" /> },
  { value: "other", label: "Other", icon: <Target className="h-4 w-4 mr-2" /> },
];

export default function FinancialGoalsPage() {
  const [goals, setGoals] = useState<FinancialGoal[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const { isLoading, error } = useTransactions({});
  
  const [newGoal, setNewGoal] = useState<Omit<FinancialGoal, "id" | "createdAt">>({
    title: "",
    description: "",
    targetAmount: 0,
    currentAmount: 0,
    deadline: format(addMonths(new Date(), 6), "yyyy-MM-dd"),
    category: "savings",
  });
  
  const [editGoal, setEditGoal] = useState<Omit<FinancialGoal, "id" | "createdAt">>({
    title: "",
    description: "",
    targetAmount: 0,
    currentAmount: 0,
    deadline: "",
    category: "savings",
  });
  
  // Load goals from localStorage on component mount
  useEffect(() => {
    const savedGoals = localStorage.getItem("financialGoals");
    if (savedGoals) {
      try {
        setGoals(JSON.parse(savedGoals));
      } catch (e) {
        console.error("Error parsing goals from localStorage:", e);
      }
    }
  }, []);
  
  // Save goals to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("financialGoals", JSON.stringify(goals));
  }, [goals]);
  
  // Add a new goal
  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newGoal.title || newGoal.targetAmount <= 0) {
      setErrorMessage("Please provide a title and a valid target amount");
      return;
    }
    
    setIsSubmitting(true);
    setErrorMessage(null);
    
    try {
      const goal: FinancialGoal = {
        ...newGoal,
        id: `goal-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      
      setGoals([...goals, goal]);
      setNewGoal({
        title: "",
        description: "",
        targetAmount: 0,
        currentAmount: 0,
        deadline: format(addMonths(new Date(), 6), "yyyy-MM-dd"),
        category: "savings",
      });
      setShowAddForm(false);
    } catch (error) {
      setErrorMessage("Failed to create goal");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Start editing a goal
  const handleEditStart = (goal: FinancialGoal) => {
    setEditingGoalId(goal.id);
    setEditGoal({
      title: goal.title,
      description: goal.description || "",
      targetAmount: goal.targetAmount,
      currentAmount: goal.currentAmount,
      deadline: goal.deadline,
      category: goal.category,
    });
  };
  
  // Cancel editing
  const handleEditCancel = () => {
    setEditingGoalId(null);
  };
  
  // Save edited goal
  const handleEditSave = (id: string) => {
    if (!editGoal.title || editGoal.targetAmount <= 0) {
      setErrorMessage("Please provide a title and a valid target amount");
      return;
    }
    
    setIsSubmitting(true);
    setErrorMessage(null);
    
    try {
      const updatedGoals = goals.map(goal => 
        goal.id === id ? { ...goal, ...editGoal } : goal
      );
      
      setGoals(updatedGoals);
      setEditingGoalId(null);
    } catch (error) {
      setErrorMessage("Failed to update goal");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Delete a goal
  const handleDeleteGoal = (id: string) => {
    if (!confirm("Are you sure you want to delete this goal?")) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const filteredGoals = goals.filter(goal => goal.id !== id);
      setGoals(filteredGoals);
    } catch (error) {
      setErrorMessage("Failed to delete goal");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Update progress of a goal
  const handleUpdateProgress = (id: string, newAmount: number) => {
    const updatedGoals = goals.map(goal => 
      goal.id === id ? { ...goal, currentAmount: newAmount } : goal
    );
    
    setGoals(updatedGoals);
  };
  
  // Calculate goal progress percentage
  const calculateProgress = (current: number, target: number) => {
    if (target <= 0) return 0;
    const progress = (current / target) * 100;
    return Math.min(progress, 100); // Cap at 100%
  };
  
  // Get status of a goal
  const getGoalStatus = (goal: FinancialGoal) => {
    const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
    const isCompleted = progress >= 100;
    
    if (isCompleted) {
      return { label: "Completed", color: "bg-green-100 text-green-800" };
    }
    
    const deadline = parseISO(goal.deadline);
    const isOverdue = isAfter(new Date(), deadline);
    
    if (isOverdue) {
      return { label: "Overdue", color: "bg-red-100 text-red-800" };
    }
    
    const monthsLeft = differenceInMonths(deadline, new Date());
    
    if (monthsLeft <= 1) {
      return { label: "Urgent", color: "bg-amber-100 text-amber-800" };
    }
    
    return { label: "In Progress", color: "bg-blue-100 text-blue-800" };
  };
  
  // Get color for progress bar based on goal status
  const getProgressColor = (goal: FinancialGoal) => {
    const status = getGoalStatus(goal);
    
    switch (status.label) {
      case "Completed":
        return "bg-green-500";
      case "Overdue":
        return "bg-red-500";
      case "Urgent":
        return "bg-amber-500";
      default:
        return undefined; // Default color
    }
  };
  
  if (isLoading) return <SkeletonDashboard />;
  if (error) return <ErrorState />;
  
  return (
    <div className="flex flex-col space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financial Goals</h1>
          <p className="text-muted-foreground">
            Set and track your financial goals.
          </p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? (
            <>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </>
          ) : (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Goal
            </>
          )}
        </Button>
      </div>

      {errorMessage && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Financial Goal</CardTitle>
            <CardDescription>
              Set a specific, measurable, achievable, relevant, and time-bound goal.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddGoal} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="goal-title">Goal Title</Label>
                  <Input
                    id="goal-title"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                    placeholder="e.g. Emergency Fund"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goal-category">Category</Label>
                  <Select
                    value={newGoal.category}
                    onValueChange={(value) => setNewGoal({
                      ...newGoal,
                      category: value as FinancialGoal["category"]
                    })}
                  >
                    <SelectTrigger id="goal-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {goalCategories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          <div className="flex items-center">
                            {category.icon}
                            {category.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="goal-description">Description (Optional)</Label>
                <Input
                  id="goal-description"
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                  placeholder="Describe your goal in detail"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="goal-target">Target Amount (€)</Label>
                  <Input
                    id="goal-target"
                    type="number"
                    min={0}
                    step="0.01"
                    value={newGoal.targetAmount || ''}
                    onChange={(e) => setNewGoal({...newGoal, targetAmount: parseFloat(e.target.value) || 0})}
                    placeholder="e.g. 10000"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goal-current">Current Amount (€)</Label>
                  <Input
                    id="goal-current"
                    type="number"
                    min={0}
                    step="0.01"
                    value={newGoal.currentAmount || ''}
                    onChange={(e) => setNewGoal({...newGoal, currentAmount: parseFloat(e.target.value) || 0})}
                    placeholder="e.g. 1000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goal-deadline">Target Date</Label>
                  <Input
                    id="goal-deadline"
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                    required
                  />
                </div>
              </div>
              <Button type="submit" disabled={isSubmitting || !newGoal.title || newGoal.targetAmount <= 0}>
                {isSubmitting ? "Adding..." : "Create Goal"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {goals.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Target className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No Financial Goals Yet</h3>
            <p className="text-center text-muted-foreground max-w-md mb-6">
              Set financial goals to help you track your progress towards your financial dreams and aspirations.
            </p>
            <Button onClick={() => setShowAddForm(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Your First Goal
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {goals.map((goal) => (
            <Card key={goal.id} className="bg-white">
              {editingGoalId === goal.id ? (
                /* Editing mode */
                <>
                  <CardHeader>
                    <CardTitle>Edit Goal</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`edit-title-${goal.id}`}>Goal Title</Label>
                      <Input
                        id={`edit-title-${goal.id}`}
                        value={editGoal.title}
                        onChange={(e) => setEditGoal({...editGoal, title: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`edit-category-${goal.id}`}>Category</Label>
                      <Select
                        value={editGoal.category}
                        onValueChange={(value) => setEditGoal({
                          ...editGoal,
                          category: value as FinancialGoal["category"]
                        })}
                      >
                        <SelectTrigger id={`edit-category-${goal.id}`}>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {goalCategories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              <div className="flex items-center">
                                {category.icon}
                                {category.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`edit-description-${goal.id}`}>Description</Label>
                      <Input
                        id={`edit-description-${goal.id}`}
                        value={editGoal.description}
                        onChange={(e) => setEditGoal({...editGoal, description: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`edit-target-${goal.id}`}>Target Amount (€)</Label>
                        <Input
                          id={`edit-target-${goal.id}`}
                          type="number"
                          min={0}
                          step="0.01"
                          value={editGoal.targetAmount || ''}
                          onChange={(e) => setEditGoal({...editGoal, targetAmount: parseFloat(e.target.value) || 0})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`edit-current-${goal.id}`}>Current Amount (€)</Label>
                        <Input
                          id={`edit-current-${goal.id}`}
                          type="number"
                          min={0}
                          step="0.01"
                          value={editGoal.currentAmount || ''}
                          onChange={(e) => setEditGoal({...editGoal, currentAmount: parseFloat(e.target.value) || 0})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`edit-deadline-${goal.id}`}>Target Date</Label>
                        <Input
                          id={`edit-deadline-${goal.id}`}
                          type="date"
                          value={editGoal.deadline}
                          onChange={(e) => setEditGoal({...editGoal, deadline: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={handleEditCancel} disabled={isSubmitting}>
                      Cancel
                    </Button>
                    <Button onClick={() => handleEditSave(goal.id)} disabled={isSubmitting}>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </CardFooter>
                </>
              ) : (
                /* Viewing mode */
                <>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{goal.title}</CardTitle>
                        <CardDescription>
                          {goal.description || "No description provided"}
                        </CardDescription>
                      </div>
                      <Badge className={getGoalStatus(goal).color}>
                        {getGoalStatus(goal).label}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">
                        Category: {goalCategories.find(c => c.value === goal.category)?.label || goal.category}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Target: {format(parseISO(goal.deadline), "MMM d, yyyy")}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-medium">
                        <span>Progress ({Math.round(calculateProgress(goal.currentAmount, goal.targetAmount))}%)</span>
                        <span>€{goal.currentAmount.toFixed(2)} / €{goal.targetAmount.toFixed(2)}</span>
                      </div>
                      <Progress 
                        value={calculateProgress(goal.currentAmount, goal.targetAmount)} 
                        indicatorColor={getProgressColor(goal)}
                      />
                    </div>
                    
                    <div className="pt-2 mt-2 border-t flex flex-wrap gap-2">
                      <div className="space-y-1 flex-1 min-w-[200px]">
                        <Label htmlFor={`progress-${goal.id}`} className="text-xs">
                          Update Progress
                        </Label>
                        <div className="flex space-x-2">
                          <Input
                            id={`progress-${goal.id}`}
                            type="number"
                            min={0}
                            step="10"
                            value={goal.currentAmount}
                            onChange={(e) => handleUpdateProgress(goal.id, parseFloat(e.target.value) || 0)}
                            className="h-8"
                          />
                          <Button 
                            size="sm" 
                            className="h-8 px-2"
                            variant="outline"
                            disabled={goal.currentAmount >= goal.targetAmount}
                            onClick={() => handleUpdateProgress(goal.id, goal.targetAmount)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex space-x-2 items-end">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8"
                          onClick={() => handleEditStart(goal)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8"
                          onClick={() => handleDeleteGoal(goal.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 