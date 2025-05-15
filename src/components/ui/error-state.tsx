import { AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load your data. Please try again later.",
  actionText = "Try again",
  onAction = () => window.location.reload()
}: ErrorStateProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <CardTitle>{title}</CardTitle>
          </div>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-red-50 border border-red-100 rounded-md p-4 text-sm text-red-800">
            We encountered an error while fetching your financial data. This might be due to a connection issue or a temporary problem with our service.
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={onAction}>{actionText}</Button>
        </CardFooter>
      </Card>
    </div>
  );
} 