import React from 'react';
import { FaExchangeAlt, FaMoneyBillWave, FaShippingFast, FaExclamationTriangle } from 'react-icons/fa';
import Footer from '../../Components/Layout/Footer';
import Header from '../../Components/Layout/Header';

const SectionTitle = ({ icon, title }) => (
  <div className="flex items-center mb-6 bg-gradient-to-r from-blue-100 to-blue-200 p-4 rounded-lg shadow-md">
    {icon}
    <h2 className="text-2xl font-bold text-[#FC742A] ml-4">{title}</h2>
  </div>
);

const PolicyPoint = ({ children }) => (
  <div className="mb-4 bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
    <p className="text-gray-700 leading-relaxed">{children}</p>
  </div>
);

const ReturnAndRefundPolicy = () => {
  return (
    <div className='min-h-screen'>
      <Header />
      <br />
      <div className="  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-[#FC742A] mb-4">রিটার্ন এন্ড রিফান্ড পলিসি</h1>
          <div className="w-24 h-1 bg-[#FC742A] mx-auto"></div>
        </div>
        
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
          <div className="p-8">
            <p className="text-gray-600 mb-8 leading-relaxed">
              আমরা ক্যাশ অন ডেলিভারিতে সারা বাংলাদেশ হোম ডেলিভারি দিয়ে থাকি কুরিয়ারের মাধ্যমে। কাস্টমার প্রোডাক্ট হাতে পাওয়ার পর প্রোডাক্ট এর কোন ত্রুটি বের হলে প্রোডাক্টটি রিটার্ন করার সুযোগ রয়েছে। রিটার্ন করার ক্ষেত্রে নিচের পলিসি অনুযায়ী কাস্টমারের টাকা রিফান্ড করা হবে।
            </p>

            <SectionTitle icon={<FaExchangeAlt className="text-3xl text-[#FC742A]" />} title="রিটার্ন পলিসি" />
            
            <p className="text-gray-700 mb-4">প্রোডাক্ট রিটার্ন করার ক্ষেত্রে নিচে নিয়ম অনুযায়ী প্রোডাক্ট রিটার্ন করতে হবে।</p>

            <PolicyPoint>
              ডেলিভারি ম্যান দাঁড়িয়ে থাকা অবস্থায় প্রোডাক্টটি হাতে নিয়ে চেক করে নিতে হবে প্রোডাক্টের কোন ত্রুটি বের হলে প্রোডাক্টটি রিটার্ন করে দিতে হবে। পরবর্তীতে আমরা প্রোডাক্টটি চেক করে আবার পাঠিয়ে দেব। অথবা কাস্টমার না নিতে চাইলে অর্ডারটি ক্যানসেল করে দেওয়া হবে এবং যদি কোন অগ্রিম পেমেন্ট করে থাকে তাহলে রিফান্ড করা হবে।
            </PolicyPoint>

            <PolicyPoint>
              প্রোডাক্ট রিটার্ন করার ক্ষেত্রে প্রোডাক্টের কোন ত্রুটি বের হলে সম্পূর্ণ টাকা কাস্টমার রিফান্ড পাবে। কিন্তু প্রোডাক্টের কোন ত্রুটি না থাকলে কাস্টমার ইচ্ছাকৃতভাবে প্রোডাক্টটি রিসিভ না করিলে ডেলিভারি চার্জ ব্যতীত বাকি টাকা রিফান্ড পাবে। সে ক্ষেত্রে কাস্টমার কোন অগ্রিম পেমেন্ট না করিলে ডেলিভারি চার্জ টি সেলারের বহন করতে হবে।
            </PolicyPoint>

            <PolicyPoint>
              প্রোডাক্টের কোন ত্রুটি বের হলে ডেলিভারি ম্যান দাঁড়িয়ে থাকা অবস্থায় প্যাকেটটি আনবক্সিং করার ভিডিও সহ প্রোডাক্টের ত্রুটি উল্লেখ করে ভিডিওটি আমাদের পেইজে পাঠিয়ে দিলে আমরা ডেলিভারি চার্জ রিটার্ন করে দেব।
            </PolicyPoint>

            <PolicyPoint>
              ডেলিভারি ম্যান প্রোডাক্টটি ডেলিভারি করে চলে আসার পরবর্তীতে প্রোডাক্ট রিটার্ন করার ক্ষেত্রে ডেলিভারি চার্জ সহ প্রোডাক্ট রিটার্ন করতে হবে। সেই ক্ষেত্রে প্রোডাক্টটি ব্যবহার করলে অথবা ওয়াশ করিলে প্রোডাক্টটি রিটার্ন হিসেবে গ্রহণ করা হবে না। এবং প্রোডাক্টটি সুন্দর ভাবে প্যাকেটিং করে রিটার্ন করতে হবে। সেই ক্ষেত্রে প্রোডাক্টটি আমাদের হাতে আসার পর চেক করে সবকিছু ঠিকঠাক পেলে প্রোডাক্টটির প্রাইজ অগ্রিম নেওয়া থাকলে রিফান্ড করা হবে।
            </PolicyPoint>

            <SectionTitle icon={<FaMoneyBillWave className="text-3xl text-[#FC742A]" />} title="রিফান্ড পলিসি" />

            <PolicyPoint>
              Relifemart এর রিটার্ন পলিসি অনুযায়ী কোন প্রোডাক্ট রিটার্ন এপ্রুভ হওয়ার ২৪ ঘন্টার মধ্যে টাকা রিফান্ড করা হবে। রিফান্ড করার ক্ষেত্রে যেই একাউন্ট থেকে পেমেন্ট করা হয়েছে সেই একাউন্টেই রিফান্ড করা হবে। সেক্ষেত্রে কাস্টমার রিফান্ড পাওয়ার জন্য অন্য কোন একাউন্ট নাম্বার প্রদান করিলে সেই একাউন্টে রিফান্ড করা হবে না।
            </PolicyPoint>

            <PolicyPoint>
              রিটার্ন এপ্রুভ হওয়ার ২৪ ঘন্টার মধ্যে কোনভাবে রিফান্ডের টাকা অ্যাকাউন্টে না পৌঁছালে অবশ্যই আমাদের ফেসবুক পেজ অথবা সাপোর্ট নাম্বারে যোগাযোগ করতে হবে পরবর্তী ২৪ ঘণ্টার মধ্যে অবশ্যই রিফান্ডটি এক্সিকিউট করা হবে।
            </PolicyPoint>

            <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FaExclamationTriangle className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    অনুগ্রহ করে মনে রাখবেন
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      রিটার্ন এবং রিফান্ড প্রক্রিয়া সম্পর্কে কোনো প্রশ্ন থাকলে, অনুগ্রহ করে আমাদের কাস্টমার সাপোর্ট টিমের সাথে যোগাযোগ করুন।
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default ReturnAndRefundPolicy;