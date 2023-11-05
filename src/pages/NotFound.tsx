import React from "react";
import { useNavigate } from "react-router-dom";
import notFound from "../assets/images/notFound.png"

 const Notfound : React.FC = () =>{
    const navigate = useNavigate()
    return (
        <div className="flex justify-center items-center h-screen">
        <button
          id="backToHomeButton"
          className="absolute top-4 left-4 bg-gray-500 hover:bg-gray-900 text-white px-4 py-2 rounded"
          onClick={() => navigate("/homepage")}
        >
          Go Back
        </button>
        <img src={notFound} alt="Page Not Found" className="max-w-[80%] h-auto object-cover" />
      </div>
    )
 }

 export default Notfound