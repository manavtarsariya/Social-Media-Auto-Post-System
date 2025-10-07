import Navbar from '@/components/layout/Navbar';
import React, { useState } from 'react';

function SignUp() {
  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill out all fields.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
    }

    // --- Submission Logic ---
    // In a real application, you would send the data to your server here
    // For example: using fetch() or axios.post()
    console.log('Form submitted successfully:', formData);
    
    setSuccess('Registration successful! Welcome.');
    
    // Clear form fields after successful submission
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">

        <Navbar/>
      {/* Registration Form Container */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mt-17">
        
        {/* Form Header */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Your Account</h2>

        {/* Display Error/Success Messages */}
        {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">{error}</p>}
        {success && <p className="bg-green-100 text-green-700 p-3 rounded mb-4 text-center">{success}</p>}
        
        <form onSubmit={handleSubmit} noValidate>
          
          {/* Name Input */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" 
              required
            />
          </div>
          
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
          <div className="mb-4">
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
          
          {/* Confirm Password Input */}
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword" 
              value={formData.confirmPassword}
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
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;