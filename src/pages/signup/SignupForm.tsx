import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../../config/constants";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { name, email, password } = data;
    try {
      const response = await fetch(`${API_ENDPOINT}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, email: email, password: password }),
      });
      if (!response.ok) {
        throw new Error("Sign-up failed");
      }
      console.log("Sign-up successful");
      const data = await response.json();
      localStorage.setItem("authToken", data.auth_token);
      localStorage.setItem("userData", JSON.stringify(data.user));
      navigate("/homepage");
    } catch (error) {
      console.error("Sign-up failed:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Your Name:
          </label>
          <input
            type="text"
            name="name"
            id="userName"
            {...register("name", { required: true })}
            className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
          />
          {errors.name && <span>Name is required</span>}
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="userEmail"
            {...register("email", { required: true })}
            className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
          />
          {errors.email && <span>Email is required</span>}
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="userPassword"
            {...register("password", { required: true })}
            className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
          />
          {errors.password && <span>Name is required</span>}
        </div>
        <button
          type="submit"
          className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
