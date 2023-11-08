import React from "react";
import SigninForm from "./SigninForm";
import { Link } from "react-router-dom";

const Signin: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Link
        to="/"
        className="absolute top-4 left-4 bg-gray-500 hover:bg-gray-900 text-white px-4 py-2 rounded"
      >
        Home
      </Link>
      <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Sign in
        </h1>
        <SigninForm />
      </div>
    </div>
  );
};

export default Signin;
