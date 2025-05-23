"use client";

import { useState } from "react";
import { PlusCircle, FileUp, Filter, Search, MoreHorizontal, ArrowUpDown, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
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
import { format, getMonth, getYear } from "date-fns";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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

const months = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

export default function ExpensesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExpense, setSelectedExpense] = useState<Transaction | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  // Filtering state
  const [selectedMonth, setSelectedMonth] = useState<string | null>(months[new Date().getMonth()]);
  const [selectedYear, setSelectedYear] = useState<number | null>(new Date().getFullYear());
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Sorting state
  const [sortField, setSortField] = useState<string>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  
  // Fetch transactions from the API
  const { data: transactions, isLoading, error } = useTransactions({});
  
  if (isLoading) return <SkeletonDashboard />;
  if (error) {
    console.error("Error loading transactions:", error);
    return <ErrorState />;
  }
  
  // Cast the transactions to our custom type and filter only EXPENSE type
  const expenses = (transactions as Transaction[]).filter(t => t.type === "EXPENSE");
  
  // Apply date filtering
  let filteredByDate = expenses;
  if (selectedMonth !== null && selectedYear !== null) {
    const monthIndex = months.indexOf(selectedMonth);
    filteredByDate = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return getMonth(expenseDate) === monthIndex && getYear(expenseDate) === selectedYear;
    });
  }
  
  // Apply category filtering
  let filteredByCategory = filteredByDate;
  if (selectedCategory !== null) {
    filteredByCategory = filteredByDate.filter(expense => 
      expense.category?.name === selectedCategory
    );
  }
  
  // Apply search filtering
  const filteredExpenses = filteredByCategory.filter(
    (expense) =>
      (expense.title?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (expense.note?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (expense.category?.name || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Apply sorting
  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (sortField === "title") {
      const aValue = a.title || "";
      const bValue = b.title || "";
      return sortDirection === "asc" 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    else if (sortField === "date") {
      const aValue = new Date(a.date).getTime();
      const bValue = new Date(b.date).getTime();
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }
    else if (sortField === "amount") {
      return sortDirection === "asc" ? a.amount - b.amount : b.amount - a.amount;
    }
    return 0;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentExpenses = sortedExpenses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedExpenses.length / itemsPerPage);

  // Handle sorting
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Get unique categories from expenses
  const uniqueCategories = Array.from(
    new Set(
      expenses
        .map(expense => expense.category?.name)
        .filter((name): name is string => name !== undefined && name !== null)
    )
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
    return format(new Date(date), "dd MMM yy");
  };

  // Generate the pagination items
  const renderPaginationItems = () => {
    const items = [];
    
    // Add first page
    items.push(
      <PaginationItem key="first">
        <PaginationLink 
          href="#" 
          onClick={(e) => { e.preventDefault(); paginate(1); }} 
          isActive={currentPage === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );
    
    // Add ellipsis if needed
    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Add pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i >= 2 && i < totalPages) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink 
              href="#" 
              onClick={(e) => { e.preventDefault(); paginate(i); }} 
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }
    
    // Add ellipsis if needed
    if (currentPage < totalPages - 2 && totalPages > 3) {
      items.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Add last page if there's more than one page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink 
            href="#" 
            onClick={(e) => { e.preventDefault(); paginate(totalPages); }} 
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return items;
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
          
          {/* Filters */}
          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4" align="end">
              <div className="space-y-4">
                <h4 className="font-medium text-sm">Filter by date</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="month">Month</Label>
                    <Select
                      value={selectedMonth || "all"}
                      onValueChange={(value) => setSelectedMonth(value === "all" ? null : value)}
                    >
                      <SelectTrigger id="month">
                        <SelectValue placeholder="All months" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All months</SelectItem>
                        {months.map((month) => (
                          <SelectItem key={month} value={month}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="year">Year</Label>
                    <Select
                      value={selectedYear?.toString() || "all"}
                      onValueChange={(value) => setSelectedYear(value === "all" ? null : parseInt(value))}
                    >
                      <SelectTrigger id="year">
                        <SelectValue placeholder="All years" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All years</SelectItem>
                        {years.map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <h4 className="font-medium text-sm">Filter by category</h4>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={selectedCategory || "all"}
                    onValueChange={(value) => setSelectedCategory(value === "all" ? null : value)}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="All categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All categories</SelectItem>
                      {uniqueCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex justify-between pt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setSelectedMonth(null);
                      setSelectedYear(null);
                      setSelectedCategory(null);
                      setIsFilterOpen(false);
                    }}
                  >
                    Clear filters
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setIsFilterOpen(false)}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

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

      {/* Current filter summary */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <div>
          {selectedMonth && selectedYear && (
            <>Showing expenses for: <span className="font-medium">{selectedMonth} {selectedYear}</span></>
          )}
          {selectedCategory && (
            <>{selectedMonth && selectedYear ? " in " : "Showing expenses in "}<span className="font-medium">{selectedCategory}</span> category</>
          )}
          {!selectedMonth && !selectedYear && !selectedCategory && (
            <>Showing all expenses</>
          )}
        </div>
      </div>

      {/* Expense table */}
      <Card className="overflow-hidden border-border/40">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <div className="flex items-center cursor-pointer" onClick={() => handleSort("title")}>
                  Title
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Category</TableHead>
              <TableHead>
                <div className="flex items-center cursor-pointer" onClick={() => handleSort("date")}>
                  Date
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="text-right">
                <div className="flex items-center justify-end cursor-pointer" onClick={() => handleSort("amount")}>
                  Amount
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentExpenses.length > 0 ? (
              currentExpenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                        {expense.category?.emoji || "💸"}
                      </div>
                      <div>
                        <div className="font-medium">{expense.title || "Untitled"}</div>
                        <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                          {expense.note || "No description"}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>{formatDate(expense.date)}</TableCell>
                  <TableCell className="text-right font-medium text-red-500">
                    €{expense.amount.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
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
                            setShowEditDialog(true);
                          }}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            if (window.confirm("Are you sure you want to delete this expense?")) {
                              handleDeleteExpense(expense.id);
                            }
                          }}
                          className="text-red-600"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                  No expenses found for the selected filters
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      
        {/* Pagination */}
        {filteredExpenses.length > 0 && (
          <div className="py-4 border-t border-border/20">
            <div className="flex items-center justify-between px-4">
              <div className="text-sm text-muted-foreground">
                Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredExpenses.length)} of {filteredExpenses.length} expenses
              </div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#" 
                      onClick={(e) => { 
                        e.preventDefault(); 
                        if (currentPage > 1) paginate(currentPage - 1); 
                      }} 
                      disabled={currentPage === 1}
                    />
                  </PaginationItem>
                  
                  {renderPaginationItems()}
                  
                  <PaginationItem>
                    <PaginationNext 
                      href="#" 
                      onClick={(e) => { 
                        e.preventDefault(); 
                        if (currentPage < totalPages) paginate(currentPage + 1); 
                      }} 
                      disabled={currentPage === totalPages}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        )}
      </Card>

      {/* Add Expense Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Expense</DialogTitle>
            <DialogDescription>
              Enter the details of your expense.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <AddTransactionForm 
              onSuccess={() => {
                setShowAddDialog(false);
                mutateTransactions();
              }}
              type="EXPENSE"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Expense Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Expense</DialogTitle>
            <DialogDescription>
              Make changes to your expense.
            </DialogDescription>
          </DialogHeader>
          {selectedExpense && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={selectedExpense.title || ""}
                  onChange={(e) => setSelectedExpense({...selectedExpense, title: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={selectedExpense.amount}
                  onChange={(e) => setSelectedExpense({...selectedExpense, amount: parseFloat(e.target.value)})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select 
                  value={selectedExpense.category?.name || ""}
                  onValueChange={(value) => {
                    const selectedCategory = categories.find(cat => cat.name === value);
                    setSelectedExpense({
                      ...selectedExpense, 
                      category: {
                        id: "",
                        name: value,
                        emoji: selectedCategory?.emoji || "💸",
                        userId: "",
                      }
                    })
                  }}
                >
                  <SelectTrigger className="col-span-3">
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
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "col-span-3 justify-start text-left font-normal",
                        !selectedExpense.date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedExpense.date ? format(new Date(selectedExpense.date), "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={new Date(selectedExpense.date)}
                      onSelect={(date) => {
                        if (date) {
                          setSelectedExpense({...selectedExpense, date})
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="note" className="text-right">
                  Note
                </Label>
                <Textarea
                  id="note"
                  value={selectedExpense.note || ""}
                  onChange={(e) => setSelectedExpense({...selectedExpense, note: e.target.value})}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>Cancel</Button>
            <Button type="submit" onClick={handleUpdateExpense}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 