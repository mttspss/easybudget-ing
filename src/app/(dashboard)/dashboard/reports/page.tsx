"use client";

import { useState, useMemo } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { format, subMonths, startOfMonth, endOfMonth, eachMonthOfInterval } from "date-fns";
import { Transaction as PrismaTransaction, Category } from "@/generated/prisma";
import { SkeletonDashboard } from "@/components/ui/skeleton-dashboard";
import { ErrorState } from "@/components/ui/error-state";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

// Extend Transaction with category
interface Transaction extends PrismaTransaction {
  category?: Category | null;
  title: string;
}

// Time period options
const timePeriodOptions = [
  { value: '1', label: 'Last Month' },
  { value: '3', label: 'Last 3 Months' },
  { value: '6', label: 'Last 6 Months' },
  { value: '12', label: 'Last 12 Months' },
];

// Default colors for charts
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

export default function ReportsPage() {
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('3');
  
  // Calculate date range based on selected time period
  const dateRange = useMemo(() => {
    const monthsAgo = parseInt(selectedTimePeriod);
    const endDate = new Date();
    const startDate = subMonths(endDate, monthsAgo);
    return { from: startOfMonth(startDate), to: endOfMonth(endDate) };
  }, [selectedTimePeriod]);
  
  // Fetch transactions for the date range
  const { data: txs, isLoading, error } = useTransactions(dateRange);
  
  // Prepare months for trend chart
  const monthsInRange = useMemo(() => {
    if (!dateRange) return [];
    
    return eachMonthOfInterval({
      start: dateRange.from,
      end: dateRange.to,
    }).map(date => format(date, 'MMM yyyy'));
  }, [dateRange]);
  
  // Process transactions into chart data when data changes
  const {
    categoryData,
    trendData,
    averageMonthlyIncome,
    averageMonthlyExpense,
    savingsRate,
    topExpenseCategories,
    incomeVsExpenseData
  } = useMemo(() => {
    if (!txs || txs.length === 0) {
      return {
        categoryData: [],
        trendData: [],
        averageMonthlyIncome: 0,
        averageMonthlyExpense: 0,
        savingsRate: 0,
        topExpenseCategories: [],
        incomeVsExpenseData: []
      };
    }
    
    const transactions = txs as Transaction[];
    
    // Group transactions by category for pie chart
    const categoryGroups = transactions
      .filter(t => t.type === "EXPENSE")
      .reduce((acc, transaction) => {
        const categoryName = transaction.category?.name || "Uncategorized";
        
        if (!acc[categoryName]) {
          acc[categoryName] = {
            name: categoryName,
            value: 0,
            emoji: transaction.category?.emoji || "📋",
            color: COLORS[Object.keys(acc).length % COLORS.length]
          };
        }
        
        acc[categoryName].value += transaction.amount;
        return acc;
      }, {} as Record<string, { name: string; value: number; emoji: string; color: string }>);
    
    const categoryData = Object.values(categoryGroups).sort((a, b) => b.value - a.value);
    
    // Get top 5 expense categories
    const topExpenseCategories = categoryData.slice(0, 5);
    
    // Group transactions by month for trend chart
    const monthlyData: Record<string, { income: number; expenses: number }> = {};
    
    // Initialize with all months in range
    monthsInRange.forEach(month => {
      monthlyData[month] = { income: 0, expenses: 0 };
    });
    
    // Fill in actual data
    transactions.forEach(transaction => {
      const month = format(new Date(transaction.date), 'MMM yyyy');
      
      if (monthlyData[month]) {
        if (transaction.type === "INCOME") {
          monthlyData[month].income += transaction.amount;
        } else {
          monthlyData[month].expenses += transaction.amount;
        }
      }
    });
    
    // Convert to array for chart
    const trendData = Object.keys(monthlyData).map(month => ({
      month,
      income: monthlyData[month].income,
      expenses: monthlyData[month].expenses,
      savings: monthlyData[month].income - monthlyData[month].expenses
    }));
    
    // Calculate averages
    const monthCount = trendData.length;
    const totalIncome = trendData.reduce((sum, month) => sum + month.income, 0);
    const totalExpenses = trendData.reduce((sum, month) => sum + month.expenses, 0);
    
    const averageMonthlyIncome = monthCount > 0 ? totalIncome / monthCount : 0;
    const averageMonthlyExpense = monthCount > 0 ? totalExpenses / monthCount : 0;
    
    // Calculate savings rate (average monthly savings / average monthly income)
    const savingsRate = averageMonthlyIncome > 0 
      ? ((averageMonthlyIncome - averageMonthlyExpense) / averageMonthlyIncome) * 100 
      : 0;
    
    // Income vs Expense by month (for bar chart)
    const incomeVsExpenseData = trendData.map(item => ({
      month: item.month,
      Income: item.income,
      Expenses: item.expenses
    }));
    
    return {
      categoryData,
      trendData,
      averageMonthlyIncome,
      averageMonthlyExpense,
      savingsRate,
      topExpenseCategories,
      incomeVsExpenseData
    };
  }, [txs, monthsInRange]);
  
  if (isLoading) return <SkeletonDashboard />;
  if (error) return <ErrorState />;
  
  return (
    <div className="flex flex-col space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financial Reports</h1>
          <p className="text-muted-foreground">
            Analyze your finances with advanced reports and insights.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={selectedTimePeriod} onValueChange={setSelectedTimePeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              {timePeriodOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" className="hidden md:flex">
            <ArrowDown className="mr-2 h-4 w-4" />
            Export Reports
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Monthly Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{averageMonthlyIncome.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              For {format(dateRange.from, 'MMM yyyy')} - {format(dateRange.to, 'MMM yyyy')}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Monthly Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{averageMonthlyExpense.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              For {format(dateRange.from, 'MMM yyyy')} - {format(dateRange.to, 'MMM yyyy')}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{savingsRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              (Income - Expenses) / Income
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="trends" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="trends">Income & Expense Trends</TabsTrigger>
          <TabsTrigger value="categories">Spending by Category</TabsTrigger>
          <TabsTrigger value="comparison">Monthly Comparison</TabsTrigger>
        </TabsList>
        
        {/* Income & Expense Trends */}
        <TabsContent value="trends" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Income & Expense Trends</CardTitle>
              <CardDescription>
                Track your income, expenses, and savings over time.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                {trendData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={trendData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value: number) => `€${value.toFixed(2)}`} />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="income" 
                        name="Income"
                        stroke="#3b82f6" 
                        fill="#93c5fd" 
                        stackId="1" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="expenses" 
                        name="Expenses"
                        stroke="#ef4444" 
                        fill="#fca5a5" 
                        stackId="2" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="savings" 
                        name="Savings"
                        stroke="#10b981" 
                        fill="#6ee7b7" 
                        stackId="3" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full bg-slate-50 rounded-md">
                    <p className="text-muted-foreground">No trend data available</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Spending by Category */}
        <TabsContent value="categories" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Spending by Category</CardTitle>
              <CardDescription>
                Breakdown of your expenses by category.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Category Pie Chart */}
                <div>
                  <h3 className="text-base font-medium mb-4 text-center">Expense Distribution</h3>
                  {categoryData.length > 0 ? (
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            fill="#8884d8"
                            paddingAngle={1}
                            dataKey="value"
                            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                          >
                            {categoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value: number) => `€${value.toFixed(2)}`} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-[300px] bg-slate-50 rounded-md">
                      <p className="text-muted-foreground">No category data available</p>
                    </div>
                  )}
                </div>
                
                {/* Top Expense Categories */}
                <div>
                  <h3 className="text-base font-medium mb-4 text-center">Top Expense Categories</h3>
                  {topExpenseCategories.length > 0 ? (
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          layout="vertical"
                          data={topExpenseCategories}
                          margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis 
                            type="category" 
                            dataKey="name" 
                            tick={{ fontSize: 12 }}
                            width={100}
                          />
                          <Tooltip formatter={(value: number) => `€${value.toFixed(2)}`} />
                          <Legend />
                          <Bar 
                            dataKey="value" 
                            name="Amount" 
                            radius={[0, 4, 4, 0]}
                          >
                            {topExpenseCategories.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-[300px] bg-slate-50 rounded-md">
                      <p className="text-muted-foreground">No expense data available</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Monthly Comparison */}
        <TabsContent value="comparison" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Income vs Expense Comparison</CardTitle>
              <CardDescription>
                Compare your monthly income and expenses side by side.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                {incomeVsExpenseData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={incomeVsExpenseData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value: number) => `€${value.toFixed(2)}`} />
                      <Legend />
                      <Bar dataKey="Income" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full bg-slate-50 rounded-md">
                    <p className="text-muted-foreground">No comparison data available</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Additional insights */}
      {averageMonthlyIncome > 0 && (
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Financial Insights</CardTitle>
            <CardDescription>
              Smart analysis of your financial situation.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium">Savings Rate Analysis</h3>
              <p className="text-sm text-muted-foreground">
                {savingsRate < 10 
                  ? "Your savings rate is below 10%. Consider reducing discretionary expenses to increase savings."
                  : savingsRate < 20
                    ? "Your savings rate is good at 10-20%. With some adjustments, you could reach 20%."
                    : "Great job! Your savings rate is above 20%, which is excellent for long-term financial health."
                }
              </p>
            </div>
            
            {topExpenseCategories.length > 0 && (
              <div>
                <h3 className="font-medium">Top Spending Category</h3>
                <p className="text-sm text-muted-foreground">
                  Your highest spending is in the <strong>{topExpenseCategories[0].name}</strong> category
                  ({((topExpenseCategories[0].value / averageMonthlyExpense) * 100).toFixed(1)}% of your monthly expenses).
                  {((topExpenseCategories[0].value / averageMonthlyExpense) * 100) > 35 
                    ? " This category represents a significant portion of your budget. Consider if there are opportunities to reduce these expenses."
                    : " This is a reasonable allocation for this category."
                  }
                </p>
              </div>
            )}
            
            {trendData.length >= 2 && (
              <div>
                <h3 className="font-medium">Monthly Trend</h3>
                <p className="text-sm text-muted-foreground">
                  {trendData[trendData.length - 1].expenses > trendData[trendData.length - 2].expenses
                    ? "Your expenses increased in the most recent month compared to the previous month. Review your spending to identify areas for potential savings."
                    : "Your expenses decreased in the most recent month compared to the previous month. Keep up the good work!"
                  }
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
} 