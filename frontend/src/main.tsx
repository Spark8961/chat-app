import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Chats from "./pages/Chats";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthContextProvider } from "./context/AuthContext.jsx";

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

createRoot(rootElement).render(
    <StrictMode>
        <AuthContextProvider>
            <RouterProvider router={router} />
        </AuthContextProvider>
    </StrictMode>
);
