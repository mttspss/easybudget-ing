"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { notify } from "@/lib/utils";
import { AnimatedCheck } from "@/components/ui/animated-check";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DemoPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  
  const handleShowToast = (type: 'success' | 'error' | 'info' | 'warning') => {
    const messages = {
      success: "Operation completed successfully!",
      error: "Something went wrong. Please try again.",
      info: "Did you know you can export your budget data?",
      warning: "You're approaching your monthly limit."
    };
    
    notify[type](messages[type]);
  };
  
  const handleSimulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowCheck(true);
      notify.success("Expense added successfully!");
      
      setTimeout(() => {
        setShowCheck(false);
      }, 2000);
    }, 1500);
  };
  
  return (
    <div className="container py-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Micro-interactions Demo</h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Button Ripple Effect</CardTitle>
            <CardDescription>Click the buttons to see the ripple effect</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="brand">Primary Button</Button>
            <Button variant="outline-brand">Outline Button</Button>
            <Button variant="secondary">Secondary Button</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Toast Notifications</CardTitle>
            <CardDescription>Different types of toast notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={() => handleShowToast('success')} variant="outline-brand" className="w-full">
              Success Toast
            </Button>
            <Button onClick={() => handleShowToast('error')} variant="outline-brand" className="w-full">
              Error Toast
            </Button>
            <Button onClick={() => handleShowToast('info')} variant="outline-brand" className="w-full">
              Info Toast
            </Button>
            <Button onClick={() => handleShowToast('warning')} variant="outline-brand" className="w-full">
              Warning Toast
            </Button>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Add Expense Demo</CardTitle>
            <CardDescription>See loading state and success animation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="expense">Expense Name</Label>
                <Input id="expense" placeholder="Lunch" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="amount">Amount</Label>
                <Input id="amount" placeholder="12.50" type="number" step="0.01" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <select 
                  id="category" 
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="food">Food</option>
                  <option value="transport">Transport</option>
                  <option value="entertainment">Entertainment</option>
                </select>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              variant="brand"
              className="w-full" 
              onClick={handleSimulateLoading}
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add Expense"}
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <AnimatedCheck isVisible={showCheck} />
    </div>
  );
} 