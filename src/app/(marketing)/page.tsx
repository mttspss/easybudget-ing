import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Manage Your Money Like a Pro
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Track your expenses, set budgets, and reach your financial goals with our simple yet powerful budgeting app.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/auth/signup">
                    <Button className="bg-brand hover:bg-brand/90">Get Started</Button>
                  </Link>
                  <Link href="#features">
                    <Button variant="outline">Learn More</Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-green-100 via-green-50 to-white p-8 shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand/20 to-transparent"></div>
                  <div className="relative flex h-full flex-col justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h2 className="text-xl font-semibold text-brand">Your Budget Summary</h2>
                        <p className="text-sm text-gray-500">May 2023</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                          <div className="text-2xl font-bold">$2,845</div>
                          <div className="text-xs text-gray-500">Income</div>
                        </div>
                        <div className="flex flex-col">
                          <div className="text-2xl font-bold">$1,450</div>
                          <div className="text-xs text-gray-500">Expenses</div>
                        </div>
                        <div className="flex flex-col">
                          <div className="text-2xl font-bold text-brand">$1,395</div>
                          <div className="text-xs text-gray-500">Savings</div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div>Housing</div>
                          <div className="font-medium">$850</div>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-100">
                          <div className="h-full w-[60%] rounded-full bg-brand"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div>Food</div>
                          <div className="font-medium">$350</div>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-100">
                          <div className="h-full w-[25%] rounded-full bg-brand"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div>Transportation</div>
                          <div className="font-medium">$250</div>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-100">
                          <div className="h-full w-[15%] rounded-full bg-brand"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900" id="features">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-brand/10 px-3 py-1 text-sm text-brand">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Everything You Need to Master Your Finances
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our app provides powerful tools to help you take control of your financial life
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col items-center space-y-2 rounded-lg border p-4 shadow-sm">
                  <div className="rounded-full bg-brand/10 p-2 text-brand">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold">{feature.title}</h3>
                  <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-white py-6 dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex gap-2 text-xl font-bold">
              <span className="text-brand">Budget</span>Pro
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              © 2023 BudgetPro. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-xs text-gray-500 hover:underline dark:text-gray-400">
                Terms of Service
              </Link>
              <Link href="#" className="text-xs text-gray-500 hover:underline dark:text-gray-400">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    title: "Expense Tracking",
    description: "Easily track your expenses and categorize them for better financial management",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M20.9 9.9C20.9 16.5 16.5 20.9 9.9 20.9C3.7 20.9 0.1 16.2 0.1 9.9C0.1 5.8 2.6 2.4 6.3 1" />
        <path d="M22.4 13.9L22.4 1.1L9.6 1.1" />
        <path d="M13.4 5.6L22.4 14.6" />
      </svg>
    ),
  },
  {
    title: "Budget Planning",
    description: "Set budgets for different categories and stay on top of your financial goals",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M8 12h8" />
        <path d="M12 8v8" />
      </svg>
    ),
  },
  {
    title: "Financial Insights",
    description: "Get detailed reports and insights to understand your spending habits",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M3 3v18h18" />
        <path d="M7 17l4-4 4 4 6-6" />
      </svg>
    ),
  },
  {
    title: "Goal Setting",
    description: "Set financial goals and track your progress towards achieving them",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Secure Data",
    description: "Your financial data is encrypted and securely stored for your privacy",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: "Mobile Access",
    description: "Access your budgets and financial information from anywhere, anytime",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
  },
]; 