import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient'; // Import the Supabase client
import toast, { Toaster } from 'react-hot-toast'; // Import react-hot-toast
import { Eye, EyeOff } from 'lucide-react'; // Import Lucide icons
import { useNavigate } from 'react-router-dom'; // Import React Router for navigation
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '', // Added phone field
    password: '',
    confirmPassword: '',
    role: '',
  });

  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle for confirm password visibility

  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { name, email, phone, password, confirmPassword, role } = formData;

    if (!role) {
      toast.error('Please select a role.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      toast.error(`Error: ${error.message}`);
    } else {
      const userId = data.user?.id;

      if (userId) {
        const { error: dbError } = await supabase.from('users').insert([
          { id: userId, name, role, email, phone }, // Save phone number
        ]);

        if (dbError) {
          toast.error(`Error saving user data: ${dbError.message}`);
        } else {
          toast.success('Sign up successful! Redirecting to login page...');
          setTimeout(() => navigate('/login'), 2000); // Redirect to login after 2 seconds
        }
      }
    }
  };

  return (
    <div className="min-h-[88vh] flex justify-center bg-gradient-to-r from-blue-50 to-green-50">
      <Toaster /> {/* Add Toaster component */}
      <div className="flex justify-between max-w-[88rem]">
        {/* Left Section - Form */}
        <div className="w-[40%] flex items-center justify-center">
          <form
            onSubmit={handleSignUp}
            className="bg-white shadow-lg rounded-xl p-6 lg:p-10 w-4/5 space-y-6"
          >
            <div className="flex flex-col items-center mb-4">
              <h2 className="text-3xl font-bold text-blue-900">Sign Up</h2>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
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
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
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

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
                <div
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? <EyeOff className="text-gray-500" /> : <Eye className="text-gray-500" />}
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                id="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              >
                <option value="" disabled>
                  Select your role
                </option>
                <option value="Farmer">Farmer</option>
                <option value="Driver">Driver</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
            >
              Sign Up
            </button>
            <p className="text-sm text-gray-600 text-center">
              Already have an account?{' '}
              <a href="/login" className="text-blue-600 hover:underline">
                Log in here
              </a>.
            </p>

          </form>
        </div>

        {/* Right Section - Image/Text */}
        <div className="w-1/2 flex flex-col justify-center items-center text-blue-900 p-6 lg:p-10">
          <h1 className="bg-gradient-to-r from-blue-600 to-green-600 text-transparent bg-clip-text text-4xl font-bold mb-4">
            Welcome to Our Platform
          </h1>
          <p className="text-lg text-center mb-6">
            Join us to explore the possibilities and make a difference with your role as a Farmer, Driver, or Admin.
            Be part of the revolution!
          </p>
          <DotLottieReact
            src="https://lottie.host/2cf086ab-daac-4fa9-b586-52738cb89a9d/1hYr1QxIOR.lottie"
            loop
            autoplay
            className="h-96"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
