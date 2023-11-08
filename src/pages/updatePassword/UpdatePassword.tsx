import React from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../../config/constants";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  current_password: string;
  new_password: string;
};

const UpdatePassword: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { current_password, new_password } = data;
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await fetch(`${API_ENDPOINT}/user/password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ current_password, new_password }),
      });
      if (!response.ok) {
        alert("You have entered incorrect password");
        throw new Error("Password update failed");
      }
      navigate("/homepage");
    } catch (error) {
      console.error("Password update failed:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-gray-100 rounded-md shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Update Password</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Current Password:
          </label>
          <input
            type="password"
            name="current_password"
            {...register("current_password", { required: true })}
            className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
          />
          {errors.current_password && (
            <span className="text-red-500">Current Password is required</span>
          )}
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            New Password:
          </label>
          <input
            type="password"
            name="new_password"
            {...register("new_password", { required: true })}
            className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
          />
          {errors.new_password && (
            <span className="text-red-500">New Password is required</span>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
        >
          Update Password
        </button>
      </form>
      <div className="text-center mt-4">
        <button
          onClick={() => navigate("/homepage")}
          className="text-blue-500 hover:underline"
        >
          Go back to Home
        </button>
      </div>
    </div>
  );
};

export default UpdatePassword;
