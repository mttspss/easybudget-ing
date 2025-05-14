"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  
  // Nascondi la navbar nelle pagine di dashboard
  const isDashboardPage = pathname?.startsWith("/dashboard");
  if (isDashboardPage) {
    return null;
  }

  const scrollToSection = (sectionId: string) => {
    if (isHomePage && typeof window !== "undefined") {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 max-w-[1200px] items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link href="/">
            <span className="text-2xl font-bold text-brand">easybudget.ing</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex gap-6">
          {isHomePage ? (
            <>
              <button 
                onClick={() => scrollToSection("features")} 
                className="text-slate-500 hover:text-brand cursor-pointer"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection("pricing")} 
                className="text-slate-500 hover:text-brand cursor-pointer"
              >
                Pricing
              </button>
              <button 
                onClick={() => scrollToSection("faq")} 
                className="text-slate-500 hover:text-brand cursor-pointer"
              >
                FAQ
              </button>
            </>
          ) : (
            <>
              <Link href="/#features" className="text-slate-500 hover:text-brand">
                Features
              </Link>
              <Link href="/#pricing" className="text-slate-500 hover:text-brand">
                Pricing
              </Link>
              <Link href="/#faq" className="text-slate-500 hover:text-brand">
                FAQ
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {isLoading ? (
            // Loading state
            <Button variant="outline" size="sm" disabled>
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              Loading
            </Button>
          ) : session ? (
            // User is signed in
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    {session.user?.image ? (
                      <AvatarImage src={session.user.image} alt={session.user.name || "User avatar"} />
                    ) : (
                      <AvatarFallback>
                        {session.user?.name ? getInitials(session.user.name) : "U"}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{session.user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session.user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            // User is not signed in
            <>
              <Button 
                variant="ghost"
                size="sm"
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                className="hidden md:inline-flex"
              >
                Sign in
              </Button>
              <Button 
                variant="brand"
                size="sm"
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              >
                Get Started
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

// Helper function to get initials from name
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
} 