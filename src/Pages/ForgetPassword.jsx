import  { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { FaPhone, FaLock, FaHome, FaKey } from 'react-icons/fa';
import toast from 'react-hot-toast';
import axios from 'axios';

const ForgetPassword = () => {
  const [step, setStep] = useState('request'); // 'request', 'verify', or 'reset'
  const { register, handleSubmit, formState: { errors } } = useForm();

  const requestOTP = async (phone) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/forgot-password`, { phone });
    return response.data;
  };

  const verifyOTP = async (data) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/verify-otp`, data);
    return response.data;
  };

  const resetPassword = async (data) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/reset-password`, data);
    return response.data;
  };

  const requestMutation = useMutation({
    mutationFn: requestOTP,
    onSuccess: () => {
      toast.success('OTP sent to your phone');
      setStep('verify');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to send OTP');
    },
  });

  const verifyMutation = useMutation({
    mutationFn: verifyOTP,
    onSuccess: () => {
      toast.success('OTP verified successfully');
      setStep('reset');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to verify OTP');
    },
  });

  const resetMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success('Password reset successful');
      // Redirect to login page or handle as needed
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to reset password');
    },
  });

  const onSubmitRequest = (data) => {
    requestMutation.mutate(data.phone);
  };

  const onSubmitVerify = (data) => {
    verifyMutation.mutate(data);
  };

  const onSubmitReset = (data) => {
    resetMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl transform transition-all hover:scale-105 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600"></div>
        <div className="absolute bottom-2 right-2 w-20 h-20 bg-gradient-to-br from-pink-400 to-red-500 rounded-full opacity-20 transform -rotate-45"></div>
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {step === 'request' ? 'Forgot Password' : step === 'verify' ? 'Verify OTP' : 'Reset Password'}
          </h2>
        </div>
        {step === 'request' && (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmitRequest)}>
            <div>
              <label htmlFor="phone" className="sr-only">Phone number</label>
              <div className="relative">
                <FaPhone className="absolute top-3 left-3 text-gray-400" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  {...register("phone", { 
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{11}$/,
                      message: "Invalid phone number"
                    }
                  })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Phone number"
                />
              </div>
              {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone.message}</p>}
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
                disabled={requestMutation.isLoading}
              >
                {requestMutation.isLoading ? 'Sending...' : 'Send OTP'}
              </button>
            </div>
          </form>
        )}
        {step === 'verify' && (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmitVerify)}>
            <div>
              <label htmlFor="otp" className="sr-only">OTP</label>
              <div className="relative">
                <FaKey className="absolute top-3 left-3 text-gray-400" />
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  {...register("otp", { required: "OTP is required" })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter OTP"
                />
              </div>
              {errors.otp && <p className="mt-2 text-sm text-red-600">{errors.otp.message}</p>}
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
                disabled={verifyMutation.isLoading}
              >
                {verifyMutation.isLoading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </div>
          </form>
        )}
        {step === 'reset' && (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmitReset)}>
            <div>
              <label htmlFor="newPassword" className="sr-only">New Password</label>
              <div className="relative">
                <FaLock className="absolute top-3 left-3 text-gray-400" />
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  {...register("newPassword", { 
                    required: "New password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long"
                    }
                  })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="New Password"
                />
              </div>
              {errors.newPassword && <p className="mt-2 text-sm text-red-600">{errors.newPassword.message}</p>}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">Confirm New Password</label>
              <div className="relative">
                <FaLock className="absolute top-3 left-3 text-gray-400" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  {...register("confirmPassword", { 
                    required: "Please confirm your new password",
                    validate: (value) => value === document.getElementById('newPassword').value || "Passwords do not match"
                  })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm New Password"
                />
              </div>
              {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>}
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
                disabled={resetMutation.isLoading}
              >
                {resetMutation.isLoading ? 'Resetting...' : 'Reset Password'}
              </button>
            </div>
          </form>
        )}
        <div className="text-center">
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 flex items-center justify-center transition-colors duration-300">
            <FaHome className="mr-2" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;