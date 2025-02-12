import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoCloudUploadOutline, IoCloseCircleOutline } from "react-icons/io5";
import { FaCheckCircle, FaImage, FaTrash } from "react-icons/fa";
import axios from "axios";

const ImageUpload = ({ onUpload, onRemove, image }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      uploadImage(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      uploadImage(e.target.files[0]);
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append('upload_preset', 'rowshanara'); // Replace with your Cloudinary upload preset
    formData.append('cloud_name', 'drbtvputr');

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/drbtvputr/image/upload`,
        formData
        
      );
      const imageUrl = response.data.secure_url;
      onUpload(imageUrl);
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`relative border-2 border-dashed rounded-lg p-4 text-center transition-all duration-300 ${
        isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
      }`}
    >
      {image ? (
        <div className="relative">
          <img
            src={image}
            alt="Uploaded Preview"
            className="mx-auto max-h-48 rounded-md"
          />
          <button
            onClick={onRemove}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors duration-300"
          >
            <FaTrash size={14} />
          </button>
        </div>
      ) : (
        <div className="text-gray-500">
          <FaImage className="mx-auto text-4xl mb-2" />
          <p className="text-sm mb-2">ছবি আপলোড করুন বা এখানে টেনে আনুন</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            ফাইল নির্বাচন করুন
          </motion.button>
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
    </div>
  );
};

const ProductRequest = () => {
  const [showForm, setShowForm] = useState(false);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({ productName: "", notes: "" });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
    if (!showForm) {
      setFormData({ productName: "", notes: "" });
      setImage(null);
      setErrors({});
      setSuccessMessage("");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleImageUpload = (url) => {
    setImage(url);
    if (errors.image) {
      setErrors({ ...errors, image: "" });
    }
  };

  const handleImageRemove = () => {
    setImage(null);
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.productName.trim()) {
      newErrors.productName = "প্রোডাক্টের নাম আবশ্যক।";
      valid = false;
    }

    if (!image) {
      newErrors.image = "প্রোডাক্টের ছবি আবশ্যক।";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsSubmitting(true);
      const finalData = { ...formData, image: image };
      
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Form Data:", finalData);
      setSuccessMessage("প্রোডাক্ট রিকুয়েস্ট সফলভাবে জমা হয়েছে!");
      setIsSubmitting(false);
      setTimeout(() => {
        toggleForm();
        setSuccessMessage("");
      }, 3000);
    }
  };

  return (
    <div className="flex justify-center items-start p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            প্রোডাক্ট রিকুয়েস্ট
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleForm}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              showForm 
                ? "bg-red-500 hover:bg-red-600 text-white" 
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {showForm ? <IoCloseCircleOutline size={24} /> : "নতুন রিকুয়েস্ট"}
          </motion.button>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    প্রোডাক্টের নাম
                  </label>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleInputChange}
                    placeholder="প্রোডাক্টের নাম লিখুন"
                    className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-300 transition-all duration-300 ${
                      errors.productName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.productName && (
                    <p className="text-red-500 text-xs mt-1">{errors.productName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    প্রোডাক্টের ছবি
                  </label>
                  <ImageUpload
                    onUpload={handleImageUpload}
                    onRemove={handleImageRemove}
                    image={image}
                  />
                  {errors.image && (
                    <p className="text-red-500 text-xs mt-1">{errors.image}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    আপনার মন্তব্য
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="আপনার মন্তব্য লিখুন (ঐচ্ছিক)"
                    rows="3"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 transition-all duration-300"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`w-full py-2 rounded-md text-white transition-all duration-300 ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {isSubmitting ? "প্রক্রিয়াকরণ হচ্ছে..." : "জমা দিন"}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!showForm && !successMessage && (
          <div className="text-center text-gray-500 mt-4">
            কোনো রেকর্ড পাওয়া যায়নি!
          </div>
        )}

        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-4 p-4 bg-green-100 text-green-700 rounded-md flex items-center justify-center space-x-2"
            >
              <FaCheckCircle />
              <span>{successMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ProductRequest;