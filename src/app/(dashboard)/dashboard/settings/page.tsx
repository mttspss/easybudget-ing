"use client";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Tag, 
  CreditCard, 
  Bell, 
  Download, 
  Languages, 
  UserCircle2, 
  Shield 
} from "lucide-react";
import Link from "next/link";

const settingsLinks = [
  {
    title: "Categories",
    description: "Manage your transaction categories",
    icon: Tag,
    href: "/dashboard/settings/categories",
    available: true,
  },
  {
    title: "Profile",
    description: "Manage your account settings",
    icon: UserCircle2,
    href: "/dashboard/settings/profile",
    available: false,
  },
  {
    title: "Currency",
    description: "Change your default currency",
    icon: CreditCard,
    href: "/dashboard/settings/currency",
    available: false,
  },
  {
    title: "Security",
    description: "Change password and security settings",
    icon: Shield,
    href: "/dashboard/settings/security",
    available: false,
  },
  {
    title: "Notifications",
    description: "Manage your notification preferences",
    icon: Bell,
    href: "/dashboard/settings/notifications",
    available: false,
  },
  {
    title: "Export Data",
    description: "Export your financial data",
    icon: Download,
    href: "/dashboard/settings/export",
    available: false,
  },
  {
    title: "Language",
    description: "Change your language preference",
    icon: Languages,
    href: "/dashboard/settings/language",
    available: false,
  },
];

export default function SettingsPage() {
  return (
    <div className="flex flex-col space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and application preferences.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {settingsLinks.map((link) => (
          <Card key={link.href} className={`transition-all ${!link.available && 'opacity-50'}`}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">{link.title}</CardTitle>
                <link.icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <CardDescription>{link.description}</CardDescription>
            </CardHeader>
            <CardFooter className="pt-1">
              {link.available ? (
                <Link href={link.href} className="w-full">
                  <Button variant="outline" className="w-full">
                    Manage
                  </Button>
                </Link>
              ) : (
                <Button variant="outline" className="w-full" disabled>
                  Coming soon
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
} 