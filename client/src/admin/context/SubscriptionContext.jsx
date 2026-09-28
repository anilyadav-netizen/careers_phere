// src/admin/context/SubscriptionContext.jsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";

// Mock subscription data - Replace with API integration
const mockSubscriptionsData = [
  {
    id: "SUB001",
    planName: "Basic",
    billingType: "Monthly",
    price: 999,
    features: [
      "Post up to 5 jobs",
      "Access applicant management",
      "Email support",
      "Basic analytics",
    ],
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "SUB002",
    planName: "Standard",
    billingType: "Monthly",
    price: 1999,
    features: [
      "Post up to 15 jobs",
      "Access applicant management",
      "Priority email support",
      "Advanced analytics",
      "Featured job listings",
    ],
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "SUB003",
    planName: "Premium",
    billingType: "Monthly",
    price: 3999,
    features: [
      "Post unlimited jobs",
      "Access applicant management",
      "Priority support",
      "Advanced analytics",
      "Featured job listings",
      "Dedicated account manager",
    ],
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "SUB004",
    planName: "Basic Yearly",
    billingType: "Yearly",
    price: 9999,
    features: [
      "Post up to 5 jobs",
      "Access applicant management",
      "Email support",
      "Basic analytics",
      "2 months free",
    ],
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "SUB005",
    planName: "Standard Yearly",
    billingType: "Yearly",
    price: 19999,
    features: [
      "Post up to 15 jobs",
      "Access applicant management",
      "Priority email support",
      "Advanced analytics",
      "Featured job listings",
      "2 months free",
    ],
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "SUB006",
    planName: "Premium Yearly",
    billingType: "Yearly",
    price: 39999,
    features: [
      "Post unlimited jobs",
      "Access applicant management",
      "Priority support",
      "Advanced analytics",
      "Featured job listings",
      "Dedicated account manager",
      "2 months free",
    ],
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
];

const SubscriptionContext = createContext();

export const useSubscriptions = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error(
      "useSubscriptions must be used within a SubscriptionProvider",
    );
  }
  return context;
};

export const SubscriptionProvider = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch subscriptions - Replace with actual API call
  const fetchSubscriptions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSubscriptions(mockSubscriptionsData);
    } catch (err) {
      setError("Failed to load subscriptions");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  // Add subscription
  const addSubscription = useCallback(async (newSubscription) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSubscriptions((prev) => [...prev, newSubscription]);
      return { success: true };
    } catch (err) {
      return { success: false, error: "Failed to add subscription" };
    }
  }, []);

  // Update subscription
  const updateSubscription = useCallback(async (updatedSubscription) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSubscriptions((prev) =>
        prev.map((sub) =>
          sub.id === updatedSubscription.id ? updatedSubscription : sub,
        ),
      );
      return { success: true };
    } catch (err) {
      return { success: false, error: "Failed to update subscription" };
    }
  }, []);

  // Delete subscription
  const deleteSubscription = useCallback(async (subscriptionId) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSubscriptions((prev) =>
        prev.filter((sub) => sub.id !== subscriptionId),
      );
      return { success: true };
    } catch (err) {
      return { success: false, error: "Failed to delete subscription" };
    }
  }, []);

  // Get subscription by ID
  const getSubscriptionById = useCallback(
    (subscriptionId) => {
      return subscriptions.find((sub) => sub.id === subscriptionId);
    },
    [subscriptions],
  );

  const value = {
    subscriptions,
    loading,
    error,
    fetchSubscriptions,
    addSubscription,
    updateSubscription,
    deleteSubscription,
    getSubscriptionById,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};
