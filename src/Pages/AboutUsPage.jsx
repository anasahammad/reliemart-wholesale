import React from 'react';
import { FaShoppingBag, FaUsers, FaHandshake, FaLeaf, FaTrophy, FaRocket } from 'react-icons/fa';
import Header from '../Components/Layout/Header';

const AboutUsPage = () => {
  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      <Header activeHeading={3}/>
      <br />
      <br />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-12">
          About <span className="text-[#f45142] relative">
            Relifemart
            <span className="absolute bottom-0 left-0 w-full h-1 bg-[#f45142] transform -skew-x-12"></span>
          </span>
        </h1>

        <div className="bg-white shadow-2xl rounded-lg overflow-hidden mb-12">
          <div className="p-8 bg-gradient-to-r from-white to-gray-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
            <p className="text-lg text-gray-600 mb-6">
              Relifemart was born out of a passion for connecting quality products with savvy consumers. As a leading reseller platform, we bridge the gap between manufacturers and customers, offering a curated selection of top-notch items at competitive prices.
            </p>
            <p className="text-lg text-gray-600">
              Since our inception in 2020, we've been committed to providing an exceptional shopping experience, backed by reliable customer service and a user-friendly platform that makes reselling and purchasing a breeze.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <ValueCard 
            icon={FaShoppingBag} 
            title="Quality Products" 
            description="We carefully select and vet all products to ensure the highest quality for our customers."
          />
          <ValueCard 
            icon={FaUsers} 
            title="Community-Driven" 
            description="We foster a thriving community of resellers and buyers, creating opportunities for all."
          />
          <ValueCard 
            icon={FaHandshake} 
            title="Trust & Reliability" 
            description="Our platform is built on trust, ensuring secure transactions and reliable service."
          />
          <ValueCard 
            icon={FaLeaf} 
            title="Sustainability" 
            description="We promote sustainable practices by encouraging the resale of pre-loved items."
          />
          <ValueCard 
            icon={FaTrophy} 
            title="Customer Satisfaction" 
            description="Your satisfaction is our top priority. We go above and beyond to meet your needs."
          />
          <ValueCard 
            icon={FaRocket} 
            title="Innovation" 
            description="We continuously innovate to improve our platform and services for our users."
          />
        </div>

        <div className="bg-white shadow-2xl rounded-lg overflow-hidden mb-12">
          <div className="p-8 bg-gradient-to-r from-white to-gray-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-6">
              At Relifemart, our mission is to revolutionize the reselling industry by providing a seamless, trustworthy, and efficient platform that empowers entrepreneurs and delights customers. We aim to:
            </p>
            <ul className="list-disc list-inside text-lg text-gray-600 space-y-2">
              <li>Connect passionate resellers with eager buyers</li>
              <li>Offer a diverse range of high-quality products at competitive prices</li>
              <li>Promote sustainable consumption through our reselling model</li>
              <li>Provide exceptional customer service and support</li>
              <li>Foster a community of like-minded individuals passionate about entrepreneurship</li>
            </ul>
          </div>
        </div>

        <div className="bg-[#f45142] text-white rounded-lg shadow-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Join the Relifemart Family</h2>
          <p className="text-lg mb-8">
            Whether you're a reseller looking to grow your business or a customer searching for great deals, Relifemart is here to support you every step of the way.
          </p>
          <button className="bg-white text-[#f45142] py-3 px-8 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300 transform hover:scale-105 shadow-lg">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
};

const ValueCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 border border-gray-200">
    <div className="flex items-center mb-4">
      <Icon className="text-4xl text-[#f45142] mr-4" />
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default AboutUsPage;