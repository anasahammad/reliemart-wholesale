import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';

import { FaUser, FaEnvelope, FaPhone, FaWhatsapp, FaMapMarkerAlt, FaBirthdayCake, FaVenusMars } from 'react-icons/fa';
import { AiOutlineCamera } from 'react-icons/ai';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { customerActions } from '../../../store/reducers/userReducer';

const Profile = () => {
  const queryClient = useQueryClient();
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [newPassword, setNewPassword] = useState('');
  const userState = useSelector((state) => state.customer);
  const user = userState?.customerInfo.user || JSON.parse(localStorage.getItem('customerAccount'));
  const dispatch = useDispatch();


  const updateProfileMutation = useMutation({
    mutationFn: async (updatedData) => {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/user/update-details/${user._id}`, updatedData, {withCredentials: true});
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['user']);
      toast.success('Profile updated successfully!');
      setIsEditMode(false);
      dispatch(customerActions.setCustomerInfo(data))
      localStorage.setItem('customerAccount', JSON.stringify(data));
    },
    onError: (error) => {
      toast.error(`Error updating profile: ${error.message}`);
    },
  });

  const updatePasswordMutation = useMutation({
    mutationFn: async (newPassword) => {
      const response = await axios.patch(`${import.meta.env.VITE_API_URL}/user/update-password/${user._id}`, { newPassword: newPassword });
      return response.data;
    },
    onSuccess: () => {
      toast.success('Password updated successfully!');
      setNewPassword('');
    },
    onError: (error) => {
      toast.error(`Error updating password: ${error.message}`);
    },
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfileMutation.mutate(formData);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }
    updatePasswordMutation.mutate(newPassword);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'rowshanara');

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/drbtvputr/image/upload`,
        formData
      );
      const imageUrl = response.data.secure_url;
      updateProfileMutation.mutate({ profilePicture: imageUrl });
    } catch (error) {
      toast.error('Error uploading image');
    }
  };

  // if (isLoading) return <div className="text-center mt-8">Loading...</div>;
  // if (isError) return <div className="text-center mt-8 text-red-500">Error loading profile</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
          <h2 className="text-3xl font-bold mb-2">My Profile</h2>
          <p>Manage your account information</p>
        </div>

        <div className="p-6">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img
                src={user?.profilePicture || 'https://via.placeholder.com/150'}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
              <label htmlFor="profile-image" className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md cursor-pointer">
                <AiOutlineCamera className="text-gray-600 text-xl" />
                <input
                  type="file"
                  id="profile-image"
                  className="hidden"
                  onChange={handleImageUpload}
                  accept="image/*"
                />
              </label>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  <FaUser className="inline mr-2" /> Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={user.name}
                  onChange={handleInputChange}
                  disabled={!isEditMode}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  <FaEnvelope className="inline mr-2" /> Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  defaultValue={user.email}
                  disabled
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                  <FaPhone className="inline mr-2" /> Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  defaultValue={user.phone}
                  onChange={handleInputChange}
                  disabled={!isEditMode}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="whatsApp">
                  <FaWhatsapp className="inline mr-2" /> WhatsApp
                </label>
                <input
                  type="tel"
                  id="whatsApp"
                  name="whatsApp"
                  defaultValue={user.whatsApp}
                  onChange={handleInputChange}
                  disabled={!isEditMode}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                  <FaMapMarkerAlt className="inline mr-2" /> Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  defaultValue={user.address}
                  onChange={handleInputChange}
                  disabled={!isEditMode}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateOfBirth">
                  <FaBirthdayCake className="inline mr-2" /> Date of Birth
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  defaultValue={user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : ''}
                  onChange={handleInputChange}
                  disabled={!isEditMode}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
                  <FaVenusMars className="inline mr-2" /> Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  defaultValue={user.gender}
                  onChange={handleInputChange}
                  disabled={!isEditMode}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              {isEditMode &&  (
                <>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditMode(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Cancel
                  </button>
                </>
              ) 
              }

              {!isEditMode && (
                
                <button
                  type="button"
                  onClick={() => setIsEditMode(true)}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Edit Profile
                </button>
                
              ) }
            </div>
          </form>

          <div className="mt-8 border-t pt-6">
            <h3 className="text-xl font-semibold mb-4">Change Password</h3>
            <form onSubmit={handlePasswordChange} className="flex items-center">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
              />
              <button
                type="submit"
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;