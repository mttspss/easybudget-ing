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

// Define a custom transaction type that includes the category relationship
interface Transaction extends PrismaTransaction {
  category?: Category | null;
  title: string;
}

// Categories based on transaction type
const budgetCategories = [
  {
    name: "Food",
    spent: 320,
    budget: 500,
    color: "#e11d48",
  },
  {
    name: "Utilities",
    spent: 150,
    budget: 200,
    color: "#3b82f6",
  },
  {
    name: "Entertainment",
    spent: 90,
    budget: 150,
    color: "#9333ea",
  },
  {
    name: "Health",
    spent: 60,
    budget: 100,
    color: "#10b981",
  },
];

export default function DashboardPage() {
  const { data: txs, isLoading, error } = useTransactions({});

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
    .slice(0, 3);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your financial dashboard.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/expenses">
            <Button variant="outline">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Expense
            </Button>
          </Link>
          <Link href="/dashboard/income">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Income
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <SparklineChart
              data={[5, 8, 12, 10, 15, 18, 20]}
              color="#22c55e"
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{totalBalance.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Income</CardTitle>
            <SparklineChart
              data={[18, 20, 22, 25, 22, 24, 28]}
              color="#3b82f6"
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{totalIncome.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              +10.5% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expenses</CardTitle>
            <SparklineChart
              data={[12, 15, 10, 18, 19, 15, 14]}
              color="#ef4444"
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{totalExpenses.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              +7.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Usage</CardTitle>
            <SparklineChart
              data={[45, 52, 68, 65, 62, 55, 65]}
              color="#f59e0b"
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{budgetUsage}%</div>
            <p className="text-xs text-muted-foreground">
              -12% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {/* Recent Expenses */}
        <Card className="col-span-1 bg-white">
          <CardHeader className="pb-2 flex flex-row justify-between items-center">
            <div>
              <CardTitle>Recent Expenses</CardTitle>
              <CardDescription>
                Your recent expenses from the last 30 days.
              </CardDescription>
            </div>
            <Link href="/dashboard/expenses">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="max-h-[320px] overflow-y-auto pr-2 -mr-2 space-y-4">
              {recentExpenses.map((expense) => (
                <div key={expense.id} className="flex items-center">
                  <div className="mr-4 flex-shrink-0">
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "px-2 py-1 rounded-md flex items-center justify-center",
                        expense.category?.name === "Food" && "bg-rose-100 text-rose-600 hover:bg-rose-100",
                        expense.category?.name === "Utilities" && "bg-blue-100 text-blue-600 hover:bg-blue-100",
                        expense.category?.name === "Entertainment" && "bg-purple-100 text-purple-600 hover:bg-purple-100",
                        expense.category?.name === "Health" && "bg-emerald-100 text-emerald-600 hover:bg-emerald-100"
                      )}
                    >
                      {expense.category?.emoji || expense.category?.name?.charAt(0) || "E"}
                    </Badge>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-none">
                      {expense.title || expense.note || expense.category?.name || "Expense"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {expense.category?.name || "Other"}
                    </p>
                  </div>
                  <div className="text-sm font-medium">€{expense.amount.toFixed(2)}</div>
                </div>
              ))}
              {recentExpenses.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No expenses recorded yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Income */}
        <Card className="col-span-1 bg-white">
          <CardHeader className="pb-2 flex flex-row justify-between items-center">
            <div>
              <CardTitle>Recent Income</CardTitle>
              <CardDescription>
                Your recent income from the last 30 days.
              </CardDescription>
            </div>
            <Link href="/dashboard/income">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="max-h-[320px] overflow-y-auto pr-2 -mr-2 space-y-4">
              {recentIncomes.map((income) => (
                <div key={income.id} className="flex items-center">
                  <div className="mr-4 flex-shrink-0">
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "px-2 py-1 rounded-md flex items-center justify-center",
                        income.category?.name === "Salary" && "bg-emerald-100 text-emerald-600 hover:bg-emerald-100",
                        income.category?.name === "Freelance" && "bg-blue-100 text-blue-600 hover:bg-blue-100",
                        income.category?.name === "Investments" && "bg-amber-100 text-amber-600 hover:bg-amber-100"
                      )}
                    >
                      {income.category?.emoji || income.category?.name?.charAt(0) || "I"}
                    </Badge>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-none">
                      {income.title || income.note || income.category?.name || "Income"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {income.category?.name || "Other"}
                    </p>
                  </div>
                  <div className="text-sm font-medium">€{income.amount.toFixed(2)}</div>
                </div>
              ))}
              {recentIncomes.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No income recorded yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget Summary */}
      <Card className="col-span-1 bg-white">
        <CardHeader className="pb-2 flex flex-row justify-between items-center">
          <div>
            <CardTitle>Budget Summary</CardTitle>
            <CardDescription>
              Your budget allocation for this month.
            </CardDescription>
          </div>
          <Link href="/dashboard/budget">
            <Button variant="ghost" size="sm">View Details</Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {budgetCategories.map((category) => {
              const percentUsed = Math.floor((category.spent / category.budget) * 100);
              return (
                <div key={category.name} className="space-y-2">
                  <div className="grid grid-cols-2 items-center">
                    <div className="flex items-center">
                      <div
                        className="mr-2 h-3 w-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                        aria-hidden="true"
                      />
                      <span className="text-sm">{category.name}</span>
                    </div>
                    <div className="text-right text-sm font-medium">
                      €{category.spent} / €{category.budget}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-full rounded-full bg-secondary relative" role="progressbar" aria-valuenow={percentUsed} aria-valuemin={0} aria-valuemax={100}>
                      <div
                        className="h-full rounded-full absolute inset-0"
                        style={{
                          width: `${percentUsed}%`,
                          backgroundColor: category.color,
                        }}
                      >
                        <span className="sr-only">{percentUsed}% used</span>
                      </div>
                    </div>
                    <div className="w-9 text-xs text-slate-700 font-medium">
                      {percentUsed}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 