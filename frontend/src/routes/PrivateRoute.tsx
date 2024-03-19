import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hook/auth";

export function PrivateRoutes() {
    const { user } = useAuth();
  
    const isAuthenticated = (): boolean => {
      return !!user;
    };
  
    return isAuthenticated() ? (
      <Outlet />
    ) : (
      <Navigate to="/login" replace />
    );
  }