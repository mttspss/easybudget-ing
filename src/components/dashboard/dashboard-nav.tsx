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
      title: "Reports",
      href: "/dashboard/reports",
      icon: "barChart",
    },
    {
      title: "Goals",
      href: "/dashboard/goals",
      icon: "target",
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
    <div className="h-full flex items-center">
      <div 
        className={cn(
          "h-[95%] transition-all duration-300 rounded-2xl mx-2 shadow-lg border border-border/40 bg-background relative",
          isCollapsed ? "w-16" : "w-[280px]"
        )}
      >
        <nav 
          className={cn(
            "flex flex-col h-full p-3 space-y-3",
            className
          )} 
          {...props}
        >
          {items.map((item) => {
            const Icon = Icons[item.icon as keyof typeof Icons];
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center rounded-xl p-2.5 text-sm font-medium transition-all duration-150 hover:bg-accent hover:text-accent-foreground",
                  isActive
                    ? "bg-brand/10 text-brand"
                    : "text-muted-foreground",
                  isCollapsed && "justify-center"
                )}
                title={isCollapsed ? item.title : undefined}
              >
                <Icon className={cn(
                  "h-5 w-5", 
                  isCollapsed ? "mr-0" : "mr-3",
                  isActive && "text-brand"
                )} />
                {!isCollapsed && <span>{item.title}</span>}
              </Link>
            );
          })}

          {/* Spacer to push premium button to bottom */}
          <div className="flex-1"></div>
          
          {!isCollapsed && (
            <Link href="/dashboard/upgrade" className="mt-auto">
              <Button
                className="w-full justify-start bg-brand hover:bg-brand/90 rounded-xl"
                size="sm"
              >
                <Icons.creditCard className="mr-2 h-4 w-4" />
                Upgrade to Premium
              </Button>
            </Link>
          )}
        </nav>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-[-12px] top-3 h-6 w-6 rounded-full border border-border shadow-sm bg-background flex items-center justify-center"
          onClick={toggleSidebar}
        >
          {isCollapsed ? (
            <ChevronRight className="h-3 w-3" />
          ) : (
            <ChevronLeft className="h-3 w-3" />
          )}
        </Button>
      </div>
    </div>
  );
} 