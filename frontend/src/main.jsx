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

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthContextProvider>
            <RouterProvider router={router} />
        </AuthContextProvider>
    </StrictMode>
);
