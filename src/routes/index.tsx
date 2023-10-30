import HomePage from "../pages/homepage";
import ProtectedRoute from "./ProtectedRoute";
import { createBrowserRouter } from "react-router-dom";
import React from "react";
import AccountLayout from "../layouts/account";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
import FirstPage from "../pages/FirstPage";


const router = createBrowserRouter([
    {
        path: "/",
        element: <FirstPage/>
    },
    {
        path: "/users",
        element: <Signup/>
    },
    {
        path:"/users/sign_in/",
        element: <Signin/>
    },
    {
        path:"/homepage",
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