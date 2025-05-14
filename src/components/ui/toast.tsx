"use client";

import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster 
      position="bottom-right" 
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          title: "group-[.toast]:text-foreground group-[.toast]:font-semibold",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success: "group-[.toaster]:text-green-500 group-[.toaster]:border-green-500",
          error: "group-[.toaster]:text-red-500 group-[.toaster]:border-red-500",
          info: "group-[.toaster]:text-blue-500 group-[.toaster]:border-blue-500",
          warning: "group-[.toaster]:text-yellow-500 group-[.toaster]:border-yellow-500",
        },
      }}
      closeButton
      richColors
    />
  );
} 