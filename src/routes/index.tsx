import HomePage from "../pages/homepage";
import ProtectedRoute from "./ProtectedRoute";
import { createBrowserRouter } from "react-router-dom";
import React from "react";
import AccountLayout from "../layouts/account";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>
    },
    {
        path:"account",
        element:(
            <ProtectedRoute>
                <AccountLayout/>
            </ProtectedRoute>
        )
    }
])

export default router