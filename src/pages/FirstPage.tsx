import { Link } from "react-router-dom"
import React from "react"
const FirstPage = () =>{
    const user = localStorage.getItem("authToken")

    return(
        <>
        <div>
            {user ? (
                <Link to={"/homepage"}>Go to dashboard</Link>
            ):(
                <>
                <Link to={"/users/sign_in"}>Signin</Link>
                <Link to={"/homepage"}>Continue without Signin</Link>
                </>
            )}
        </div>
        </>
    )
}

export default FirstPage