import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) return children;
  return <Navigate to="/profile" replace />;
};

export default PublicRoute;
