import { createBrowserRouter, Navigate } from "react-router-dom";
import { App } from "@/app/app";
import { FormLayout } from "@/widgets/form-layout/form-layout";
import { LoginForm } from "@/features/auth/ui/login-form.tsx";
import { RegisterForm } from "@/features/auth/ui/register-form.tsx";
import { HomePage, MyProductsPage, OrderDetailPage, OrdersPage, ProfilePage } from "@/pages";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Navigate to="/login" replace />,
            },
            {
                element: <FormLayout />,
                children: [
                    { path: "register", element: <RegisterForm /> },
                    { path: "login", element: <LoginForm /> },
                ],
            },
            {
                path: "home",
                element: <HomePage />,
                children: [
                    { index: true, element: <Navigate to="/home" replace /> },
                    { path: "profile", element: <ProfilePage /> },
                    { path: "products/my", element: <MyProductsPage /> },
                    { path: "orders", element: <OrdersPage /> },
                    { path: "orders/:id", element: <OrderDetailPage /> },
                ],
            },
        ],
    },
]);

