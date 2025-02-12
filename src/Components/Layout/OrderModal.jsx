import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaCross } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import { useSelector } from 'react-redux';

const OrderModal = ({ product, onClose }) => {
  const [uploading, setUploading] = useState(false);
  const userState = useSelector((state) => state.user);
  const userInfo =
  userState?.customerInfo || JSON.parse(localStorage.getItem("customerAccount"));
  const userId = userInfo?.user?._id;
  const [formData, setFormData] = useState({
    customerName: userInfo?.user?.name || '',
    phone: userInfo?.user?.phone || '',
    productQuantity: 10,
    address: '',
    notes: '',
    companyName: userInfo?.user?.companyName || '',
    businessType: '',
    facebookPage: '',
    website: '',
    businessCard: null,
    customerId: userId
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  // const postMutation = useMutation({
  //   mutationFn: async (data) => {
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_API_URL}/wholesale`,
  //       data
  //     );
  
  //     return response.data; // Returning response data for use in onSuccess
  //   },
  //   onSuccess: (data) => {
  //     // Use the backend message from the response
  //     toast.success(data.message || 'অর্ডার সফলভাবে প্রক্রিয়াধীন হয়েছে');
  //     onClose();
  //   },
  //   onError: (error) => {
  //     // Use the backend message from the error response
  //     const errorMessage =
  //       error.response?.data?.message || 'কিছু সমস্যা হয়েছে'; // Fallback to default message
  //     toast.error(errorMessage);
  //   }
  // });
  

  
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // Validation logic for business type
  //   if (formData.businessType === 'দোকান' || formData.businessType === 'শোরুম') {
  //     if (!formData.businessCard) {
  //       alert('Please upload your visiting card.');
  //       return;
  //     }
  //   } else if (formData.businessType === 'অনলাইন') {
  //     if (!formData.facebookPage) {
  //       alert('Please provide your Facebook page link.');
  //       return;
  //     }
  //   }

  //   // console.log('Order Details:', {
  //   //   product: product.name,
  //   //   ...formData,
  //   // });

  //   const order = {
  //     ...formData,
  //     productName: product.name,
  //     productId: product._id,
  //   }
  //   postMutation.mutate(order)
  //   onClose();
  // };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'rowshanara'); // Replace with your Cloudinary upload preset
    formData.append('cloud_name', 'drbtvputr'); // Replace with your Cloudinary cloud name

    setUploading(true);
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/drbtvputr/upload`, // Replace with your Cloudinary API endpoint
        formData
      );
      setUploading(false);
      return response.data.secure_url; // Return the uploaded file URL
    } catch (error) {
      setUploading(false);
      toast.error('Failed to upload the business card.');
      throw error;
    }
  };

  const postMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/wholesale`,
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || 'অর্ডার সফলভাবে প্রক্রিয়াধীন হয়েছে');
      onClose();
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || 'কিছু সমস্যা হয়েছে';
      toast.error(errorMessage);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation logic for business type
    if (formData.businessType === 'দোকান' || formData.businessType === 'শোরুম') {
      if (!formData.businessCard) {
        alert('Please upload your visiting card.');
        return;
      }
      try {
        const uploadedUrl = await uploadToCloudinary(formData.businessCard);
        formData.businessCard = uploadedUrl; // Replace local file with Cloudinary URL
      } catch {
        return; // Exit if upload fails
      }
    } else if (formData.businessType === 'অনলাইন') {
      if (!formData.facebookPage) {
        alert('Please provide your Facebook page link.');
        return;
      }
    }

    const order = {
      ...formData,
      productName: product.name,
      productId: product._id,
    };
    postMutation.mutate(order);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000] ">
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto relative">
        <h2 className="text-xl font-bold mb-4 text-center">
          📝 অর্ডার ফর্ম ({product.name})
        </h2>
        <button onClick={onClose} className='text-red-600 absolute top-3 right-3'><MdCancel size={28} /></button>
        <div className="flex justify-between my-2">
          <h3>প্রোডাক্ট নেইম: {product?.name}</h3>
          <h4>প্রাইস: {product?.MainCashDiscountPrice}</h4>
        </div>

        <div className="mb-4">
          <p className="text-red-500 text-xs">নোট: মিনিমাম ১০টি পণ্য ক্রয় করতে হবে</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm font-medium">
              👤 গ্রাহকের নাম <span>*</span>
            </label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="আপনার নাম লিখুন"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium">
              🏛️ ব্যবসা প্রতিষ্ঠানের নাম ‍<span>*</span>
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="আপনার ব্যবসা প্রতিষ্ঠানের নাম লিখুন"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium">
              🏛️ মোট প্রোডাক্টস <span>*</span>
            </label>
            <input
              type="number"
              name="productQuantity"
              value={formData.productQuantity}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="আপনার ব্যবসা প্রতিষ্ঠানের নাম লিখুন"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium mb-2">
              ব্যবসার ধরণ <span>*</span>
            </label>
            <div className="flex items-center gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="businessType"
                  value="দোকান"
                  onChange={handleChange}
                  className="mr-2"
                />
                দোকান
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="businessType"
                  value="শোরুম"
                  onChange={handleChange}
                  className="mr-2"
                />
                শোরুম
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="businessType"
                  value="অনলাইন"
                  onChange={handleChange}
                  className="mr-2"
                />
                অনলাইন
              </label>
            </div>
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium">
              📞 ফোন নম্বর/হোয়াটসঅ্যাপ নাম্বার
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="ফোন নম্বর লিখুন"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium">
              🏠 প্রতিষ্ঠানের ঠিকানা ‍<span>*</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="আপনার ঠিকানা লিখুন"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium">
              📘 প্রতিষ্ঠানের ফেইসবুক পেইজ
            </label>
            <input
              type="text"
              name="facebookPage"
              value={formData.facebookPage}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="যদি থাকে"
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium">
              🌐 ওয়েবসাইট(যদি থাকে)
            </label>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="ওয়েবসাইট লিংক দিন"
            />
          </div>
{/* 
          <div className="mb-3">
            <label className="block text-sm font-medium">
              🖼️ ব্যবসা প্রতিষ্ঠানের ভিজিটিং কার্ড
            </label>
            <input
              type="file"
              name="businessCard"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              accept="image/*"
            />
          </div> */}
<div className="mb-3">
            <label className="block text-sm font-medium">
              🖼️ ব্যবসা প্রতিষ্ঠানের ভিজিটিং কার্ড
            </label>
            <input
              type="file"
              name="businessCard"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              accept="image/*"
            />
            {uploading && <p className="text-sm text-blue-500">Uploading...</p>}
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium">📝 নোট</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="অতিরিক্ত তথ্য দিন"
            ></textarea>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-3 py-1 rounded-md hover:bg-gray-500"
            >
              বাতিল
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
            >
              অর্ডার করুন
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;
