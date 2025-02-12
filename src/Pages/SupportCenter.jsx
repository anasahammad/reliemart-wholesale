import React from 'react';
import { Phone, Facebook, Send, Mail, MapPin, Clock, MessageCircle, Globe } from 'lucide-react';

const SupportCenter = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">সাপোর্ট সেন্টার</h1>
          <p className="text-lg text-gray-600">আমরা সবসময় আপনাকে সহায়তা করতে প্রস্তুত</p>
        </div>

        {/* Emergency Contact Card */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-xl p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-white mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">জরুরি হটলাইন</h2>
              <p className="text-lg opacity-90">২৪/৭ সাপোর্ট সার্ভিস</p>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="h-8 w-8 text-white animate-bounce" />
              <a href="tel:+8801234567890" className="text-3xl font-bold text-white hover:opacity-90">
                ০১৮২০৭৪০৬০৭
              </a>
            </div>
          </div>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Facebook Card */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Facebook className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="ml-4 text-xl font-semibold">ফেসবুক পেজ</h3>
            </div>
            <p className="text-gray-600 mb-4">আমাদের ফেসবুক পেজে যুক্ত হোন এবং সর্বশেষ আপডেট পান</p>
            <a 
              href="https://facebook.com/relifemart" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-700"
            >
              পেজে যান <Globe className="ml-2 h-4 w-4" />
            </a>
          </div>

          {/* Telegram Card */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Send className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="ml-4 text-xl font-semibold">টেলিগ্রাম চ্যানেল</h3>
            </div>
            <p className="text-gray-600 mb-4">আমাদের টেলিগ্রাম চ্যানেলে যোগ দিন দ্রুত আপডেটের জন্য</p>
            <a 
              href="https://t.me/relifemart" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-700"
            >
              চ্যানেলে যোগ দিন <Globe className="ml-2 h-4 w-4" />
            </a>
          </div>

          {/* WhatsApp Card */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <MessageCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="ml-4 text-xl font-semibold">হোয়াটসঅ্যাপ</h3>
            </div>
            <p className="text-gray-600 mb-4">দ্রুত রেসপন্সের জন্য হোয়াটসঅ্যাপে মেসেজ করুন</p>
            <a 
              href="https://wa.me/8801820740607" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-green-600 hover:text-green-700"
            >
              মেসেজ করুন <Globe className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6">অতিরিক্ত তথ্য</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Office Address */}
            <div className="flex items-start">
              <MapPin className="h-6 w-6 text-gray-400 mt-1" />
              <div className="ml-4">
                <h3 className="text-lg font-semibold mb-2">অফিস ঠিকানা</h3>
                <p className="text-gray-600">
                  চাষাড়া, নারায়ণগঞ্জ<br />
                  ঢাকা, বাংলাদেশ
                </p>
              </div>
            </div>

            {/* Office Hours */}
            <div className="flex items-start">
              <Clock className="h-6 w-6 text-gray-400 mt-1" />
              <div className="ml-4">
                <h3 className="text-lg font-semibold mb-2">অফিস সময়</h3>
                <p className="text-gray-600">
                  শনি - বৃহস্পতি: সকাল ১০টা - রাত ১০টা<br />
                  শুক্রবার: সকাল ১০টা - বিকাল ৬টা
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start">
              <Mail className="h-6 w-6 text-gray-400 mt-1" />
              <div className="ml-4">
                <h3 className="text-lg font-semibold mb-2">ইমেইল</h3>
                <a href="mailto:support@relifemart.com" className="text-blue-600 hover:text-blue-700">
                  support@relifemart.com
                </a>
              </div>
            </div>

            {/* Customer Support */}
            <div className="flex items-start">
              <Phone className="h-6 w-6 text-gray-400 mt-1" />
              <div className="ml-4">
                <h3 className="text-lg font-semibold mb-2">কাস্টমার সাপোর্ট</h3>
                <p className="text-gray-600">
                  হটলাইন: ০১৮২০৭৪০৬০৭<br />
                  অফিস: ০১৮২০৭৪০৬০৭
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">সাধারণ জিজ্ঞাসা</h2>
          <p className="text-gray-600 mb-6">
            আপনার প্রশ্নের উত্তর খুঁজে না পেলে আমাদের FAQ সেকশন দেখুন
          </p>
          <a 
            href="/faq"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
          >
            FAQ দেখুন
          </a>
        </div>
      </div>
    </div>
  );
};

export default SupportCenter;