"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDropzone } from "react-dropzone";
import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { mutateTransactions } from "@/hooks/useTransactions";
import Image from "next/image";

// Define transaction types
type TransactionType = "EXPENSE" | "INCOME";

// Define form schema
const formSchema = z.object({
  amount: z.coerce.number().positive("Amount must be positive"),
  category: z.string().min(1, "Category is required"),
  date: z.date(),
  title: z.string().min(1, "Title is required"),
  note: z.string().optional(),
  emoji: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Categories based on transaction type
const expenseCategories = [
  { name: "Food", emoji: "🍔" },
  { name: "Utilities", emoji: "💡" },
  { name: "Entertainment", emoji: "🎬" },
  { name: "Health", emoji: "⚕️" },
  { name: "Transportation", emoji: "🚗" },
  { name: "Housing", emoji: "🏠" },
  { name: "Shopping", emoji: "🛍️" },
  { name: "Travel", emoji: "✈️" },
  { name: "Education", emoji: "📚" },
  { name: "Other", emoji: "📌" },
];

const incomeCategories = [
  { name: "Salary", emoji: "💼" },
  { name: "Freelance", emoji: "💻" },
  { name: "Investments", emoji: "📈" },
  { name: "Business", emoji: "🏢" },
  { name: "Tax", emoji: "📝" },
  { name: "Rental", emoji: "🏘️" },
  { name: "Gift", emoji: "🎁" },
  { name: "Other", emoji: "📌" },
];

interface AddTransactionFormProps {
  type: TransactionType;
  onSuccess: () => void;
}

export function AddTransactionForm({ type, onSuccess }: AddTransactionFormProps) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  // Get appropriate categories based on transaction type
  const categories = type === "EXPENSE" ? expenseCategories : incomeCategories;
  
  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      category: "",
      date: new Date(),
      title: "",
      note: "",
      emoji: categories[0].emoji,
    },
  });
  
  // Dropzone for image uploads
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
    },
    maxFiles: 1,
    onDrop: acceptedFiles => {
      // Convert file to data URL for preview
      const file = acceptedFiles[0];
      const reader = new FileReader();
      
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      
      reader.readAsDataURL(file);
    }
  });
  
  const onSubmit = async (data: FormValues) => {
    try {
      // Create transaction data object with type, image, and other form data
      const transactionData = {
        type,
        amount: data.amount,
        title: data.title,
        category: data.category, // Pass the category name
        emoji: data.emoji,       // Pass the emoji
        date: data.date,
        note: data.note,
        imageUrl: previewImage,
      };
      
      console.log("Submitting transaction:", transactionData);
      
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(transactionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save transaction");
      }

      const savedTransaction = await response.json();
      console.log("Saved transaction:", savedTransaction);

      // Reset form
      form.reset();
      setPreviewImage(null);
      
      // Update data without revalidation
      mutateTransactions();
      
      // Close dialog
      onSuccess();
      
      // Show success toast
      toast.success("Transaction saved successfully ✅");
    } catch (error) {
      console.error("Transaction error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to save transaction");
    }
  };
  
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {/* Title */}
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input 
          id="title"
          placeholder="e.g. Monthly Salary, Grocery Shopping"
          {...form.register("title")}
        />
        {form.formState.errors.title && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.title.message}
          </p>
        )}
      </div>
      
      {/* Emoji and Category */}
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-1">
          <Label htmlFor="emoji">Icon</Label>
          <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-10 text-2xl"
                type="button"
              >
                {form.watch("emoji") || "📌"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <EmojiPicker
                onEmojiClick={(emojiData) => {
                  form.setValue("emoji", emojiData.emoji);
                  setShowEmojiPicker(false);
                }}
                width="100%"
                height={350}
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="col-span-4">
          <Label htmlFor="category">Category</Label>
          <Select
            value={form.watch("category")}
            onValueChange={(value) => {
              form.setValue("category", value);
              // Also set the emoji based on category
              const selectedCategory = categories.find(cat => cat.name === value);
              if (selectedCategory) {
                form.setValue("emoji", selectedCategory.emoji);
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.name} value={category.name}>
                  <div className="flex items-center">
                    <span className="mr-2">{category.emoji}</span>
                    <span>{category.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {form.formState.errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.category.message}
            </p>
          )}
        </div>
      </div>
      
      {/* Amount and Date */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="amount">Amount (€)</Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            placeholder="0.00"
            {...form.register("amount")}
          />
          {form.formState.errors.amount && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.amount.message}
            </p>
          )}
        </div>
        
        <div>
          <Label>Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-10 justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {form.watch("date") ? (
                  format(form.watch("date"), "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={form.watch("date")}
                onSelect={(date) => date && form.setValue("date", date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      {/* Notes */}
      <div>
        <Label htmlFor="note">Notes</Label>
        <Textarea
          id="note"
          placeholder="Add details about this transaction..."
          className="min-h-[100px]"
          {...form.register("note")}
        />
      </div>
      
      {/* Image Upload */}
      <div>
        <Label>Attach Receipt/Image</Label>
        {previewImage ? (
          <div className="relative mt-2 inline-block">
            <Image
              src={previewImage}
              alt="Upload preview"
              className="max-w-full max-h-[200px] rounded-md"
              width={200}
              height={200}
              style={{ objectFit: 'contain', maxHeight: '200px' }}
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8 rounded-full"
              onClick={() => setPreviewImage(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div
            {...getRootProps()}
            className="border-2 border-dashed rounded-md p-6 mt-2 text-center cursor-pointer hover:bg-slate-50 transition"
          >
            <input {...getInputProps()} />
            <Upload className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Drag & drop an image here, or click to select
            </p>
          </div>
        )}
      </div>
      
      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting ? (
          "Saving..."
        ) : (
          `Add ${type === "INCOME" ? "Income" : "Expense"}`
        )}
      </Button>
    </form>
  );
} 