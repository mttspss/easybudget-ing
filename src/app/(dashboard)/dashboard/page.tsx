"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SparklineChart } from "@/components/dashboard/sparkline-chart";
import { cn } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { SkeletonDashboard } from "@/components/ui/skeleton-dashboard";
import { ErrorState } from "@/components/ui/error-state";
import { useTransactions } from "@/hooks/useTransactions";
import { Transaction as PrismaTransaction, Category } from "@/generated/prisma";
import { Icons } from "@/components/icons";
import { useEffect, useState } from "react";

// Define a custom transaction type that includes the category relationship
interface Transaction extends PrismaTransaction {
  category?: Category | null;
  title: string;
}

// Default budget categories configuration
const defaultBudgetCategories = [
  {
    name: "Food",
    budget: 500,
    color: "#e11d48",
  },
  {
    name: "Utilities",
    budget: 200,
    color: "#3b82f6",
  },
  {
    name: "Entertainment",
    budget: 150,
    color: "#9333ea",
  },
  {
    name: "Health",
    budget: 100,
    color: "#10b981",
  },
];

export default function DashboardPage() {
  const { data: txs, isLoading, error } = useTransactions({});
  const [budgetCategories, setBudgetCategories] = useState<Array<{name: string, spent: number, budget: number, color: string}>>([]);

  useEffect(() => {
    if (txs && txs.length > 0) {
      const transactions = txs as Transaction[];
      const expenseTransactions = transactions.filter(t => t.type === "EXPENSE");
      
      // Get budgets from localStorage if available
      let storedBudgets;
      try {
        storedBudgets = JSON.parse(localStorage.getItem('budgetCategories') || '[]');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_) {
        storedBudgets = [];
      }
      
      // Group expenses by category
      const categorySpending = {} as Record<string, number>;
      
      expenseTransactions.forEach(transaction => {
        const categoryName = transaction.category?.name || 'Uncategorized';
        if (!categorySpending[categoryName]) {
          categorySpending[categoryName] = 0;
        }
        categorySpending[categoryName] += transaction.amount;
      });
      
      // Merge with default categories and budgets from localStorage
      const updatedBudgetCategories = defaultBudgetCategories.map(category => {
        // Find matching stored budget if exists
        const storedBudget = storedBudgets.find((b: {name: string, budget: number}) => b.name === category.name);
        
        return {
          name: category.name,
          spent: categorySpending[category.name] || 0,
          budget: storedBudget?.budget || category.budget,
          color: category.color
        };
      });
      
      setBudgetCategories(updatedBudgetCategories);
    }
  }, [txs]);

  if (isLoading) return <SkeletonDashboard />;
  if (error) {
    console.error("Error loading transactions:", error);
    return <ErrorState />;
  }
  
  console.log("Dashboard received transactions:", txs);
  
  // Cast the transactions to our custom type
  const transactions = txs as Transaction[];
  
  // Calculate KPIs based on transactions
  const totalIncome = transactions.filter((t) => t.type === "INCOME").reduce((s: number, t) => s + t.amount, 0);
  const totalExpenses = transactions.filter((t) => t.type === "EXPENSE").reduce((s: number, t) => s + t.amount, 0);
  const totalBalance = totalIncome - totalExpenses;
  
  // Calculate budget usage
  const totalBudget = budgetCategories.reduce((s: number, c) => s + c.budget, 0);
  const budgetUsage = Math.round((totalExpenses / totalBudget) * 100);
  
  // Get recent transactions (limited to a few for display)
  const recentExpenses = transactions
    .filter((t) => t.type === "EXPENSE")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);
  
  const recentIncomes = transactions
    .filter((t) => t.type === "INCOME")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">Dashboard</h1>
          <p className="text-slate-500">
            Welcome back! Here&apos;s your financial overview.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/expenses">
            <Button variant="outline" className="shadow-sm border-slate-200 hover:bg-slate-50">
              <PlusCircle className="mr-2 h-4 w-4 text-brand" />
              Add Expense
            </Button>
          </Link>
          <Link href="/dashboard/income">
            <Button className="bg-brand hover:bg-brand/90 shadow-md">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Income
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        <Card className="bg-white shadow-sm border-slate-200 hover:shadow-md transition-shadow rounded-xl overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-brand"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total Balance</CardTitle>
            <SparklineChart
              data={[5, 8, 12, 10, 15, 18, 20]}
              color="#22c55e"
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">€{totalBalance.toFixed(2)}</div>
            <p className="text-xs text-emerald-600 flex items-center font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                <path fillRule="evenodd" d="M12 7a1 1 0 11-2 0 1 1 0 012 0zm-1 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v4a1 1 0 102 0V5z" clipRule="evenodd" />
              </svg>
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm border-slate-200 hover:shadow-md transition-shadow rounded-xl overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Income</CardTitle>
            <SparklineChart
              data={[18, 20, 22, 25, 22, 24, 28]}
              color="#3b82f6"
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">€{totalIncome.toFixed(2)}</div>
            <p className="text-xs text-blue-600 flex items-center font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                <path fillRule="evenodd" d="M12 7a1 1 0 11-2 0 1 1 0 012 0zm-1 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v4a1 1 0 102 0V5z" clipRule="evenodd" />
              </svg>
              +10.5% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm border-slate-200 hover:shadow-md transition-shadow rounded-xl overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-red-500"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Expenses</CardTitle>
            <SparklineChart
              data={[12, 15, 10, 18, 19, 15, 14]}
              color="#ef4444"
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">€{totalExpenses.toFixed(2)}</div>
            <p className="text-xs text-red-600 flex items-center font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                <path fillRule="evenodd" d="M12 7a1 1 0 11-2 0 1 1 0 012 0zm-1 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v4a1 1 0 102 0V5z" clipRule="evenodd" />
              </svg>
              +7.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm border-slate-200 hover:shadow-md transition-shadow rounded-xl overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Budget Usage</CardTitle>
            <SparklineChart
              data={[45, 52, 68, 65, 62, 55, 65]}
              color="#f59e0b"
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{budgetUsage}%</div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 mb-1">
              <div 
                className={cn(
                  "h-full rounded-full", 
                  budgetUsage > 80 ? "bg-red-500" : 
                  budgetUsage > 60 ? "bg-amber-500" : "bg-brand"
                )}
                style={{ width: `${Math.min(budgetUsage, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-slate-500 flex justify-between">
              <span>
                <span className="text-amber-600 font-medium">-12%</span> from last month
              </span>
              <span className="font-medium">{totalExpenses.toFixed(0)}€/{totalBudget.toFixed(0)}€</span>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {/* Recent Expenses */}
        <Card className="col-span-1 bg-white shadow-sm border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
          <div className="absolute top-0 left-0 right-0 h-1 bg-red-500"></div>
          <CardHeader className="pb-2 flex flex-row justify-between items-center">
            <div>
              <CardTitle className="text-slate-800">Recent Expenses</CardTitle>
              <CardDescription>
                Your recent expenses from the last 30 days.
              </CardDescription>
            </div>
            <Link href="/dashboard/expenses">
              <Button variant="ghost" size="sm" className="text-brand hover:text-brand hover:bg-brand/5">View All</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="max-h-[320px] overflow-y-auto pr-2 -mr-2 space-y-3">
              {recentExpenses.length > 0 ? (
                recentExpenses.map((expense) => (
                  <div key={expense.id} className="flex items-center p-2 hover:bg-slate-50 rounded-lg transition-colors">
                    <div className="mr-4 flex-shrink-0">
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center shadow-sm",
                          expense.category?.name === "Food" && "bg-rose-50 text-rose-600 hover:bg-rose-50 border-rose-200",
                          expense.category?.name === "Utilities" && "bg-blue-50 text-blue-600 hover:bg-blue-50 border-blue-200",
                          expense.category?.name === "Entertainment" && "bg-purple-50 text-purple-600 hover:bg-purple-50 border-purple-200",
                          expense.category?.name === "Health" && "bg-emerald-50 text-emerald-600 hover:bg-emerald-50 border-emerald-200",
                          !expense.category?.name && "bg-slate-50 text-slate-600 hover:bg-slate-50 border-slate-200"
                        )}
                      >
                        {expense.category?.emoji || expense.category?.name?.charAt(0) || "E"}
                      </Badge>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium leading-none text-slate-800">
                        {expense.title || expense.note || expense.category?.name || "Expense"}
                      </p>
                      <div className="flex items-center text-xs text-slate-500 mt-1">
                        <span>{expense.category?.name || "Other"}</span>
                        <span className="inline-block w-1 h-1 rounded-full bg-slate-300 mx-2"></span>
                        <span>{new Date(expense.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-slate-800">-€{expense.amount.toFixed(2)}</div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                  <div className="w-12 h-12 bg-slate-100 rounded-full mx-auto flex items-center justify-center mb-3">
                    <Icons.creditCard className="h-6 w-6 text-slate-400" />
                  </div>
                  <h3 className="text-sm font-medium text-slate-600 mb-1">No Expenses Yet</h3>
                  <p className="text-xs text-slate-500 max-w-[200px] mx-auto mb-4">Track your spending by adding your first expense.</p>
                  <Link href="/dashboard/expenses">
                    <Button variant="outline" size="sm" className="text-xs h-8">
                      <PlusCircle className="mr-1 h-3 w-3" />
                      Add Expense
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Income */}
        <Card className="col-span-1 bg-white shadow-sm border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
          <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500"></div>
          <CardHeader className="pb-2 flex flex-row justify-between items-center">
            <div>
              <CardTitle className="text-slate-800">Recent Income</CardTitle>
              <CardDescription>
                Your recent income from the last 30 days.
              </CardDescription>
            </div>
            <Link href="/dashboard/income">
              <Button variant="ghost" size="sm" className="text-brand hover:text-brand hover:bg-brand/5">View All</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="max-h-[320px] overflow-y-auto pr-2 -mr-2 space-y-3">
              {recentIncomes.length > 0 ? (
                recentIncomes.map((income) => (
                  <div key={income.id} className="flex items-center p-2 hover:bg-slate-50 rounded-lg transition-colors">
                    <div className="mr-4 flex-shrink-0">
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center shadow-sm",
                          income.category?.name === "Salary" && "bg-emerald-50 text-emerald-600 hover:bg-emerald-50 border-emerald-200",
                          income.category?.name === "Freelance" && "bg-blue-50 text-blue-600 hover:bg-blue-50 border-blue-200",
                          income.category?.name === "Investments" && "bg-amber-50 text-amber-600 hover:bg-amber-50 border-amber-200",
                          !income.category?.name && "bg-slate-50 text-slate-600 hover:bg-slate-50 border-slate-200"
                        )}
                      >
                        {income.category?.emoji || income.category?.name?.charAt(0) || "I"}
                      </Badge>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium leading-none text-slate-800">
                        {income.title || income.note || income.category?.name || "Income"}
                      </p>
                      <div className="flex items-center text-xs text-slate-500 mt-1">
                        <span>{income.category?.name || "Other"}</span>
                        <span className="inline-block w-1 h-1 rounded-full bg-slate-300 mx-2"></span>
                        <span>{new Date(income.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-slate-800">+€{income.amount.toFixed(2)}</div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                  <div className="w-12 h-12 bg-slate-100 rounded-full mx-auto flex items-center justify-center mb-3">
                    <Icons.arrowRight className="h-6 w-6 text-slate-400" />
                  </div>
                  <h3 className="text-sm font-medium text-slate-600 mb-1">No Income Yet</h3>
                  <p className="text-xs text-slate-500 max-w-[200px] mx-auto mb-4">Track your earnings by adding your first income.</p>
                  <Link href="/dashboard/income">
                    <Button variant="outline" size="sm" className="text-xs h-8">
                      <PlusCircle className="mr-1 h-3 w-3" />
                      Add Income
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget Categories Progress */}
      <Card className="bg-white shadow-sm border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-slate-800">Budget Categories</CardTitle>
          <CardDescription>
            Your budget allocation and spending by category.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {budgetCategories.map((category, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: category.color }}></div>
                    <span className="text-sm font-medium text-slate-700">{category.name}</span>
                  </div>
                  <span className="text-sm font-medium text-slate-900">
                    {((category.spent / category.budget) * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full"
                      style={{ 
                        width: `${(category.spent / category.budget) * 100}%`,
                        backgroundColor: category.color
                      }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>€{category.spent}</span>
                  <span>€{category.budget}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 