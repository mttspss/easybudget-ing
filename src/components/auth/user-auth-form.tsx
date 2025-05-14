"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  isSignUp?: boolean;
}

export function UserAuthForm({
  isSignUp = false,
  ...props
}: UserAuthFormProps) {
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false);
  const searchParams = useSearchParams();

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    await signIn("google", {
      callbackUrl: searchParams?.get("callbackUrl") || "/dashboard",
    });
    setIsGoogleLoading(false);
  };

  return (
    <div className="grid gap-6" {...props}>
      <Button
        variant="outline"
        type="button"
        disabled={isGoogleLoading}
        onClick={handleGoogleSignIn}
        className="w-full"
      >
        {isGoogleLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        {isSignUp ? "Sign up with Google" : "Sign in with Google"}
      </Button>
    </div>
  );
} 