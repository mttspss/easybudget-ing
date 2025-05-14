import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from "sonner"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Toast notifications
export const notify = {
  success: (message: string) => {
    toast.success(message)
  },
  error: (message: string) => {
    toast.error(message)
  },
  info: (message: string) => {
    toast(message)
  },
  warning: (message: string) => {
    toast(message, {
      style: {
        backgroundColor: "hsl(var(--background))",
        border: "1px solid hsl(var(--warning))",
      },
      icon: "⚠️",
    })
  },
}
