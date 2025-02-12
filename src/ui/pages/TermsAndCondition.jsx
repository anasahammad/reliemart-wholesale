import React from 'react';
import { FaBook, FaShoppingCart, FaExchangeAlt, FaMoneyBillWave, FaUserShield, FaHandshake, FaBalanceScale, FaPhoneAlt } from 'react-icons/fa';
import Header from '../../Components/Layout/Header';
import Footer from '../../Components/Layout/Footer';

const SectionTitle = ({ icon, title }) => (
  <div className="flex items-center mb-6 bg-gradient-to-r from-orange-100 to-orange-200 p-4 rounded-lg shadow-md">
    {icon}
    <h2 className="text-2xl font-bold text-orange-800 ml-4">{title}</h2>
  </div>
);

const SubSection = ({ title, children }) => (
  <div className="mb-6 bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
    <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
    {children}
  </div>
);

const TermsAndCondition = () => {
  return (
    <div className='min-h-screen'>

        <Header/>
        <br />
        <div className="bg-gradient-to-br from-orange-50 to-orange-100  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-orange-800 mb-4">টার্মস এন্ড কন্ডিশন</h1>
          <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
        </div>
        
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
          <div className="p-8">
            <SectionTitle icon={<FaShoppingCart className="text-3xl text-orange-600" />} title="১. ক্রয়-বিক্রয় এর শর্তাবলী" />
            
            <SubSection title="১.১ ডেলিভারির সময়সীমা">
              <p className="text-gray-600 mb-4 leading-relaxed">
                অর্ডার গ্রহণ করার পর সর্বোচ্চ ৪৮ ঘণ্টার মধ্যে আপনার অর্ডারকৃত প্রোডাক্টটি কুরিয়ারে বুকিং করা হবে। কুরিয়ারে বুকিং করার সর্বোচ্চ ৭২ ঘন্টার মধ্যে কাস্টমার প্রোডাক্টটি হাতে পেয়ে যাবেন। তবে অনাকাঙ্ক্ষিত কোন ঘটনা অথবা প্রাকৃতিক দুর্যোগের কারণে প্রডাক্টিভ বুকিং অথবা ডেলিভারি হতে আরো সর্বোচ্চ ১ থেকে ২ দিন বিলম্ব হতে পারে। সর্বমোট ৫ থেকে ৬ কর্ম দিবসের মধ্যে কাস্টমারের হাতে প্রোডাক্টটি ডেলিভারি করা হবে।
              </p>
            </SubSection>

            <SubSection title="১.২ পণ্য ফেরত এর নিয়মাবলী">
              <ul className="list-disc pl-6 text-gray-600 space-y-4">
                <li>
                  ডেলিভারি ম্যান দাঁড়িয়ে থাকা অবস্থায় প্রোডাক্টটি হাতে নিয়ে চেক করে নিতে হবে প্রোডাক্টের কোন ত্রুটি বের হলে প্রোডাক্টটি রিটার্ন করে দিতে হবে। পরবর্তীতে আমরা প্রোডাক্টটি চেক করে আবার পাঠিয়ে দেব। অথবা কাস্টমার না নিতে চাইলে অর্ডারটি ক্যানসেল করে দেওয়া হবে এবং যদি কোন অগ্রিম পেমেন্ট করে থাকে তাহলে রিফান্ড করা হবে।
                </li>
                <li>
                  প্রোডাক্ট রিটার্ন করার ক্ষেত্রে প্রোডাক্টের কোন ত্রুটি বের হলে সম্পূর্ণ টাকা কাস্টমার রিফান্ড পাবে। কিন্তু প্রোডাক্টের কোন ত্রুটি না থাকলে কাস্টমার ইচ্ছাকৃতভাবে প্রোডাক্টটি রিসিভ না করিলে ডেলিভারি চার্জ ব্যতীত বাকি টাকা রিফান্ড পাবে। সে ক্ষেত্রে কাস্টমার কোন অগ্রিম পেমেন্ট না করিলে ডেলিভারি চার্জ টি সেলারের বহন করতে হবে।
                </li>
                <li>
                  প্রোডাক্টের কোন ত্রুটি বের হলে ডেলিভারি ম্যান দাঁড়িয়ে থাকা অবস্থায় প্যাকেটটি আনবক্সিং করার ভিডিও সহ প্রোডাক্টের ত্রুটি উল্লেখ করে ভিডিওটি আমাদের পেইজে পাঠিয়ে দিলে আমরা ডেলিভারি চার্জ রিটার্ন করে দেব।
                </li>
                <li>
                  ডেলিভারি ম্যান প্রোডাক্টটি ডেলিভারি করে চলে আসার পরবর্তীতে প্রোডাক্ট রিটার্ন করার ক্ষেত্রে ডেলিভারি চার্জ সহ প্রোডাক্ট রিটার্ন করতে হবে। সেই ক্ষেত্রে প্রোডাক্টটি ব্যবহার করলে অথবা ওয়াশ করিলে প্রোডাক্টটি রিটার্ন হিসেবে গ্রহণ করা হবে না। এবং প্রোডাক্টটি সুন্দর ভাবে প্যাকেটিং করে রিটার্ন করতে হবে। সেই ক্ষেত্রে প্রোডাক্টটি আমাদের হাতে আসার পর চেক করে সবকিছু ঠিকঠাক পেলে প্রোডাক্টটির প্রাইজ অগ্রিম নেওয়া থাকলে রিফান্ড করা হবে।
                </li>
              </ul>
            </SubSection>

            <SectionTitle icon={<FaBook className="text-3xl text-orange-600" />} title="২. সূচনা" />
            <SubSection title="">
              <p className="text-gray-600 mb-4 leading-relaxed">
                Relifemart একটি সম্পূর্ণ অটোমেটেড অনলাইন প্রোডাক্ট রিসেলিং বিজনেস এর সহযোগী প্লাটফর্ম। আপনারা যারা প্রোডাক্ট নিয়ে অনলাইনে বিজনেস করে প্রফিট অর্জন করতে আগ্রহী, কিন্তু মূলধন, প্রোডাক্টের স্টক এবং লজিস্টিক সাপোর্ট ব্যবস্থা না থাকায় বিজনেস টি শুরু করতে পারছেন না, এই ক্ষেত্রে Relifemart আপনাকে দিচ্ছে, আপনার নিজস্ব অনলাইন বিজনেসটি বিনা পুঁজিতে শুরু এবং পরিচালনা করার সকল ধরনের সাপোর্ট।
              </p>
            </SubSection>

            {/* Add more sections here following the same pattern */}

            <SectionTitle icon={<FaPhoneAlt className="text-3xl text-orange-600" />} title="৮. যোগাযোগ" />
            <SubSection title="">
              <div className="bg-orange-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-orange-800 mb-4">Relifemart</h4>
                <p className="text-gray-700 mb-2">Call: 09647300100</p>
                <p className="text-gray-700 mb-2">Email: support@relifemart.com</p>
                <p className="text-gray-700 mb-2">Facebook: https://web.facebook.com/relifemart</p>
                <p className="text-gray-700">House-717, Road-1, Mohammadpur, Dhaka-1207, Bangladesh</p>
              </div>
            </SubSection>
          </div>
        </div>
      </div>
    </div>

    <Footer/>
    </div>
  );
};

export default TermsAndCondition;