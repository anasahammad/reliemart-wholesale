import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const SellerFaqPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "রিলাইফমার্ট কি?",
      answer: "রিলাইফমার্ট একটি সম্পূর্ণ ডকুমেন্টেড অনলাইন প্রোডাক্ট রিসেলিং বিজনেস এর সহযোগী প্ল্যাটফর্ম।"
    },
    {
      question: "ডেলিভারি চার্জ কত?",
      answer: "ডেলিভারি চার্জ ঢাকার মধ্যে ৭০ টাকা। ঢাকার বাইরে ১২০ টাকা। প্রোডাক্টের সংখ্যা বেশি হলে অথবা ওজন বেশি হলে ডেলিভারি চার্জ অতিরিক্ত হিসেবে ৫০ থেকে ৩০ টাকা পর্যন্ত বাড়তে পারে।"
    },
    {
      question: "রিটার্ন চার্জ নিতে হয় কি?",
      answer: "না, আমাদের কোন প্রকার রিটার্ন চার্জ নেওয়া হয় না।"
    },
    {
      question: "ডেলিভারি চার্জ কি অগ্রিম নিতে হয়?",
      answer: "নতুন সেলারের ক্ষেত্রে প্রথম ৫ টি অর্ডারের ডেলিভারি চার্জ অগ্রিম নিতে হবে। পরবর্তী অর্ডার ডেলিভারি হলে তখন আর অগ্রিম নিতে হবে না।"
    },
    {
      question: "এমআরপি অর্ডার এর সুবিধা আছে কি?",
      answer: "জি, ডেলিভারি ম্যান দাঁড়িয়ে থাকা অবস্থায় প্রোডাক্টটি চেক করে নিতে হবে, প্রোডাক্ট এর কোন ত্রুটি বের হলে আপনাকে অবশ্য আবার আমাদের প্রোডাক্ট পাঠিয়ে দেব, ডেলিভারি ম্যান চলে যাসার পর এমআরপি করে নিতে চাইলে সে ক্ষেত্রে ডেলিভারি চার্জ আবার নিতে হবে।"
    },
    {
      question: "অর্ডার করার কত সময় পর বুকিং দেওয়া হয়?",
      answer: "বিকেল ৫টার মধ্যে অর্ডার কমপ্লিট করা হলে সন্ধ্যার মধ্যেই বুকিং দেওয়া হয়ে থাকে। ডিলার পরের দিন অর্ডার বুকের দিন বুকিং দেওয়া হয়।"
    },
    {
      question: "প্রফিট কিভাবে এবং কত দিনের মধ্যে দেওয়া হয়?",
      answer: "আপনার প্রোডাক্টটি ডেলিভারি হয়ে গেলে ২৪ঘন্টা রাত বারোটার পর আপনার একাউন্টে প্রফিটের টাকা জমা হয়ে যাবে। প্রফিটের টাকা জমা হওয়ার সাথে সাথেই আপনি আপনার নগদ অথবা বিকাশে উত্তোলন করে নিতে পারবেন। আপস থেকে পেমেন্ট রিকোয়েস্ট দেওয়ার সর্বোচ্চ ২ ঘন্টার মধ্যে আপনার একাউন্টে টাকা চলে যাবে।"
    },
    {
      question: "একটি ডেলিভারি চার্জে একই ঠিকানায় একাধিক প্রোডাক্ট পাঠানো যাবে?",
      answer: "জি, আমাদের অ্যাপস থাকা যেকোনো প্রোডাক্টের সাথে অন্য যেকোনো প্রোডাক্ট এক করে একই ঠিকানায় একাধিকবার ডেলিভারি চার্জ দিতেই পাঠাতে পারবেন।"
    }
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-orange-600">সাধারণ জিজ্ঞাসা</h1>
          <p className="mt-2 text-gray-600">আপনার সকল প্রশ্নের উত্তর এখানে</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none"
              >
                <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`px-6 transition-all duration-200 ease-in-out ${
                  openIndex === index ? 'py-4' : 'h-0 overflow-hidden'
                }`}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            আরও কোন প্রশ্ন থাকলে আমাদের সাথে যোগাযোগ করুন
          </p>
          <Link 
            to="/seller/support"
            className="mt-2 inline-block text-orange-600 hover:text-orange-700 font-medium"
          >
            যোগাযোগ করুন →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellerFaqPage;