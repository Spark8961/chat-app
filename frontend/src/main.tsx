import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Home from "./pages/Home";
import Chats from "./pages/Chats";
import ProtectedRoute from "./components/ProtectedRoute";

// import "./index.css"; disabled CSS for now to get implementation done.

const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    {
        path: "/chats",
        element: (
            <ProtectedRoute>
                <Chats />
            </ProtectedRoute>
        ),
    },
]);

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

const queryClient = new QueryClient();

createRoot(rootElement).render(
    <StrictMode>
        <AuthContextProvider>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </AuthContextProvider>
    </StrictMode>
);
