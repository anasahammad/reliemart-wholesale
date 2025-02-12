import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../../services/index/users";
import toast from "react-hot-toast";
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { userActions } from "../../../store/reducers/userReducer";

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const [error , setError] = useState(false)
  
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ phone, password }) => login({ phone, password }),
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem('resellerAccount', JSON.stringify(data));
      toast.success('রিসেলার সফলভাবে লগইন করেছেন');
      navigate('/seller/dashboard');
    },
    onError: (error) => {
      // toast.error(error.message);
      setError(true)
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { password: '' },
    mode: 'onChange',
  });

  const submitHandler = (data) => {
    if (!phone) {
      toast.error(' সঠিক ফোন নম্বর প্রদান করুন');
      return;
    }

    setLoading(true);
    const toastId = toast.loading('দয়া করে অপেক্ষা করুন...', { duration: 3000 });

    const { password } = data;

    mutate({ phone, password }, {
      onSuccess: () => {
        toast.success('সফলভাবে লগইন হয়েছে!', { id: toastId });
      },
      onError: (error) => {
        toast.error(' সঠিক ফোন নম্বর এবং পাসওয়ার্ড  প্রদান করুন।', { id: toastId });
      }
    });
  };

  useEffect(() => {
    const userInfo = userState?.userInfo || JSON.parse(localStorage.getItem("resellerAccount"));
    if (userInfo && userInfo.user) {
      navigate("/seller/dashboard");
    }
  }, [navigate, userState]);

  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-orange-50 via-orange-100 to-purple-100 border">
      <form onSubmit={handleSubmit(submitHandler)} className="w-full max-w-md bg-white lg:p-8 p-3 rounded-lg shadow-lg">
        <h1 className="text-center font-[Delius] font-bold lg:text-2xl sm:text-base text-gray-800">অনুগ্রহ করে লগইন করুন।</h1>

        {/* Phone Number Field */}
        <div className="w-full lg:mt-5 mt-2">
          <label className="text-slate-600 text-sm font-medium flex justify-start items-center gap-1">ফোন নম্বর <span className="text-red-500">*</span></label>
          <PhoneInput
            international
            defaultCountry="BD"
            value={phone}
            onChange={setPhone}
            className={`w-full mt-2 p-2 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-orange-300'} outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="ফোন নম্বর লিখুন"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">ফোন নম্বর সঠিক নয়।</p>
          )}
        </div>

        {/* Password Field */}
        <div className="w-full mt-4 relative">
          <label className="text-slate-600 text-sm font-medium flex justify-start items-center gap-1">পাসওয়ার্ড <span className="text-red-500">*</span></label>
          <input
            type={isVisible ? 'text' : 'password'}
            id="password"
            {...register('password', {
              required: 'পাসওয়ার্ড প্রয়োজন',
              minLength: {
                value: 6,
                message: 'পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে',
              },
            })}
            className="w-full mt-2 p-2 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="আপনার পাসওয়ার্ড লিখুন"
          />
          <div onClick={() => setIsVisible(!isVisible)} className="absolute top-10 right-3 cursor-pointer text-gray-600">
            {isVisible ? <Eye color='#0B4E38' /> : <EyeOff color='#0B4E38' />}
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
      type="submit"
      className={`${isLoading ? "cursor-not-allowed" : ""} w-full mt-6 p-2 rounded-lg font-semibold text-white bg-orange-600 hover:bg-orange-700 transition duration-300`}
      disabled={isLoading} // Disable the button if loading or error
    >
      {error ? "আবার চেষ্টা করুন" : isLoading ? "অপেক্ষা করুন..." : "লগইন"}
    </button>
      </form>
    </div>
  );
}
