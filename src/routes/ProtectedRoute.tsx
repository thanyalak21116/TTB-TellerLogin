import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCustomer } from "context/CustomerContext";
import { CircularProgress } from "@mui/material";

const ProtectedRoute: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();
  const { resetCustomer } = useCustomer();

  useEffect(() => {
    const navEntry = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming;
    const isReload = navEntry.type === "reload";
    const isDirectAccess = location.pathname !== "/";

    if (isReload || isDirectAccess) {
      resetCustomer();
      navigate("/", { replace: true });
    }
  }, []);

  if (loading) return <CircularProgress />;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
