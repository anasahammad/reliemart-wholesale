import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useMutation } from "@tanstack/react-query";
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';

const ProfileUpdate = ({ resellerId, accounts }) => {
  const [uploading, setUploading] = useState(false); // Added uploading state
  const [image, setImage] = useState(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  // Initialize form with default values if `accounts` is available
  useEffect(() => {
    if (accounts) {
      reset({
        whatsappNumber: accounts.whatsappNumber || '',
        companyName: accounts.companyName || '',
        dateOfBirth: accounts.dateOfBirth || '',
        address: accounts.address || '',
        expertiseLevel: accounts.expertiseLevel || 'Basic',
        platformUsage: accounts.platformUsage || 'Mobile',
        logo: accounts.logo || '',
        tags: accounts.tags || '',
        facebookPageLink: accounts.facebookPageLink || '',
      });
    }
  }, [accounts, reset]);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', `${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}`);
    
    try {
      setUploading(true);
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_PRESET}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await response.json();
      setUploading(false);
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      setUploading(false);
      throw error;
    }
  };

  const handleLogoUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const logoUrl = await uploadToCloudinary(file);
        setValue('logo', logoUrl);
        setImage(logoUrl)
        toast.success('Logo uploaded successfully');
      } catch (error) {
        toast.error('Failed to upload logo');
      }
    }
  };

  const updateMutation = useMutation({
    mutationFn: ({ data }) => axios.patch(`${import.meta.env.VITE_API_URL}/reseller/reseller/${resellerId}`, data, {withCredentials: true}),
    onSuccess: (data) => {
      toast.success('Profile updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update profile');
    }
  });

  const handleUpdateProfile = (data) => {
    updateMutation.mutate({ data });
  };

  return (
    <form onSubmit={handleSubmit(handleUpdateProfile)} className="mt-8 space-y-6 bg-gray-50 p-6 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">হোয়াটসঅ্যাপ নাম্বার</label>
          <input
            type="tel"
            {...register("whatsappNumber")}
            className="mt-1 block w-full border border-orange-500 rounded-md shadow-sm focus:ring-blue-500 px-2 py-1 focus:border-blue-500"
            placeholder="হোয়াটসঅ্যাপ নাম্বার লিখুন"
          />
          {errors.whatsappNumber && <span className="text-red-500 text-sm">{errors.whatsappNumber.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">কোম্পানির নাম</label>
          <input
            type="text"
            {...register("companyName")}
            className="mt-1 block w-full border border-orange-500 rounded-md shadow-sm focus:ring-blue-500 px-2 py-1 focus:border-blue-500"
            placeholder="কোম্পানির নাম লিখুন"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">জন্ম তারিখ</label>
          <input
            type="date"
            {...register("dateOfBirth")}
            className="mt-1 block w-full border border-orange-500 rounded-md shadow-sm focus:ring-blue-500 px-2 py-1 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">ঠিকানা</label>
          <textarea
            {...register("address")}
            className="mt-1 block w-full border border-orange-500 rounded-md shadow-sm focus:ring-blue-500 px-2 py-1 focus:border-blue-500"
            rows="3"
            placeholder="ঠিকানা লিখুন"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">পারদর্শিতার ধাপ</label>
          <select
            {...register("expertiseLevel")}
            className="mt-1 block w-full border border-orange-500 rounded-md shadow-sm focus:ring-blue-500 px-2 py-1 focus:border-blue-500"
          >
            <option value="">পারদর্শিতার ধাপ নির্বাচন করুন</option>
            <option value="Basic">ব্যাসিক</option>
            <option value="Intermediate">ইন্টারমিডিয়েট</option>
            <option value="Advanced">এডভান্স</option>
            <option value="Pro">প্রো</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">যে মাধ্যম ব্যবহার করেন</label>
          <select
            {...register("platformUsage")}
            className="mt-1 block w-full border border-orange-500 rounded-md shadow-sm focus:ring-blue-500 px-2 py-1 focus:border-blue-500"
          >
            <option value="">নির্বাচন করুন</option>
            <option value="Mobile">মোবাইল</option>
            <option value="PC">কম্পিউটার</option>
            <option value="Both">উভয়ই</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">কোম্পানি লোগো</label>
          <div className="mt-1 flex items-center">
            <input {...register("logo")} type="hidden" />
            <label className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <span className='flex justify-start items-center gap-2'> <MdOutlineAddPhotoAlternate /> লোগো আপলোড করুন</span>
              <input type="file" className="hidden" onChange={handleLogoUpload} accept="image/*" />
            </label>
            {uploading && <span className="ml-3 text-sm text-gray-600">আপলোড হচ্ছে...</span>}
          </div>
        </div>
        {(accounts?.logo || image) && (
          <div className='flex justify-start items-center gap-2'>
            <img
            src={accounts?.logo || image}
            alt="logo"
            className="w-12 h-12 rounded-lg object-cover object-center"
          />
            <h2 className='text-sm'>কোম্পানি লোগো</h2>
          </div>
          
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700">ট্যাগ</label>
          <input
            type="text"
            {...register("tags")}
            className="mt-1 block w-full border border-orange-500 rounded-md shadow-sm focus:ring-blue-500 px-2 py-1 focus:border-blue-500"
            placeholder="ট্যাগ লিখুন"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">ফেইসবুক পেইজ লিংক</label>
          <input
            type="text"
            {...register("facebookPageLink")}
            className="mt-1 block w-full border border-orange-500 rounded-md shadow-sm focus:ring-blue-500 px-2 py-1 focus:border-blue-500"
            placeholder="ফেইসবুক পেইজ লিংক দিন"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
      >
        আপডেট করুন
      </button>
    </form>
  );
};

export default ProfileUpdate;
