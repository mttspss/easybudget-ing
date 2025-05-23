import useSWR, { mutate } from 'swr';
import { Category } from '@/generated/prisma';

const fetcher = (url: string) => 
  fetch(url, { credentials: 'include' }).then(res => {
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
  });

export interface CategoryFormData {
  name: string;
  emoji: string;
}

export function useCategories() {
  const { data, error, isLoading, mutate: mutateFn } = useSWR('/api/categories', fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    refreshWhenHidden: false,
    refreshWhenOffline: false,
    dedupingInterval: 5000 // Dedupe requests within 5 seconds
  });
  
  // Create a new category
  const createCategory = async (categoryData: CategoryFormData) => {
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
        credentials: 'include',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create category');
      }
      
      const newCategory = await response.json();
      mutateFn(); // Refresh the category list
      return newCategory;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  };
  
  // Update an existing category
  const updateCategory = async (id: string, categoryData: CategoryFormData) => {
    try {
      const response = await fetch('/api/categories', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          ...categoryData,
        }),
        credentials: 'include',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update category');
      }
      
      const updatedCategory = await response.json();
      mutateFn(); // Refresh the category list
      
      // Also invalidate transactions since they include category data
      mutate(
        (key) => typeof key === 'string' && key.startsWith('/api/transactions'),
        undefined,
        { revalidate: true }
      );
      
      return updatedCategory;
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  };
  
  // Delete a category
  const deleteCategory = async (id: string) => {
    try {
      const response = await fetch(`/api/categories?id=${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete category');
      }
      
      mutateFn(); // Refresh the category list
      
      // Also invalidate transactions since they include category data
      mutate(
        (key) => typeof key === 'string' && key.startsWith('/api/transactions'),
        undefined,
        { revalidate: true }
      );
      
      return true;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  };
  
  return {
    categories: data as Category[] || [],
    isLoading,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
    mutate: mutateFn
  };
} 