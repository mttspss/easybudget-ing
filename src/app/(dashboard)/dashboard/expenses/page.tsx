"use client";

import { useState } from "react";
import { PlusCircle, FileUp, Filter, Search, MoreHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { AddTransactionForm } from "@/components/transaction/add-transaction-form";
import { useTransactions, mutateTransactions } from "@/hooks/useTransactions";
import { Transaction as PrismaTransaction, Category } from "@/generated/prisma";
import { format } from "date-fns";
import { SkeletonDashboard } from "@/components/ui/skeleton-dashboard";
import { ErrorState } from "@/components/ui/error-state";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

// Define a custom transaction type that includes the category relationship
interface Transaction extends PrismaTransaction {
  category?: Category | null;
  title: string;
}

const categories = [
  { name: "Food", color: "#e11d48", emoji: "🍔" },
  { name: "Utilities", color: "#3b82f6", emoji: "💡" },
  { name: "Entertainment", color: "#9333ea", emoji: "🎬" },
  { name: "Health", color: "#10b981", emoji: "⚕️" },
  { name: "Transportation", color: "#f59e0b", emoji: "🚗" },
  { name: "Housing", color: "#6366f1", emoji: "🏠" },
  { name: "Shopping", color: "#ec4899", emoji: "🛍️" },
  { name: "Travel", color: "#0ea5e9", emoji: "✈️" },
  { name: "Education", color: "#8b5cf6", emoji: "📚" },
  { name: "Other", color: "#6b7280", emoji: "📌" },
];

export default function ExpensesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExpense, setSelectedExpense] = useState<Transaction | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  
  // Fetch transactions from the API
  const { data: transactions, isLoading, error } = useTransactions({});
  
  if (isLoading) return <SkeletonDashboard />;
  if (error) {
    console.error("Error loading transactions:", error);
    return <ErrorState />;
  }
  
  // Cast the transactions to our custom type and filter only EXPENSE type
  const expenses = (transactions as Transaction[]).filter(t => t.type === "EXPENSE");
  
  // Filter expenses based on search query
  const filteredExpenses = expenses.filter(
    (expense) =>
      (expense.title?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (expense.note?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (expense.category?.name || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteExpense = async (id: string) => {
    try {
      const response = await fetch(`/api/transactions?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete transaction');
      }

      // Refresh the data
      mutateTransactions();
      toast.success("Transaction deleted successfully");
    } catch (error) {
      console.error('Delete error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to delete transaction');
    }
  };

  const handleUpdateExpense = async () => {
    if (!selectedExpense) return;

    try {
      const response = await fetch('/api/transactions', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          id: selectedExpense.id,
          amount: selectedExpense.amount,
          title: selectedExpense.title,
          category: selectedExpense.category?.name,
          emoji: selectedExpense.category?.emoji,
          date: selectedExpense.date,
          note: selectedExpense.note,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update transaction');
      }

      // Refresh the data
      mutateTransactions();
      setShowEditDialog(false);
      toast.success("Transaction updated successfully");
    } catch (error) {
      console.error('Update error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update transaction');
    }
  };

  const handleImportCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real application, you would process the CSV here
      alert("CSV import functionality would be implemented here.");
      e.target.value = "";
    }
  };

  // Helper function to format dates consistently
  const formatDate = (date: Date) => {
    return format(new Date(date), "yyyy-MM-dd");
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
          <p className="text-muted-foreground">
            Track and manage your expenses
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search expenses..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" title="Filter expenses">
            <Filter className="h-4 w-4" />
          </Button>

          {/* Import CSV button */}
          <label
            htmlFor="csvImport"
            className="cursor-pointer"
          >
            <div className="flex items-center justify-center bg-white text-primary hover:bg-slate-100 h-9 px-4 py-2 rounded-md text-sm font-medium border border-input">
              <FileUp className="mr-2 h-4 w-4" />
              Import
            </div>
            <input
              id="csvImport"
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleImportCSV}
            />
          </label>

          {/* Add Expense button */}
          <Button onClick={() => setShowAddDialog(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Expense
          </Button>
        </div>
      </div>

      {/* Expense list */}
      <div className="grid gap-4">
        {filteredExpenses.length > 0 ? (
          filteredExpenses.map((expense) => (
            <Card key={expense.id} className="bg-white">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full p-3 bg-primary/10 text-primary text-lg flex items-center justify-center h-12 w-12">
                      {expense.category?.emoji || "💸"}
                    </div>
                    <div className="flex flex-col">
                      <div className="font-semibold text-lg">{expense.title || "Untitled"}</div>
                      <div className="text-muted-foreground text-sm">{expense.note || "No description"}</div>
                      <div className="mt-1 flex flex-wrap gap-1">
                        <Badge variant="outline" className={cn(
                          expense.category?.name === "Food" && "bg-rose-100 text-rose-600 hover:bg-rose-100",
                          expense.category?.name === "Utilities" && "bg-blue-100 text-blue-600 hover:bg-blue-100",
                          expense.category?.name === "Entertainment" && "bg-purple-100 text-purple-600 hover:bg-purple-100",
                          expense.category?.name === "Health" && "bg-emerald-100 text-emerald-600 hover:bg-emerald-100",
                          expense.category?.name === "Transportation" && "bg-amber-100 text-amber-600 hover:bg-amber-100",
                          expense.category?.name === "Housing" && "bg-indigo-100 text-indigo-600 hover:bg-indigo-100",
                          expense.category?.name === "Shopping" && "bg-pink-100 text-pink-600 hover:bg-pink-100",
                          expense.category?.name === "Travel" && "bg-sky-100 text-sky-600 hover:bg-sky-100",
                          expense.category?.name === "Education" && "bg-violet-100 text-violet-600 hover:bg-violet-100",
                          expense.category?.name === "Other" && "bg-gray-100 text-gray-600 hover:bg-gray-100",
                        )}>
                          {expense.category?.name || "Uncategorized"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-xl font-bold">€{expense.amount.toFixed(2)}</div>
                    <div className="text-muted-foreground text-sm">{formatDate(expense.date)}</div>
                    
                    <div className="mt-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem 
                            onClick={() => {
                              setSelectedExpense(expense);
                              setSelectedDate(new Date(expense.date));
                              setShowEditDialog(true);
                            }}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDeleteExpense(expense.id)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="bg-white">
            <CardContent className="flex flex-col items-center justify-center p-8">
              <div className="mb-4 h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center">
                <PlusCircle className="h-7 w-7 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium">No expense records found</h3>
              <p className="mt-1 text-center text-muted-foreground">
                {searchQuery ? "Try adjusting your search filters" : "Add your first expense to get started"}
              </p>
              <Button 
                onClick={() => setShowAddDialog(true)}
                className="mt-4"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Expense
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add Expense Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Expense</DialogTitle>
            <DialogDescription>
              Add a new expense record to your budget
            </DialogDescription>
          </DialogHeader>
          
          <AddTransactionForm 
            type="EXPENSE"
            onSuccess={() => setShowAddDialog(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Expense Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Expense</DialogTitle>
            <DialogDescription>
              Modify this expense record
            </DialogDescription>
          </DialogHeader>
          
          {selectedExpense && (
            <div className="grid gap-4 py-4">
              {/* Title field */}
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  placeholder="e.g. Grocery Shopping"
                  value={selectedExpense.title || ""}
                  onChange={(e) => setSelectedExpense({
                    ...selectedExpense,
                    title: e.target.value
                  })}
                />
              </div>

              {/* Amount field */}
              <div className="grid gap-2">
                <Label htmlFor="edit-amount">Amount (€)</Label>
                <Input
                  id="edit-amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={selectedExpense.amount || 0}
                  onChange={(e) => setSelectedExpense({
                    ...selectedExpense,
                    amount: parseFloat(e.target.value) || 0
                  })}
                />
              </div>

              {/* Category field */}
              <div className="grid gap-2">
                <Label htmlFor="edit-category">Category</Label>
                <Select
                  value={selectedExpense.category?.name || ""}
                  onValueChange={(value) => {
                    const selectedCategory = categories.find(c => c.name === value);
                    setSelectedExpense({
                      ...selectedExpense,
                      category: {
                        ...selectedExpense.category,
                        name: value,
                        emoji: selectedCategory?.emoji || "💸"
                      } as Category
                    });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.name} value={category.name}>
                        <div className="flex items-center">
                          <span className="mr-2">{category.emoji}</span>
                          <span>{category.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date field */}
              <div className="grid gap-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Select a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        setSelectedDate(date);
                        if (date) {
                          setSelectedExpense({
                            ...selectedExpense,
                            date: date
                          });
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Notes field */}
              <div className="grid gap-2">
                <Label htmlFor="edit-note">Notes</Label>
                <Textarea
                  id="edit-note"
                  placeholder="Add some notes..."
                  value={selectedExpense.note || ""}
                  onChange={(e) => setSelectedExpense({
                    ...selectedExpense,
                    note: e.target.value
                  })}
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateExpense}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 