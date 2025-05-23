"use client";

import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SidebarProvider, useSidebar } from "@/components/dashboard/sidebar-context";
import { FloatingActionButton } from "@/components/transaction/floating-action-button";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();
  
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <DashboardHeader />
      <div className="flex-1 flex overflow-hidden">
        <aside className="fixed top-16 z-40 hidden h-[calc(100vh-4rem)] md:block transition-all duration-300">
          <DashboardNav />
        </aside>
        <main 
          className={`flex-1 overflow-auto p-6 transition-all duration-300 ${
            isCollapsed ? "ml-20" : "ml-20 md:ml-[300px]"
          }`}
        >
          <div className="container mx-auto pb-20 max-w-6xl">
            {/* Page Background Elements */}
            <div className="fixed top-0 right-0 -z-10 w-1/3 h-1/3 bg-gradient-to-b from-brand/5 to-transparent rounded-full blur-3xl"></div>
            <div className="fixed bottom-0 left-1/4 -z-10 w-1/4 h-1/4 bg-gradient-to-t from-blue-500/5 to-transparent rounded-full blur-3xl"></div>
            
            {/* Main Content */}
            {children}
          </div>
        </main>
      </div>
      <FloatingActionButton />
    </div>
  );
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <DashboardContent>{children}</DashboardContent>
    </SidebarProvider>
  );
} 