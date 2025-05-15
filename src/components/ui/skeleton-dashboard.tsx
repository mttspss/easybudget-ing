import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export function SkeletonDashboard() {
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
          <Button variant="outline" disabled>
            <Skeleton className="h-4 w-4 mr-2 rounded-full" />
            Add Expense
          </Button>
          <Button disabled>
            <Skeleton className="h-4 w-4 mr-2 rounded-full" />
            Add Income
          </Button>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="p-4 pb-2">
              <Skeleton className="h-5 w-24" />
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <Skeleton className="h-8 w-32 mb-2" />
              <Skeleton className="h-4 w-20" />
            </CardContent>
          </Card>
        ))}
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
            <Skeleton className="h-8 w-20" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center">
                  <Skeleton className="h-10 w-10 rounded-full mr-4" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-[120px]" />
                    <Skeleton className="h-3 w-[80px]" />
                  </div>
                  <Skeleton className="h-4 w-[60px]" />
                </div>
              ))}
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
            <Skeleton className="h-8 w-20" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center">
                  <Skeleton className="h-10 w-10 rounded-full mr-4" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-[120px]" />
                    <Skeleton className="h-3 w-[80px]" />
                  </div>
                  <Skeleton className="h-4 w-[60px]" />
                </div>
              ))}
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
          <Skeleton className="h-8 w-20" />
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-4 w-[60px]" />
                </div>
                <Skeleton className="h-2 w-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 