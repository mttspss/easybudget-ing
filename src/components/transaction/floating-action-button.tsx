"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AddTransactionForm } from "./add-transaction-form";

export function FloatingActionButton() {
  const [open, setOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<"EXPENSE" | "INCOME">("EXPENSE");

  const openExpenseDialog = () => {
    setTransactionType("EXPENSE");
    setOpen(true);
  };

  const openIncomeDialog = () => {
    setTransactionType("INCOME");
    setOpen(true);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 flex flex-col space-y-2 z-50">
        {/* Quick action buttons that appear when hovering */}
        <div className="flex flex-col gap-2 mb-2 transition-all duration-200 ease-in-out opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto translate-y-2 group-hover:translate-y-0">
          <Button
            size="icon"
            className="rounded-full shadow-md bg-red-500 hover:bg-red-600 h-12 w-12 transition-transform duration-200 hover:-translate-y-1"
            onClick={openExpenseDialog}
          >
            <span className="sr-only">Add Expense</span>
            <span className="text-lg font-semibold">-</span>
          </Button>
          <Button
            size="icon"
            className="rounded-full shadow-md bg-green-500 hover:bg-green-600 h-12 w-12 transition-transform duration-200 hover:-translate-y-1"
            onClick={openIncomeDialog}
          >
            <span className="sr-only">Add Income</span>
            <span className="text-lg font-semibold">+</span>
          </Button>
        </div>

        {/* Main FAB */}
        <div className="group">
          <Button
            size="icon"
            className="relative rounded-full shadow-xl bg-brand hover:bg-brand/90 h-14 w-14 transition-transform duration-200 hover:-translate-y-1"
            onClick={() => setOpen(true)}
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {transactionType === "EXPENSE" ? "Add Expense" : "Add Income"}
            </DialogTitle>
          </DialogHeader>
          <AddTransactionForm 
            type={transactionType} 
            onSuccess={() => setOpen(false)} 
          />
        </DialogContent>
      </Dialog>
    </>
  );
} 