import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

type ProtectedRouteProps = {
    children: ReactNode;
};
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const queryClient = useQueryClient();
    const user = queryClient.getQueryData(["user"]);
    return user ? <>{children}</> : <Navigate to={"/"} replace />;
};

export default ProtectedRoute;
