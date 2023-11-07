import React, { useState } from 'react';
import { Link ,useNavigate } from 'react-router-dom';
import { API_ENDPOINT } from '../../config/constants';
import {useForm, SubmitHandler} from "react-hook-form" 

type Inputs = {
  email:string
  password:string
}
const SigninForm: React.FC = () => {
  const navigate = useNavigate()
  const {register,handleSubmit,formState: {errors}} = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async(data) => {
    const {email,password} = data
    try {
      const response = await fetch(`${API_ENDPOINT}/users/sign_in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Sign-in failed');
      }

      console.log('Sign-in successful');
      const data = await response.json()
      localStorage.setItem('authToken', data.auth_token)
      localStorage.setItem('userData',JSON.stringify(data.user))
      navigate('/homepage')
    } catch (error) {
      console.error('Sign-in failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Email:</label>
        <input type="email" name="email" id="email" {...register("email", { required: true })} className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue" />
        {errors.email && (
          <span>Email is required</span>
        )}
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Password:</label>
        <input type="password" name="password" id="password" {...register("password", { required: true })} className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue" />
        {errors.password && (
          <span> Password is required</span>
        )}
      </div>
      <button type="submit" className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4">Sign In</button>
          <p className='p-2'>Don't have an account ? 
            <Link to="/users">
              <span className='text-blue-500 px-2 hover:text-green-600 hover:underline'>Sign up here</span>
            </Link>
          </p>
    </form>
  );
};

export default SigninForm;