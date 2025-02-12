import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+880"); // Default for Bangladesh

  const {
    register: registerSignUp,
    handleSubmit: handleSubmitSignUp,
    formState: { errors: errorsSignUp },
  } = useForm();

  const handleSignUp = (data) => {
    const fullPhoneNumber = `${selectedCountryCode}${data.phone}`;
    console.log("Sign Up Data:", { ...data, phone: fullPhoneNumber });
    alert("Signup successful! Please log in.");
  };

  const phoneValidationRules = {
    "+880": /^[0-9]{9,10}$/,
    "+91": /^[0-9]{10}$/,
    "+92": /^[0-9]{10}$/,
    "+1": /^[0-9]{10}$/,
    "+44": /^[0-9]{10}$/,
    "+966": /^[0-9]{9,10}$/,
    "+971": /^[0-9]{9}$/,
    "+974": /^[0-9]{8}$/,
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-orange-50 via-orange-100 to-purple-100 p-5">
      <form
        onSubmit={handleSubmitSignUp(handleSignUp)}
        className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg"
      >
        <h1 className="text-center font-bold text-2xl sm:text-3xl text-gray-800">
          Create Your Account
        </h1>
        <p className="text-center text-sm text-gray-600 mt-2">
          Sign up to explore more features.
        </p>

        {/* Email Field */}
        <div className="w-full mt-5">
          <label className="text-gray-700 font-medium">Email</label>
          <input
            type="email"
            {...registerSignUp("email", { required: "Email is required" })}
            className="w-full mt-2 p-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="Enter Your Email"
          />
          {errorsSignUp.email && (
            <p className="text-red-500 text-sm mt-1">
              {errorsSignUp.email.message}
            </p>
          )}
        </div>

        {/* Phone Number Field */}
        <div className="w-full mt-4">
          <label className="text-gray-700 font-medium">Phone Number</label>
          <div className="grid grid-cols-4 gap-2">
            <select
              className="col-span-1 p-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-gray-500"
              value={selectedCountryCode}
              onChange={(e) => setSelectedCountryCode(e.target.value)}
            >
              <option value="+880">+880</option>
              <option value="+91">+91</option>
              <option value="+92">+92</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
              <option value="+966">+966</option>
              <option value="+971">+971</option>
              <option value="+974">+974</option>
            </select>
            <input
              type="tel"
              {...registerSignUp("phone", {
                required: "Phone number is required",
                pattern: {
                  value: phoneValidationRules[selectedCountryCode],
                  message: "Enter a valid phone number",
                },
              })}
              className="col-span-3 p-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Enter Your Phone Number"
            />
          </div>
          {errorsSignUp.phone && (
            <p className="text-red-500 text-sm mt-1">
              {errorsSignUp.phone.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="w-full mt-4 relative">
          <label className="text-gray-700 font-medium">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            {...registerSignUp("password", {
              required: "Password is required",
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                message:
                  "Password must be at least 6 characters long and include both letters and numbers",
              },
            })}
            className="w-full mt-2 p-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="Enter Your Password"
          />
          <div
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-12 right-3 cursor-pointer text-gray-600"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
          {errorsSignUp.password && (
            <p className="text-red-500 text-sm mt-1">
              {errorsSignUp.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-6 p-2 rounded-lg font-semibold text-white bg-gray-600 hover:bg-gray-700 transition duration-300"
        >
          Sign Up
        </button>

        {/* Redirect to Login */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-blue-600 font-medium hover:underline"
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
