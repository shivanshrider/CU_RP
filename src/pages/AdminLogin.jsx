import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient'; // Import the Supabase client
import toast, { Toaster } from 'react-hot-toast'; // Import react-hot-toast
import { Eye, EyeOff } from 'lucide-react'; // Import Lucide icons
import { useNavigate } from 'react-router-dom'; // Import React Router for navigation
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const LoginBox = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility
    const navigate = useNavigate(); // Hook for navigation

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const { email, password } = formData;

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            toast.error(`Error: ${error.message}`);
        } else {
            toast.success('Login successful! Redirecting...');
            setTimeout(() => navigate('/'), 2000); // Redirect to home page after 2 seconds
        }
    };

    return (
        <div className="min-h-[88vh] flex justify-center bg-gradient-to-r from-blue-50 to-green-50">
            <Toaster /> {/* Add Toaster component */}
            <div className="flex justify-between max-w-[88rem]">
                {/* Left Section - Form */}
                <div className="w-[40%] flex items-center justify-center">
                    <form
                        onSubmit={handleLogin}
                        className="bg-white shadow-lg rounded-xl p-6 lg:p-10 w-4/5 space-y-6"
                    >
                        <div className="flex flex-col items-center mb-4">
                            <h2 className="text-3xl font-bold text-blue-900">Login</h2>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                />
                                <div
                                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                >
                                    {showPassword ? <EyeOff className="text-gray-500" /> : <Eye className="text-gray-500" />}
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
                        >
                            Login
                        </button>
                        <p className="text-sm text-gray-600 text-center">
                            Don't have an account?{' '}
                            <a href="/signup" className="text-blue-600 hover:underline">
                                Sign up here
                            </a>.
                        </p>

                    </form>
                </div>

                {/* Right Section - Image/Text */}
                <div className="w-1/2 flex flex-col justify-center items-center text-blue-900 p-6 lg:p-10">
                    <h1 className="bg-gradient-to-r from-blue-600 to-green-600 text-transparent bg-clip-text text-6xl font-bold mb-4">Welcome Back!</h1>
                    <p className="text-lg text-center">
                        Login to access your dashboard and continue making a difference. We’re excited to have you back!
                    </p>
                    <DotLottieReact
                        src="https://lottie.host/9cbd0330-b006-4f0a-b84a-06d901092ef7/VJ6BFUjJdt.lottie"
                        loop
                        autoplay
                        className="h-[28rem]"
                    />
                </div>
            </div>
        </div>
    );
};

export default LoginBox;
