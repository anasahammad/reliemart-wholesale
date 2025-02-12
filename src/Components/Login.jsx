// import { React, useState } from "react";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { Link, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [visible, setVisible] = useState(false);

//   const handleOnSubmit = (e) => {
//     e.preventDefault();

//     const localStorageEmail = JSON.parse(localStorage.getItem("email"));
//     const localStoragePassword = JSON.parse(localStorage.getItem("password"));

//     if (email === localStorageEmail && password === localStoragePassword) {
//       toast.success("Login successful!");
//       navigate("/");
//     } else {
//       toast.error("Incorrect email or password. Please try again!");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#d67b3b]/10 to-[#F97316]/10  flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
//         <h2 className="mt-6 text-4xl font-extrabold text-white">
//           Welcome Back
//         </h2>
//         <p className="mt-2 text-gray-200">Login to access your account</p>
//       </div>
//       <div className="mt-8 w-[90%] sm:w-[60%] lg:w-[40%]">
//         <div className="bg-white py-8 px-6 shadow-md rounded-lg">
//           <form className="space-y-6" onSubmit={handleOnSubmit}>
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700">
//                 Email Address
//               </label>
//               <div className="mt-1">
//                 <input
//                   type="email"
//                   name="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
//                 />
//               </div>
//             </div>
//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <div className="mt-1 relative">
//                 <input
//                   type={visible ? "text" : "password"}
//                   name="password"
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
//                 />
//                 {visible ? (
//                   <AiOutlineEye
//                     className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
//                     size={20}
//                     onClick={() => setVisible(false)}
//                   />
//                 ) : (
//                   <AiOutlineEyeInvisible
//                     className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
//                     size={20}
//                     onClick={() => setVisible(true)}
//                   />
//                 )}
//               </div>
//             </div>
//             <div className="flex justify-between items-center">
//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   id="remember-me"
//                   className="h-4 w-4 text-[#d67b3b] focus:ring-orange-500 border-gray-300 rounded"
//                 />
//                 <label
//                   htmlFor="remember-me"
//                   className="ml-2 text-sm text-gray-600">
//                   Remember me
//                 </label>
//               </div>
//               <Link
//                 to="/forget-password"
//                 className="text-sm text-[#d67b3b] hover:underline">
//                 Forgot your password?
//               </Link>
//             </div>
//             <div>
//               <button
//                 type="submit"
//                 className="w-full py-2 bg-[#d67b3b] text-white font-semibold rounded-full shadow-md hover:[#d67b3b] transition-all">
//                 Login
//               </button>
//             </div>
//             <div className="text-center">
//               <p className="text-sm text-gray-600">
//                 Don't have an account?{" "}
//                 <Link
//                   to="/sign-up"
//                   className="text-[#d67b3b] font-medium hover:underline">
//                   Sign Up
//                 </Link>
//               </p>
//             </div>
//           </form>
//         </div>
//         <button
//           onClick={() => navigate("/")}
//           className="mt-6 w-full py-2 bg-gray-800 text-white font-semibold rounded-full shadow-md hover:bg-gray-700 transition-all">
//           Back to Home
//         </button>
//       </div>
//       <ToastContainer
//         position="top-right"
//         autoClose={2000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover={false}
//         theme="light"
//       />
//     </div>
//   );
// };

// export default Login;

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaHome } from 'react-icons/fa';
import AuthToggle from './components/AuthToggle';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';



import { loginUser } from '../services/index/users';
import { customerActions } from '../store/reducers/userReducer';
import { useMutation } from '@tanstack/react-query';



const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user.customerInfo);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const loginMutation = useMutation({
    mutationFn: ({ email, password }) => loginUser({ email, password }),
    onSuccess: (data) => {
      dispatch(customerActions.setCustomerInfo(data));
      localStorage.setItem('customerAccount', JSON.stringify(data));
      toast.success('সফলভাবে লগইন করেছেন');
      navigate('/');
    },
    onError: (error) => {
      toast.error(error.message);
      
    },
  });


  const onSubmit = (data) => {
   

   try {
    loginMutation.mutate(data);
   } catch (error) {
    toast.error('লগইন ব্যর্থ হয়েছে!');
    console.error('Login Error:', error);
   }
    
  };

  useEffect(() => {
    const userInfo = userState?.customerInfo || JSON.parse(localStorage.getItem("customerAccount"));
    if (userInfo && userInfo.user) {
      navigate("/");
    }
  }, [navigate, userState]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl transform transition-all hover:scale-105 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600"></div>
        <div className="absolute bottom-2 right-2 w-20 h-20 bg-gradient-to-br from-pink-400 to-red-500 rounded-full opacity-20 transform -rotate-45"></div>
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <AuthToggle isLogin={true} />
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="email" className="sr-only">Email address</label>
              <div className="relative">
                <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <FaLock className="absolute top-3 left-3 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  {...register("password", { required: "Password is required" })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
              {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link to="/forget-password" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-300">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="text-center">
          <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500 flex items-center justify-center transition-colors duration-300">
            <FaHome className="mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;