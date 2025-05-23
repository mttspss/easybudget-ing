"use client";

import { useState, useEffect, useMemo } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { PlusCircle, AlertCircle, Pencil, Save, X, Trash2 } from "lucide-react";
import { format, subMonths, startOfMonth, endOfMonth } from "date-fns";
import { Transaction as PrismaTransaction, Category } from "@/generated/prisma";
import { SkeletonDashboard } from "@/components/ui/skeleton-dashboard";
import { ErrorState } from "@/components/ui/error-state";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Extend Transaction with category
interface Transaction extends PrismaTransaction {
  category?: Category | null;
  title: string;
}

// Budget Category with spent amount
interface BudgetCategory {
  id: string;
  name: string;
  emoji: string;
  budget: number;
  spent: number;
  color: string;
}

// Month selection for historical data
const monthOptions = [
  { value: '0', label: 'Current Month' },
  { value: '1', label: 'Last Month' },
  { value: '2', label: '2 Months Ago' },
  { value: '3', label: '3 Months Ago' }
];

// Default colors for budget categories
const COLORS = [
  "#e11d48", // Rose
  "#3b82f6", // Blue
  "#9333ea", // Purple
  "#10b981", // Emerald
  "#f59e0b", // Amber
  "#06b6d4", // Cyan
  "#8b5cf6", // Violet
  "#84cc16", // Lime
  "#64748b", // Slate
  "#ec4899", // Pink
];

export default function BudgetPage() {
  // State for category budgets
  const [budgets, setBudgets] = useState<BudgetCategory[]>([]);
  const [selectedMonth, setSelectedMonth] = useState('0');
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [tempBudget, setTempBudget] = useState<number>(0);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', emoji: '💰', budget: 0, color: COLORS[0] });
  
  // Calculate date range based on selected month
  const dateRange = useMemo(() => {
    const monthsAgo = parseInt(selectedMonth);
    const startDate = startOfMonth(subMonths(new Date(), monthsAgo));
    const endDate = endOfMonth(subMonths(new Date(), monthsAgo));
    return { from: startDate, to: endDate };
  }, [selectedMonth]);
  
  // Fetch transactions for selected date range
  const { data: txs, isLoading, error } = useTransactions(dateRange);
  
  useEffect(() => {
    if (txs && txs.length > 0) {
      // Extract all expense categories from transactions
      const transactions = txs as Transaction[];
      const expenseTransactions = transactions.filter(t => t.type === "EXPENSE");
      
      // Group expenses by category and calculate spent amounts
      const categorySpending = expenseTransactions.reduce((acc, transaction) => {
        const categoryId = transaction.categoryId || 'uncategorized';
        const categoryName = transaction.category?.name || 'Uncategorized';
        const categoryEmoji = transaction.category?.emoji || '📋';
        
        if (!acc[categoryId]) {
          acc[categoryId] = {
            id: categoryId,
            name: categoryName,
            emoji: categoryEmoji,
            budget: 0, // Will be populated from saved budgets
            spent: 0,
            color: COLORS[Object.keys(acc).length % COLORS.length]
          };
        }
        
        acc[categoryId].spent += transaction.amount;
        return acc;
      }, {} as Record<string, BudgetCategory>);
      
      // TODO: In the future, fetch budgets from the API
      // For now, simulate loading saved budgets
      const savedBudgets = JSON.parse(localStorage.getItem('budgetCategories') || '[]');
      const mergedBudgets = Object.values(categorySpending).map(category => {
        const savedBudget = savedBudgets.find((b: BudgetCategory) => b.id === category.id);
        return {
          ...category,
          budget: savedBudget?.budget || 0,
          color: savedBudget?.color || category.color
        };
      });
      
      setBudgets(mergedBudgets);
    }
  }, [txs]);
  
  // Save budgets to localStorage (will be replaced with API call)
  const saveBudgets = () => {
    localStorage.setItem('budgetCategories', JSON.stringify(budgets));
  };
  
  // Update a specific budget
  const updateBudget = (categoryId: string, newBudget: number) => {
    setBudgets(budgets.map(b => 
      b.id === categoryId ? { ...b, budget: newBudget } : b
    ));
    setEditingCategoryId(null);
    saveBudgets();
  };
  
  // Add a new budget category
  const addNewCategory = () => {
    if (newCategory.name && newCategory.budget > 0) {
      const newCategoryObj = {
        id: `new-${Date.now()}`, // Temporary ID until we have API
        name: newCategory.name,
        emoji: newCategory.emoji,
        budget: newCategory.budget,
        spent: 0,
        color: newCategory.color
      };
      
      setBudgets([...budgets, newCategoryObj]);
      setNewCategory({ name: '', emoji: '💰', budget: 0, color: COLORS[0] });
      setShowAddForm(false);
      
      // Save updated budgets
      localStorage.setItem('budgetCategories', JSON.stringify([...budgets, newCategoryObj]));
    }
  };
  
  // Remove a budget category
  const removeCategory = (categoryId: string) => {
    const updatedBudgets = budgets.filter(b => b.id !== categoryId);
    setBudgets(updatedBudgets);
    localStorage.setItem('budgetCategories', JSON.stringify(updatedBudgets));
  };
  
  // Calculate total budget and spent
  const totalBudget = budgets.reduce((sum, category) => sum + category.budget, 0);
  const totalSpent = budgets.reduce((sum, category) => sum + category.spent, 0);
  const budgetUsage = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;
  
  // Prepare data for pie chart
  const pieChartData = budgets
    .filter(category => category.budget > 0) // Only show categories with a budget
    .map(category => ({
      name: category.name,
      value: category.budget,
      color: category.color
    }));
  
  // Prepare data for bar chart comparison
  const barChartData = budgets
    .filter(category => category.budget > 0) // Only show categories with a budget
    .map(category => ({
      name: category.name,
      budget: category.budget,
      spent: category.spent
    }));
  
  if (isLoading) return <SkeletonDashboard />;
  if (error) return <ErrorState />;
  
  return (
    <div className="flex flex-col space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Budget Management</h1>
          <p className="text-muted-foreground">
            Set and track your spending budgets by category.
          </p>
        </div>
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            {monthOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Budget Summary Cards */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{totalBudget.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Budget allocated across {budgets.filter(b => b.budget > 0).length} categories
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{totalSpent.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              For {format(dateRange.from, 'MMMM yyyy')}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Budget Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{budgetUsage}%</div>
            <Progress value={budgetUsage} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {totalBudget > 0 
                ? totalSpent > totalBudget 
                  ? `€${(totalSpent - totalBudget).toFixed(2)} over budget` 
                  : `€${(totalBudget - totalSpent).toFixed(2)} remaining`
                : "No budget set"
              }
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="categories" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="categories">Budget Categories</TabsTrigger>
          <TabsTrigger value="charts">Budget Charts</TabsTrigger>
          <TabsTrigger value="trends">Spending Trends</TabsTrigger>
        </TabsList>
        
        {/* Budget Categories Tab */}
        <TabsContent value="categories" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Budget Categories</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowAddForm(!showAddForm)}
                >
                  {showAddForm ? <X className="h-4 w-4 mr-1" /> : <PlusCircle className="h-4 w-4 mr-1" />}
                  {showAddForm ? "Cancel" : "Add Category"}
                </Button>
              </div>
              <CardDescription>
                Set monthly spending limits for each category.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add Category Form */}
              {showAddForm && (
                <div className="bg-slate-50 p-4 rounded-lg mb-6 border border-slate-200">
                  <h3 className="text-sm font-medium mb-3">Add New Budget Category</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <Label htmlFor="category-name">Category Name</Label>
                      <Input 
                        id="category-name" 
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                        placeholder="e.g. Groceries"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category-emoji">Emoji</Label>
                      <Input 
                        id="category-emoji" 
                        value={newCategory.emoji}
                        onChange={(e) => setNewCategory({...newCategory, emoji: e.target.value})}
                        placeholder="e.g. 🛒"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category-budget">Monthly Budget</Label>
                      <Input 
                        id="category-budget" 
                        type="number"
                        value={newCategory.budget || ''}
                        onChange={(e) => setNewCategory({...newCategory, budget: parseFloat(e.target.value) || 0})}
                        placeholder="e.g. 200"
                      />
                    </div>
                    <div className="flex items-end">
                      <Button onClick={addNewCategory} className="w-full">
                        Add Category
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Budget Categories List */}
              <div className="space-y-4">
                {budgets.length === 0 ? (
                  <Alert variant="default" className="bg-slate-50 border-slate-200">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>No budget categories</AlertTitle>
                    <AlertDescription>
                      You haven&apos;t created any budget categories yet. Add your first category to start tracking your spending.
                    </AlertDescription>
                  </Alert>
                ) : (
                  budgets.map((category) => (
                    <div 
                      key={category.id} 
                      className="p-4 border rounded-lg bg-white hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <Badge
                            variant="outline"
                            className="px-2 py-1 rounded-md mr-2"
                            style={{ backgroundColor: `${category.color}20`, color: category.color, borderColor: `${category.color}40` }}
                          >
                            {category.emoji}
                          </Badge>
                          <h3 className="font-medium">{category.name}</h3>
                        </div>
                        <div className="flex space-x-2">
                          {editingCategoryId === category.id ? (
                            <>
                              <Input
                                type="number"
                                className="w-24 h-8"
                                value={tempBudget}
                                onChange={(e) => setTempBudget(parseFloat(e.target.value) || 0)}
                              />
                              <Button 
                                size="icon" 
                                variant="ghost" 
                                onClick={() => updateBudget(category.id, tempBudget)}
                              >
                                <Save className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="icon" 
                                variant="ghost" 
                                onClick={() => setEditingCategoryId(null)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button 
                                size="icon" 
                                variant="ghost" 
                                onClick={() => {
                                  setEditingCategoryId(category.id);
                                  setTempBudget(category.budget);
                                }}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="icon" 
                                variant="ghost" 
                                onClick={() => removeCategory(category.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div>
                          <span className="text-sm text-muted-foreground">Budget</span>
                          <p className="font-medium">€{category.budget.toFixed(2)}</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Spent</span>
                          <p className="font-medium">€{category.spent.toFixed(2)}</p>
                        </div>
                      </div>
                      
                      {/* Progress bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>{category.budget > 0 ? `${Math.min(Math.round((category.spent / category.budget) * 100), 100)}%` : '0%'}</span>
                          {category.budget > 0 && (
                            <span>
                              {category.spent > category.budget 
                                ? <span className="text-red-500">Over budget by €{(category.spent - category.budget).toFixed(2)}</span>
                                : <span className="text-green-600">€{(category.budget - category.spent).toFixed(2)} remaining</span>
                              }
                            </span>
                          )}
                        </div>
                        <Progress 
                          value={category.budget > 0 ? Math.min((category.spent / category.budget) * 100, 100) : 0} 
                          className={cn(
                            "h-2",
                            category.spent > category.budget && "text-red-500"
                          )}
                          indicatorColor={category.spent > category.budget ? "bg-red-500" : undefined}
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Budget Charts Tab */}
        <TabsContent value="charts" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Budget Allocation and Spending</CardTitle>
              <CardDescription>
                Visual breakdown of your budget and current spending by category.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Budget Allocation Pie Chart */}
                <div>
                  <h3 className="text-base font-medium mb-4 text-center">Budget Allocation</h3>
                  {pieChartData.length > 0 ? (
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            fill="#8884d8"
                            paddingAngle={1}
                            dataKey="value"
                            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                          >
                            {pieChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value: number) => `€${value.toFixed(2)}`} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-[300px] bg-slate-50 rounded-md">
                      <p className="text-muted-foreground">No budget data available</p>
                    </div>
                  )}
                </div>
                
                {/* Budget vs Spending Bar Chart */}
                <div>
                  <h3 className="text-base font-medium mb-4 text-center">Budget vs Spending</h3>
                  {barChartData.length > 0 ? (
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={barChartData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip formatter={(value: number) => `€${value.toFixed(2)}`} />
                          <Legend />
                          <Bar dataKey="budget" fill="#3b82f6" name="Budget" />
                          <Bar dataKey="spent" fill="#ef4444" name="Spent" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-[300px] bg-slate-50 rounded-md">
                      <p className="text-muted-foreground">No spending data available</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Spending Trends Tab */}
        <TabsContent value="trends" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Spending Trends</CardTitle>
              <CardDescription>
                Track your spending patterns over time.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <Alert className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Coming Soon</AlertTitle>
                  <AlertDescription>
                    Spending trends and historical data will be available in a future update.
                  </AlertDescription>
                </Alert>
                <div className="flex items-center justify-center h-[300px] bg-slate-50 rounded-md">
                  <p className="text-muted-foreground">Historical data will be shown here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 