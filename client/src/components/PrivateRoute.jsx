import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ allowedRoles }) => {
  const location = useLocation();

  const {
    isAuthenticated,
    user,
    authInitialized,
  } = useSelector((state) => state.auth);

  const isAdminRoute =
    location.pathname.startsWith("/admin");

  // =====================================================
  // AUTH CHECK IN PROGRESS
  // =====================================================

  if (!authInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />

          <p className="text-sm font-medium text-gray-500">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // NOT AUTHENTICATED
  // =====================================================

  if (!isAuthenticated) {
    if (isAdminRoute) {
      return (
        <Navigate
          to="/admin/login"
          replace
          state={{ from: location }}
        />
      );
    }

    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // =====================================================
  // AUTHENTICATED USER
  // =====================================================

  // Colleague's logic merged
  const userRole = user?.role || "user";

  // =====================================================
  // ADMIN ROUTE
  // =====================================================

  if (isAdminRoute) {
    // Logged-in normal user cannot access admin
    if (userRole !== "admin") {
      return (
        <Navigate
          to="/admin/login"
          replace
          state={{ from: location }}
        />
      );
    }

    // Logged-in admin can access admin routes
    return <Outlet />;
  }

  // =====================================================
  // NORMAL PRIVATE ROUTES
  // =====================================================

  if (
    allowedRoles &&
    !allowedRoles.includes(userRole)
  ) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;