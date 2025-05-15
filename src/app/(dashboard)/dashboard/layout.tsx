import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SidebarProvider } from "@/components/dashboard/sidebar-context";
import { FloatingActionButton } from "@/components/transaction/floating-action-button";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col bg-slate-50">
        <DashboardHeader />
        <div className="container flex-1 items-start grid grid-cols-[auto_1fr] md:gap-6 md:pt-8">
          <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-64px)] md:sticky md:block transition-all duration-300">
            <DashboardNav />
          </aside>
          <main className="flex w-full flex-col overflow-hidden p-4 md:p-6">
            {children}
          </main>
        </div>
        <FloatingActionButton />
      </div>
    </SidebarProvider>
  );
} 