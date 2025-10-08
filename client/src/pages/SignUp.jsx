import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Navbar from "@/components/layout/Navbar";
import { toast } from "react-toastify";
import { signUp } from "@/features/Users/api/users";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

function SignUp() {

    const { user } = useSelector(store => store.auth)
    const navigate = useNavigate()



    const [temp, settemp] = useState(false)


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // Submit handler
    const onSubmit = async (data) => {

        // eslint-disable-next-line no-unused-vars
        const { confirmPassword, ...cleanData } = data;

        try {

            settemp(true)
            const res = await signUp(cleanData)

            if (res.data.success) {
                toast.success(res.data.message)
                reset();
            }
            navigate("/login")

        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error);
        } finally {
            settemp(false)
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [navigate, user])

    return (
        <div className="bg-gray-900 flex items-center justify-center min-h-screen">
            <Navbar />

            <div className="bg-gradient-to-r from-pink-400 to-orange-400/90 p-8 rounded-lg shadow-md w-full max-w-md mt-17">

                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Create Your Account
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>

                    <div className="mb-4">
                        <label
                            htmlFor="username"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter your full name"
                            {...register("username", {
                                required: "Username is required",
                                minLength: {
                                    value: 2,
                                    message: "Username must be at least 2 characters",
                                },
                                maxLength: {
                                    value: 50,
                                    message: "Username must not exceed 50 characters",
                                },
                                validate: {
                                    noSpaces: (v) =>
                                        !v.includes(" ") || "Username should not contain spaces",
                                },
                            })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.username && (
                            <p className="text-white font-medium text-sm mt-1">
                                * {errors.username.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="you@example.com"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Enter a valid email address",
                                },
                            })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && (
                            <p className="text-white font-medium text-sm mt-1">
                                * {errors.email.message}
                            </p>
                        )}
                    </div>


                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                            })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.password && (
                            <p className="text-white font-medium text-sm mt-1">
                                * {errors.password.message}
                            </p>
                        )}
                    </div>


                    <div className="mb-6">
                        <label
                            htmlFor="confirmPassword"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="••••••••"
                            {...register("confirmPassword", {
                                required: "Please confirm your password",
                                validate: (value, { password }) =>
                                    value === password || "Passwords do not match",
                            })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.confirmPassword && (
                            <p className="text-white font-medium text-sm mt-1">
                                * {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>


                    <div className="flex items-center justify-between">

                        {
                            !temp ?
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline transition duration-300"
                                > Register </button>
                                :
                                <div className="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline transition duration-300">
                                    <Loader2 className=" h-5 w-5 mr-1 animate-spin"></Loader2> <span>Please Wait</span>
                                </div>
                        }

                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
