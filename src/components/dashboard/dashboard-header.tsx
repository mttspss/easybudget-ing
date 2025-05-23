"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useSidebar } from "./sidebar-context";
import { X, Sparkles, Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export function DashboardHeader() {
  const { data: session } = useSession();
  const { toggleSidebar } = useSidebar();
  const [showPremiumAlert, setShowPremiumAlert] = useState(true);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between py-2">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-slate-700 hover:bg-slate-100"
            onClick={toggleSidebar}
          >
            <Icons.menu className="h-5 w-5" />
          </Button>
          <Link href="/" className="flex items-center gap-1.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-transparent">
              <Image 
                src="/images/logos/Mylogo.png" 
                alt="easybudget.ing" 
                width={36}
                height={36}
                className="rounded-full"
                priority
              />
            </div>
            <div className="flex text-xl font-bold">
              <span className="text-brand">easybudget</span>
              <span className="text-slate-700">.ing</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative text-slate-600 hover:text-slate-900 hover:bg-slate-100">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1.5 flex h-2 w-2 rounded-full bg-brand"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 rounded-xl" align="end">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="py-2 px-3 text-sm text-slate-500">
                <div className="mb-2 pb-2 border-b">
                  <p className="font-medium text-slate-700">Budget Alert</p>
                  <p>You&apos;ve reached 80% of your Food budget this month.</p>
                  <p className="text-xs mt-1">2 hours ago</p>
                </div>
                <div>
                  <p className="font-medium text-slate-700">System Update</p>
                  <p>We&apos;ve added new features to your dashboard!</p>
                  <p className="text-xs mt-1">1 day ago</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-brand font-medium">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* User Profile */}
          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 gap-2 pl-2 pr-3 rounded-full hover:bg-slate-100">
                  <Avatar className="h-8 w-8 border border-brand/20">
                    {session.user?.image ? (
                      <AvatarImage src={session.user.image} alt={session.user.name || "User avatar"} />
                    ) : (
                      <AvatarFallback className="bg-brand/10 text-brand">
                        {session.user.name ? getInitials(session.user.name) : "U"}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <span className="text-sm font-medium text-slate-700 hidden sm:inline">
                    {session.user.name?.split(' ')[0] || 'Account'}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 rounded-xl" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{session.user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session.user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile" className="cursor-pointer">
                    <Icons.user className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/billing" className="cursor-pointer">
                    <Icons.creditCard className="mr-2 h-4 w-4" />
                    Billing
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings" className="cursor-pointer">
                    <Icons.settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-red-600 focus:text-red-600"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  <Icons.logOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <Icons.close className="mr-2 h-4 w-4" />
              Sign out
            </Button>
          )}
        </div>
      </div>

      {/* Premium Alert Banner */}
      {showPremiumAlert && (
        <div className="bg-gradient-to-r from-brand/20 via-brand/10 to-brand/5 border-y border-brand/20 py-2 px-4">
          <div className="container flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-white/80 backdrop-blur-sm p-1 rounded-full">
                <Sparkles className="h-4 w-4 text-amber-500" />
              </div>
              <p className="text-sm font-medium text-slate-800">
                Upgrade to Premium for unlimited budgets and advanced features.
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="brand" className="h-8 px-3 py-1 text-sm rounded-lg shadow-sm">
                Upgrade Now
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7 rounded-full hover:bg-white/50"
                onClick={() => setShowPremiumAlert(false)}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      )}
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