// src/admin/context/ApplicationContext.jsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { mockApplicationsData } from "../data/applicationsData";

const ApplicationContext = createContext();

export const useApplications = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error(
      "useApplications must be used within an ApplicationProvider",
    );
  }
  return context;
};

export const ApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch applications - Replace with actual API call
  const fetchApplications = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setApplications(mockApplicationsData);
    } catch (err) {
      setError("Failed to load applications");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  // Update application status
  const updateApplicationStatus = useCallback(
    async (applicationId, newStatus) => {
      try {
        // Simulate API call - Replace with actual API endpoint
        await new Promise((resolve) => setTimeout(resolve, 500));

        setApplications((prevApplications) =>
          prevApplications.map((app) =>
            String(app.id) === String(applicationId)
              ? { ...app, status: newStatus }
              : app,
          ),
        );

        return { success: true };
      } catch (err) {
        return { success: false, error: "Failed to update status" };
      }
    },
    [],
  );

  // Delete application
  const deleteApplication = useCallback(async (applicationId) => {
    try {
      // Simulate API call - Replace with actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 500));

      setApplications((prevApplications) =>
        prevApplications.filter(
          (app) => String(app.id) !== String(applicationId),
        ),
      );

      return { success: true };
    } catch (err) {
      return { success: false, error: "Failed to delete application" };
    }
  }, []);

  // Get application by ID
  const getApplicationById = useCallback(
    (applicationId) => {
      return applications.find(
        (app) => String(app.id) === String(applicationId),
      );
    },
    [applications],
  );

  const value = {
    applications,
    loading,
    error,
    fetchApplications,
    updateApplicationStatus,
    deleteApplication,
    getApplicationById,
  };

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
};
