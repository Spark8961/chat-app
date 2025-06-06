import { ReactNode, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
    children: ReactNode;
};
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isAuthenticated } = useContext(AuthContext)!;
    return isAuthenticated ? children : <Navigate to={"/"} replace />;
};

export default ProtectedRoute;
