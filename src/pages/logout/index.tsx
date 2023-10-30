import React ,{ useEffect } from "react";
import { Navigate } from "react-router-dom";

const Logout = () =>{
    useEffect(()=>{
        localStorage.removeItem("authToken")
        localStorage.removeItem("userData")
    },[])
    return <Navigate to="/users/sign_in" />
}

export default Logout