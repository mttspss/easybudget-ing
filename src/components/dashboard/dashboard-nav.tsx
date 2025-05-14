"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";

interface DashboardNavProps extends React.HTMLAttributes<HTMLElement> {}

export function DashboardNav({ className, ...props }: DashboardNavProps) {
  const pathname = usePathname();

  const items = [
    {
      title: "Overview",
      href: "/dashboard",
      icon: "settings",
    },
    {
      title: "Expenses",
      href: "/dashboard/expenses",
      icon: "creditCard",
    },
    {
      title: "Income",
      href: "/dashboard/income",
      icon: "arrowRight",
    },
    {
      title: "Budget",
      href: "/dashboard/budget",
      icon: "pizza",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ];

  return (
    <nav className={cn("flex flex-col space-y-2", className)} {...props}>
      {items.map((item) => {
        const Icon = Icons[item.icon as keyof typeof Icons];
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === item.href
                ? "bg-accent text-accent-foreground"
                : "transparent"
            )}
          >
            <Icon className="mr-2 h-4 w-4" />
            <span>{item.title}</span>
          </Link>
        );
      })}

      <div className="mt-auto">
        <Link href="/dashboard/upgrade">
          <Button
            className="w-full justify-start bg-brand hover:bg-brand/90"
            size="sm"
          >
            <Icons.creditCard className="mr-2 h-4 w-4" />
            Upgrade to Premium
          </Button>
        </Link>
      </div>
    </nav>
  );
} 