import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import Header from '../../../Components/Layout/Header';
import Footer from '../../../Components/Layout/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Here you would typically send the form data to your backend
      console.log('Form submitted:', formData);
      setSuccessMsg('Thank you for your message. We\'ll get back to you soon!');
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <div className="min-h-screen ">
      <Header activeHeading={4}/>
      <br />
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              Contact <span className="text-[#FC742A]">Relifemart</span>
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              We'd love to hear from you. Please fill out this form or use our contact information below.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <form onSubmit={handleSubmit} className="p-8">
                <div className="mb-6">
                  <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FC742A] ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Your Name"
                  />
                  {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name}</p>}
                </div>
                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FC742A] ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FC742A] ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Your message here..."
                  ></textarea>
                  {errors.message && <p className="mt-1 text-red-500 text-sm">{errors.message}</p>}
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#FC742A] text-white font-semibold py-3 px-4 rounded-md hover:bg-[#e56a26] transition duration-300"
                >
                  Send Message
                </button>
              </form>
              {successMsg && (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mt-4">
                  <p>{successMsg}</p>
                </div>
              )}
            </div>

            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <FiMail className="text-[#FC742A] text-2xl mr-4 mt-1" />
                    <div>
                      <p className="font-semibold text-lg">Email</p>
                      <a href="mailto:contact@relifemart.com" className="text-gray-600 hover:text-[#FC742A] text-lg">contact@relifemart.com</a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FiPhone className="text-[#FC742A] text-2xl mr-4 mt-1" />
                    <div>
                      <p className="font-semibold text-lg">Phone</p>
                      <a href="tel:+8801322119001" className="text-gray-600 hover:text-[#FC742A] text-lg">+8801322119001</a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FiMapPin className="text-[#FC742A] text-2xl mr-4 mt-1" />
                    <div>
                      <p className="font-semibold text-lg">Address</p>
                      <p className="text-gray-600 text-lg">
                      Sector 10 uttara, Road 20, Dhaka, Bangladesh</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8 bg-gray-50">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Business Hours</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
                  <li>Saturday: 10:00 AM - 4:00 PM</li>
                  <li>Sunday: Closed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Contact;