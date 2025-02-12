import React from 'react';
import { Link } from 'react-router-dom';

const AuthToggle = ({ isLogin }) => {
  return (
    <div className="mt-6 flex justify-center">
      <div className="bg-gray-200 p-1 rounded-full">
        <Link
          to={isLogin ? "/sign-up" : "/login"}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            isLogin
              ? "bg-white shadow-md text-indigo-600"
              : "text-gray-700 hover:bg-gray-300"
          }`}
        >
          {isLogin ? "Sign Up" : "Login"}
        </Link>
        <Link
          to={isLogin ? "/login" : "/sign-up"}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            !isLogin
              ? "bg-white shadow-md text-indigo-600"
              : "text-gray-700 hover:bg-gray-300"
          }`}
        >
          {isLogin ? "Login" : "Sign Up"}
        </Link>
      </div>
    </div>
  );
};

export default AuthToggle;