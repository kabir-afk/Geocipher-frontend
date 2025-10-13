import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn) return children;
  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
