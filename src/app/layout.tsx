import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toast";
import { Navbar } from "@/components/navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "BudgetPro - Personal Budget Management",
  description: "Track your expenses, set budgets, and reach your financial goals with our simple yet powerful budgeting app.",
  keywords: ["budget", "finance", "money management", "expense tracker", "financial planning"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
        {children}
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
