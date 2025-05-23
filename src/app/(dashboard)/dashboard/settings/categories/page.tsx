"use client";

import { useState } from "react";
import { useCategories, CategoryFormData } from "@/hooks/useCategories";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Pencil, Trash2, Save, X } from "lucide-react";
import { SkeletonDashboard } from "@/components/ui/skeleton-dashboard";
import { ErrorState } from "@/components/ui/error-state";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function CategoriesPage() {
  const { categories, isLoading, error, createCategory, updateCategory, deleteCategory } = useCategories();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState<CategoryFormData>({ name: "", emoji: "💸" });
  const [editCategory, setEditCategory] = useState<CategoryFormData>({ name: "", emoji: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Handle form submission for new category
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.name) return;
    
    setIsSubmitting(true);
    setErrorMessage(null);
    
    try {
      await createCategory(newCategory);
      setNewCategory({ name: "", emoji: "💸" });
      setShowAddForm(false);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to create category");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Start editing a category
  const handleEditStart = (id: string, name: string, emoji: string) => {
    setEditingCategoryId(id);
    setEditCategory({ name, emoji });
  };

  // Cancel editing
  const handleEditCancel = () => {
    setEditingCategoryId(null);
    setEditCategory({ name: "", emoji: "" });
  };

  // Save edited category
  const handleEditSave = async (id: string) => {
    if (!editCategory.name) return;
    
    setIsSubmitting(true);
    setErrorMessage(null);
    
    try {
      await updateCategory(id, editCategory);
      setEditingCategoryId(null);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to update category");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete a category
  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category? This won't delete your transactions, but they will no longer be categorized.")) {
      return;
    }
    
    setIsSubmitting(true);
    setErrorMessage(null);
    
    try {
      await deleteCategory(id);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to delete category");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <SkeletonDashboard />;
  if (error) return <ErrorState />;

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">
            Manage your transaction categories.
          </p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? (
            <>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </>
          ) : (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Category
            </>
          )}
        </Button>
      </div>

      {errorMessage && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Category</CardTitle>
            <CardDescription>
              Create a new category for your transactions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category-name">Category Name</Label>
                  <Input
                    id="category-name"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    placeholder="e.g. Groceries"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category-emoji">Emoji</Label>
                  <Input
                    id="category-emoji"
                    value={newCategory.emoji}
                    onChange={(e) => setNewCategory({ ...newCategory, emoji: e.target.value })}
                    placeholder="e.g. 🛒"
                  />
                </div>
              </div>
              <Button type="submit" disabled={isSubmitting || !newCategory.name}>
                {isSubmitting ? "Adding..." : "Add Category"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Your Categories</CardTitle>
          <CardDescription>
            These categories will be available when adding transactions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {categories.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                You haven&apos;t created any categories yet. Add your first category to get started.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="p-4 border rounded-lg bg-white hover:bg-slate-50 transition-colors"
                >
                  {editingCategoryId === category.id ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`edit-name-${category.id}`}>Category Name</Label>
                          <Input
                            id={`edit-name-${category.id}`}
                            value={editCategory.name}
                            onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })}
                            placeholder="Category name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`edit-emoji-${category.id}`}>Emoji</Label>
                          <Input
                            id={`edit-emoji-${category.id}`}
                            value={editCategory.emoji}
                            onChange={(e) => setEditCategory({ ...editCategory, emoji: e.target.value })}
                            placeholder="Emoji"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleEditCancel}
                          disabled={isSubmitting}
                        >
                          <X className="mr-2 h-4 w-4" />
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleEditSave(category.id)}
                          disabled={isSubmitting || !editCategory.name}
                        >
                          <Save className="mr-2 h-4 w-4" />
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Badge
                          variant="outline"
                          className="px-2 py-1 rounded-md mr-2"
                        >
                          {category.emoji}
                        </Badge>
                        <span>{category.name}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEditStart(category.id, category.name, category.emoji)}
                          disabled={isSubmitting}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteCategory(category.id)}
                          disabled={isSubmitting}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 