"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useSidebar } from "./sidebar-context";
import { X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DashboardHeader() {
  const { data: session } = useSession();
  const { toggleSidebar } = useSidebar();
  const [showPremiumAlert, setShowPremiumAlert] = useState(true);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleSidebar}
          >
            <Icons.menu className="h-5 w-5" />
          </Button>
          <Link href="/" className="flex gap-2 text-xl font-bold">
            <span className="text-brand">easybudget</span>
            <span className="text-slate-700">.ing</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    {session.user?.image ? (
                      <AvatarImage src={session.user.image} alt={session.user.name || "User avatar"} />
                    ) : (
                      <AvatarFallback>
                        {session.user.name ? getInitials(session.user.name) : "U"}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
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
                  <Link href="/dashboard/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/billing">Billing</Link>
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
        <div className="bg-brand/10 border-y border-brand/20 py-2 px-4">
          <div className="container flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icons.star className="h-4 w-4 text-brand" />
              <p className="text-sm text-slate-800">
                Upgrade to Premium for unlimited budgets and advanced features.
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="brand" className="h-7 px-2 py-1 text-xs">
                Upgrade
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6"
                onClick={() => setShowPremiumAlert(false)}
              >
                <X className="h-3 w-3" />
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