import React, { useContext } from "react";
import { AuthContext } from "../contacts/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { Spinner } from "flowbite-react";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="text-center">
        <Spinner aria-label="Center-aligned spinner example" />
      </div>
    );
  }

  if (user) {
    return children;
  }

  // Determine the login path based on the current route
  const redirectTo = location.pathname.includes("/food-manager")
    ? "/login/food-manager"
    : "/login/inner-pantry";

  return <Navigate to={redirectTo} state={{ from: location }} replace />;
};

export default PrivateRoute;
