"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useSidebar } from "./sidebar-context";
import { ChevronLeft, ChevronRight } from "lucide-react";

type DashboardNavProps = React.HTMLAttributes<HTMLElement>;

export function DashboardNav({ className, ...props }: DashboardNavProps) {
  const pathname = usePathname();
  const { isCollapsed, toggleSidebar } = useSidebar();

  const items = [
    {
      title: "Overview",
      href: "/dashboard",
      icon: "layout",
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
      icon: "pieChart",
    },
    {
      title: "Import CSV",
      href: "/dashboard/import/csv",
      icon: "fileText",
    },
    {
      title: "Import PDF",
      href: "/dashboard/import/pdf",
      icon: "fileText",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ];

  return (
    <div className="relative">
      <div 
        className={cn(
          "transition-all duration-300 h-full py-2",
          isCollapsed ? "w-16" : "w-[280px]"
        )}
      >
        <nav 
          className={cn(
            "flex flex-col space-y-2 h-full",
            className
          )} 
          {...props}
        >
          {items.map((item) => {
            const Icon = Icons[item.icon as keyof typeof Icons];
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                  pathname === item.href
                    ? "bg-accent text-accent-foreground"
                    : "transparent",
                  isCollapsed && "justify-center px-0"
                )}
                title={isCollapsed ? item.title : undefined}
              >
                <Icon className={cn("h-5 w-5", isCollapsed ? "mr-0" : "mr-2")} />
                {!isCollapsed && <span>{item.title}</span>}
              </Link>
            );
          })}

          <div className={cn("mt-auto", isCollapsed && "px-0")}>
            {!isCollapsed && (
              <Link href="/dashboard/upgrade">
                <Button
                  className="w-full justify-start bg-brand hover:bg-brand/90"
                  size="sm"
                >
                  <Icons.creditCard className="mr-2 h-4 w-4" />
                  Upgrade to Premium
                </Button>
              </Link>
            )}
          </div>
        </nav>
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-2 h-6 w-6 rounded-full border border-border shadow-sm bg-background hidden md:flex items-center justify-center"
        onClick={toggleSidebar}
      >
        {isCollapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </Button>
    </div>
  );
} 