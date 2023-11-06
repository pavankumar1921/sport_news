import { Link } from "react-router-dom";
import React from "react";
import Logo from "../assets/images/Logo.jpeg";
import sportsImage from "../assets/images/sportsImage.png";

const FirstPage = () => {
  const user = localStorage.getItem("authToken");

  return (
    <>
    
    <div className="bg-white h-screen overflow-hidden grid grid-cols-4">
        <div className="col-span-4">
      <nav className="col-span-4 bg-gray-100 p-4 flex justify-between items-center">
        <div className="flex items-center justify-center w-full">
          <div className="flex items-center justify-center w-full space-x-2">
            <h1 className="text-xl font-bold flex-auto">Sports Center</h1>
            <img src={Logo} alt="Logo" className="h-12 w-12 rounded-full" />
          </div>
        </div>
      </nav>
        </div>
    
      <div className="col-span-3 p-4 justify-center items-center">
        <img src={sportsImage} className="overflow-hidden w-9/12 h-1/12" alt="Sports" />
      </div>
      <div className="col-span-1 flex flex-col justify-center items-center p-4">
        {!user ? (
          <div className="justify-center gap-4">
            <div>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              <Link to="/users/sign_in">Sign in</Link>
            </button>
            </div>
            <br/>
            <div>
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
              <Link to="/homepage">Continue without Sign in</Link>
            </button>
            </div>
          </div>
        ) : (
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            <Link to="/homepage">Go to dashboard</Link>
          </button>
        )}
      </div>
    </div>
    </>
  );
};

export default FirstPage;
