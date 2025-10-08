import Navbar from '@/components/layout/Navbar';
import { setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

function Login() {

    const [temp, settemp] = useState(false)

    const {user} = useSelector(store => store.auth)
    console.log(user)

    const navigate = useNavigate()
    const dispatch = useDispatch();

    // Initialize react-hook-form
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();


    const onSubmit = async (data) => {

        try {

            settemp(true)

            const response = await fetch('http://localhost:8000/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // very important for sending/receiving cookies
                body: JSON.stringify(data),
            });

            // const res = await login(data)
            const result = await response.json();
            // console.log(result)
            // return result;

            if (result.success) {
                toast.success(result.message)
                dispatch(setUser(result.user))
                reset();
                // isLogin.current = true
                // onLoginSuccess(true);
            }
            // setIsLogin(true)
            navigate("/");

        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error);

        } finally {
            settemp(false)
        }

    };

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
            <Navbar />
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mt-17">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Welcome Back!</h2>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    {/* Email Input */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="you@example.com"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Enter a valid email address',
                                },
                            })}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
                focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : ''
                                }`}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Password Input */}
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters',
                                },
                            })}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
                focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : ''
                                }`}
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center justify-between">
                        {
                            !temp ?
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline transition duration-300"
                                > Login </button>
                                :
                                <div className="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline transition duration-300">
                                    <Loader2 className=" h-5 w-5 mr-1 animate-spin"></Loader2> <span>Please Wait</span>
                                </div>
                        }
                    </div>

                    {/* Link to Register Page */}
                    <p className="text-center text-gray-600 text-sm mt-6">
                        Don't have an account?{' '}
                        <a href="/signup" className="text-blue-500 hover:text-blue-700 font-bold">
                            Sign Up
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
