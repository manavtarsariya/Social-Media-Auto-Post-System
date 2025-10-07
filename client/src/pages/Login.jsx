import Navbar from '@/components/layout/Navbar';
import React, { useState } from 'react';

function Login() {
  // State for form fields
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // State for error and success messages
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    
    // Clear previous messages
    setError('');
    setSuccess('');

    // --- Basic Validation ---
    if (!formData.email || !formData.password) {
      setError('Please enter both email and password.');
      return;
    }

    // --- Submission Logic ---
    // In a real application, you would send these credentials to your server for verification.
    console.log('Login attempt with:', formData);
    
    // Simulate a successful login for this example
    setSuccess(`Welcome back, ${formData.email}!`);
    
    // Clear form fields
    setFormData({
      email: '',
      password: '',
    });
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen ">

        <Navbar/>
      {/* Login Form Container */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        
        {/* Form Header */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Welcome Back!</h2>

        {/* Display Error/Success Messages */}
        {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">{error}</p>}
        {success && <p className="bg-green-100 text-green-700 p-3 rounded mb-4 text-center">{success}</p>}
        
        <form onSubmit={handleSubmit} noValidate>
          
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" 
              required
            />
          </div>
          
          {/* Password Input */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" 
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <button 
              type="submit" 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline transition duration-300">
              Sign In
            </button>
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