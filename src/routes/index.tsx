import HomePage from "../pages/homepage";
import ProtectedRoute from "./ProtectedRoute";
import { createBrowserRouter } from "react-router-dom";
import React from "react";
import AccountLayout from "../layouts/account";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
import FirstPage from "../pages/FirstPage";
import Logout from "../pages/logout";
import NotFound from "../pages/NotFound";


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
    path:"*",
    element:<NotFound/>
    },
    {
        path:"/homepage",
        element: <HomePage/>
    },
    {
        path:"/logout",
        element: <Logout/>
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