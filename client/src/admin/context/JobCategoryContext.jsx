// src/admin/context/JobCategoryContext.jsx
import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";

// Mock categories data - Replace with API integration
const mockCategoriesData = [
  {
    id: "CAT001",
    name: "Information Technology",
    description: "Software development, IT services, and technical roles",
    icon: "Code2",
    totalJobs: 245,
    status: "active",
    createdAt: "2023-06-15",
  },
  {
    id: "CAT002",
    name: "Marketing",
    description: "Digital marketing, brand management, and advertising",
    icon: "Megaphone",
    totalJobs: 128,
    status: "active",
    createdAt: "2023-06-20",
  },
  {
    id: "CAT003",
    name: "Finance",
    description: "Banking, accounting, and financial services",
    icon: "TrendingUp",
    totalJobs: 95,
    status: "active",
    createdAt: "2023-07-01",
  },
  {
    id: "CAT004",
    name: "Healthcare",
    description: "Medical, nursing, and healthcare administration",
    icon: "HeartPulse",
    totalJobs: 156,
    status: "active",
    createdAt: "2023-07-10",
  },
  {
    id: "CAT005",
    name: "Sales",
    description: "Sales representatives, account managers, and business development",
    icon: "BarChart3",
    totalJobs: 182,
    status: "active",
    createdAt: "2023-07-15",
  },
  {
    id: "CAT006",
    name: "Design",
    description: "UI/UX design, graphic design, and creative roles",
    icon: "Palette",
    totalJobs: 87,
    status: "active",
    createdAt: "2023-08-01",
  },
  {
    id: "CAT007",
    name: "Human Resources",
    description: "HR management, recruitment, and talent acquisition",
    icon: "Users",
    totalJobs: 64,
    status: "active",
    createdAt: "2023-08-10",
  },
  {
    id: "CAT008",
    name: "Education",
    description: "Teaching, training, and educational administration",
    icon: "GraduationCap",
    totalJobs: 73,
    status: "inactive",
    createdAt: "2023-08-15",
  },
  {
    id: "CAT009",
    name: "Legal",
    description: "Legal services, compliance, and corporate law",
    icon: "Scale",
    totalJobs: 42,
    status: "active",
    createdAt: "2023-09-01",
  },
  {
    id: "CAT010",
    name: "Logistics",
    description: "Supply chain, transportation, and warehouse management",
    icon: "Truck",
    totalJobs: 58,
    status: "inactive",
    createdAt: "2023-09-10",
  },
];

const JobCategoryContext = createContext();

export const useJobCategories = () => {
  const context = useContext(JobCategoryContext);
  if (!context) {
    throw new Error("useJobCategories must be used within a JobCategoryProvider");
  }
  return context;
};

export const JobCategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories - Replace with actual API call
  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setCategories(mockCategoriesData);
    } catch (err) {
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Get active categories
  const activeCategories = useMemo(() => {
    return categories.filter((cat) => cat.status === "active");
  }, [categories]);

  // Add category
  const addCategory = useCallback(async (newCategory) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setCategories((prev) => [...prev, newCategory]);
      return { success: true };
    } catch (err) {
      return { success: false, error: "Failed to add category" };
    }
  }, []);

  // Update category
  const updateCategory = useCallback(async (updatedCategory) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === updatedCategory.id ? updatedCategory : cat
        )
      );
      return { success: true };
    } catch (err) {
      return { success: false, error: "Failed to update category" };
    }
  }, []);

  // Delete category
  const deleteCategory = useCallback(async (categoryId) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setCategories((prev) => prev.filter((cat) => cat.id !== categoryId));
      return { success: true };
    } catch (err) {
      return { success: false, error: "Failed to delete category" };
    }
  }, []);

  const value = {
    categories,
    activeCategories,
    loading,
    error,
    fetchCategories,
    addCategory,
    updateCategory,
    deleteCategory,
  };

  return (
    <JobCategoryContext.Provider value={value}>
      {children}
    </JobCategoryContext.Provider>
  );
};