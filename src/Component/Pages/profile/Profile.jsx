import React, { useEffect, useState } from "react";
import { FaPhone, FaRegEdit, FaUserCircle } from "react-icons/fa";
import { MdContentCopy, MdOutlineStarPurple500, MdPayment } from "react-icons/md";
import { FiPackage, FiShoppingCart, FiDollarSign, FiCreditCard } from "react-icons/fi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { getUserByIdForReseller } from "../../../services/index/users";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import ProfileUpdate from "./ProfileUpdate";

const Profile = () => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [accounts, setAccounts] = useState();
  const [uploading, setUploading] = useState(false); // Added uploading state
  const userState = useSelector((state) => state.user);
  const userInfo = userState?.userInfo || JSON.parse(localStorage.getItem("resellerAccount"));
  const resellerId = userInfo?.user?._id;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserByIdForReseller(resellerId);
        setAccounts(userData.user);
      } catch (err) {
        toast.error("Failed to fetch user data");
      }
    };

    fetchUser();
  }, [resellerId]);

  const handleCopyReferLink = () => {
    navigator.clipboard.writeText(`${accounts?.referralCode}`);
    setCopied(true);
    toast.success("Refer Link Copied");
    setTimeout(() => setCopied(false), 2000);
  };

  // const uploadToCloudinary = async (file) => {
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   formData.append('upload_preset', `${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}`);

  //   try {
  //     setUploading(true);
  //     const response = await fetch(
  //       `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_PRESET}/image/upload`,
  //       {
  //         method: 'POST',
  //         body: formData,
  //       }
  //     );
  //     const data = await response.json();
  //     setUploading(false);
  //     return data.secure_url;
  //   } catch (error) {
  //     console.error('Error uploading to Cloudinary:', error);
  //     setUploading(false);
  //     throw error;
  //   }
  // };

  // const handleLogoUpload = async (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     try {
  //       const logoUrl = await uploadToCloudinary(file);
  //       setValue('logo', logoUrl);
  //       toast.success('Logo uploaded successfully');
  //     } catch (error) {
  //       toast.error('Failed to upload logo');
  //     }
  //   }
  // };

  // const updateMutation = useMutation({
  //   mutationFn: ({ data }) => axios.put(`${import.meta.env.VITE_API_URL}/reseller/reseller/${resellerId}`, data, {withCredentials: true}),
  //   onSuccess: (data) => {
  //     // setAccounts(data.data);
  //     console.log(data);
  //     toast.success('Profile updated successfully');
  //   },
  //   onError: (error) => {
  //     toast.error('Failed to update profile');
  //   }
  // })
  // const handleUpdateProfile = (data) => {
  //   console.log(data);
  //   updateMutation.mutate({ data });
  //   // toast.success("Profile updated successfully");
  // };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg space-y-8">
      <div className="flex flex-col md:flex-row md:justify-between lg:px-6 items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">

<div>
  <div className="flex justify-start items-center gap-3">
  <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
          {accounts?.logo ? (
            <img  src={ accounts?.logo?accounts?.logo:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5gv6VVdtAGLqBK9MXIBOUGJ-hWeVdiiN-3Q&s"
            } alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <img  src={ accounts?.logo?accounts?.logo:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5gv6VVdtAGLqBK9MXIBOUGJ-hWeVdiiN-3Q&s"
            } alt="Profile" className="w-full h-full object-cover" />
          )}
        </div>
<div>
   <h2 className="text-3xl font-bold text-gray-800">{accounts?.name || "অজানা"}</h2>
         <small className="text-xs font-medium flex justify-start items-center gap-1 leading-[-12px] text-gray-600">
                     <FaPhone className="text-xs text-blue-600"></FaPhone>{" "}
                     {accounts?.phone || "N/A"}
                   </small>
                   <small className="text-xs font-medium leading-[-12px] text-gray-800">
                   রিসেলার  ID : {accounts?.referralCode || "N/A"}
            </small>
</div>
 
  </div>
      


        <div className="text-center md:text-left flex-grow">
       
         <div className="max-w-[200px] lg:max-w-[300px] flex justify-center gap-3 items-center">
                  <div className="flex flex-col justify-center items-center">
                    <small className="bg-gray-100 text- font-semibold block px-2 rounded text-gray-600">
                      Top Rated
                    </small>
                    <small className="flex justify-center items-center">
                      <MdOutlineStarPurple500 className="text-amber-500" />
                      <MdOutlineStarPurple500 className="text-amber-500" />
                      <MdOutlineStarPurple500 className="text-amber-500" />
                    </small>
                  </div>
                  <small className=" px-2 rounded -whitextte flex justify-center items-center flex-col">
                    Total Earned :{" "}
                    <span className="font-bold text-green-600">{accounts?.totalEarn} tk</span>
                  </small>
                </div>
                 <div className={`max-w-[220px] lg:max-w-[320px] flex justify-center items-center gap-2 text-xs font-semibold text-white p-1 rounded-md px-3 ${accounts?.isVerified ?  "bg-green-500" : "bg-red-500"}`}>
                  {accounts?.isVerified === true ? "অ্যাক্টিভ মেম্বার" : "ইনঅ্যাক্টিভ মেম্বার"}
                </div>  
          {/* <p className="text-gray-500">রিসেলার আইডি: {accounts?.referralCode || "অজানা"}</p> */}
          <button
            className="mt-2 text-blue-600 hover:text-blue-800 flex items-center justify-center md:justify-start gap-1"
            onClick={handleCopyReferLink}
          >
            <MdContentCopy /> {copied ? "কপি করা হয়েছে!" : "রেফার লিঙ্ক কপি করুন"}
          </button>
        </div>
</div>




        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "এডিট ইনফো বন্ধ করুন" : "প্রোফাইল ইনফো এডিট করুন"}
        </button>
      </div>

      {isEditing && (
        <ProfileUpdate resellerId={resellerId} accounts={accounts}></ProfileUpdate>
      )}

      <div className="mt-8 border-t pt-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">পেআউট ইনফো :</h3>
        {accounts?.bankAccount?.length > 0 ? (
          accounts.bankAccount.map((account, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4 shadow">
              <p className="text-gray-700"><strong>ব্যাংক নাম:</strong> {account.bankName || "অজানা"}</p>
              <p className="text-gray-700"><strong>ব্যাংক অ্যাকাউন্ট শিরোনাম:</strong> {account.accountName || "অজানা"}</p>
              <p className="text-gray-700"><strong>ব্যাংক অ্যাকাউন্ট নম্বর:</strong> {account.accountNumber || "অজানা"}</p>
              <p className="text-gray-700"><strong>ব্যাংক রাউটিং নম্বর:</strong> {account.routingNumber || "অজানা"}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-700">কোনো ব্যাংক অ্যাকাউন্ট পাওয়া যায়নি</p>
        )}
        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105">
          পেআউট ইনফো এডিট করুন
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-gray-50 p-6 rounded-lg shadow mt-8">
        <div className="text-center p-4 bg-white rounded-lg shadow-sm">
          <FiPackage className="mx-auto text-4xl text-blue-500 mb-2" />
          <p className="font-semibold text-gray-600">আমার দোকানে মোট পণ্য</p>
          <p className="text-2xl font-bold text-blue-600">{accounts?.salesCount || 0}</p>
        </div>
        <div className="text-center p-4 bg-white rounded-lg shadow-sm">
          <FiShoppingCart className="mx-auto text-4xl text-green-500 mb-2" />
          <p className="font-semibold text-gray-600">মোট অর্ডার</p>
          <p className="text-2xl font-bold text-green-600">{accounts?.totalOrders || 0}</p>
        </div>
        <div className="text-center p-4 bg-white rounded-lg shadow-sm">
          <FiDollarSign className="mx-auto text-4xl text-yellow-500 mb-2" />
          <p className="font-semibold text-gray-600">মোট বিক্রিত পরিমাণ</p>
          <p className="text-2xl font-bold text-yellow-600">৳ {accounts?.totalSalesAmount || 0}</p>
        </div>
        <div className="text-center p-4 bg-white rounded-lg shadow-sm">
          <FiCreditCard className="mx-auto text-4xl text-purple-500 mb-2" />
          <p className="font-semibold text-gray-600">ওয়ালেট ব্যালেন্স</p>
          <p className="text-2xl font-bold text-purple-600">৳ {accounts?.withdrawAmount || "0.00"}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;