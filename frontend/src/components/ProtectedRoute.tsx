import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

type ProtectedRouteProps = {
    children: ReactNode;
};
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { user } = useUser();
    return user ? <>{children}</> : <Navigate to={"/"} replace />;
};

export default ProtectedRoute;
