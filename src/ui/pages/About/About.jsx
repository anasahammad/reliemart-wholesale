

import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-100 py-10 px-5 md:px-20">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-blue-600 mb-6">RilifeMart - আপনার নির্ভরযোগ্য অনলাইন বিজনেস পার্টনার</h1>
        <p className="text-gray-700 text-lg mb-8">
          আপনি কি অনলাইন বিজনেস শুরু করতে চান কিন্তু ইনভেস্টমেন্ট, স্টক, এবং ডেলিভারি ঝামেলায় পড়তে চান না? RilifeMart আপনাকে দিচ্ছে একটি বিনা পুঁজির ব্যবসা শুরু করার সুবর্ণ সুযোগ।
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-500 mb-2">নিম্ন মূল্যে পণ্য</h3>
            <p className="text-gray-600">সর্বনিম্ন পাইকারি দামে কোয়ালিটি প্রোডাক্ট সংগ্রহ করুন।</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-500 mb-2">ঝামেলাহীন ডেলিভারি</h3>
            <p className="text-gray-600">কাস্টমারের কাছে সরাসরি পণ্য পৌঁছে দিন আমাদের মাধ্যমে।</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-500 mb-2">দ্রুত পেমেন্ট</h3>
            <p className="text-gray-600">প্রতিদিনের প্রফিট পেয়ে যান আপনার অ্যাকাউন্টে।</p>
          </div>
        </div>

        <div className="mt-10">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700">
            আজই রেজিস্ট্রেশন করুন
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;

