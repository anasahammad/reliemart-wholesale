import React, { useEffect } from 'react';
import { Star, DollarSign, AlertCircle, CheckCircle } from 'lucide-react';

const PassiveIncomePage = () => {

  const products = [
    { name: 'মোবাইল কেস', basePrice: 200, resalePrice: 220, profit: 20 },
    { name: 'হেডফোন', basePrice: 300, resalePrice: 350, profit: 50 },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-orange-600">রিলাইফমার্ট</h1>
          <p className="mt-2 text-lg text-gray-600">প্যাসিভ ইনকাম প্রোগ্রাম</p>
        </div>

        {/* Quote Banner */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl mb-8 shadow-sm">
          <p className="text-green-800 text-center text-lg font-medium">
            "প্যাসিভ ইনকাম এমন একটি উপার্জনের পদ্ধতি যেখানে আপনি সরাসরি সময় বা শ্রম বিনিয়োগ না করেও নিয়মিত আয় করতে পারেন। এটি একবার সেটআপ করার পর নিজে থেকেই আয় এনে দেয়"
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-gray-100 p-6 md:p-12 lg:p-20 text-gray-800">
      {/* Hero Section */}
      <section className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-bold text-blue-600">🚀 রিসেলার ইনকাম সিস্টেম</h1>
        <p className="text-lg mt-4">টিম ভিত্তিক সেল সিস্টেম এবং ইনসেন্টিভ মডেল</p>
      </section>

      {/* Section 1: MLR System */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-blue-500">১. মাল্টি-লেভেল রিসেলিং (MLR)</h2>
        <p className="mt-2">
          রিসেলাররা তাদের নিজস্ব দল তৈরি করতে পারবে এবং অধীনস্থ রিসেলারদের বিক্রয় থেকে কমিশন অর্জন করবে।
        </p>
        <table className="w-full mt-4 border">
          <thead>
            <tr className="bg-blue-50">
              <th className="p-2">লেভেল</th>
              <th className="p-2">কাজ</th>
              <th className="p-2">কমিশন</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 text-center">লেভেল ১</td>
              <td className="p-2">নিজের পণ্য বিক্রি</td>
              <td className="p-2">১০%</td>
            </tr>
            <tr>
              <td className="p-2 text-center">লেভেল ২</td>
              <td className="p-2">অধীনস্থ রিসেলার বিক্রয়</td>
              <td className="p-2">৫%</td>
            </tr>
            <tr>
              <td className="p-2 text-center">লেভেল ৩</td>
              <td className="p-2">সাব-রিসেলার বিক্রয়</td>
              <td className="p-2">২%</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Section 2: Incentive System */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-blue-500">২. ইনসেন্টিভ সিস্টেম</h2>

        <h2 className="text-sm font-semibold text-gray-800 my-3">প্রতিটি পণ্যের জন্য একটি ফিক্সড রিসেলার প্রাইস (Base Price) নির্ধারণ করা হবে।
রিসেলার যদি নির্ধারিত মূল্যের চেয়ে বেশি দামে বিক্রি করতে পারে, সেই অতিরিক্ত লাভ তাদের পকেটে যাবে।</h2>
        <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-gray-600">পণ্যের নাম</th>
            <th className="px-4 py-2 text-left text-gray-600">অ্যাডমিন প্রাইস</th>
            <th className="px-4 py-2 text-left text-gray-600">রিসেলার বিক্রি মূল্য</th>
            <th className="px-4 py-2 text-left text-gray-600">লাভ/কমিশন</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index} className="border-t border-gray-200">
              <td className="px-4 py-2 text-gray-800">{product.name}</td>
              <td className="px-4 py-2 text-gray-800">taka {product.basePrice}</td>
              <td className="px-4 py-2 text-gray-800">taka {product.resalePrice}</td>
              <td className="px-4 py-2 text-gray-800">taka {product.profit}</td>
            </tr>
          ))}
        </tbody>
      </table>
        <p className="mt-2">বিক্রয় লক্ষ্য পূরণ করলে বিশেষ বোনাস!</p>
        <table className="w-full mt-4 border">
          <thead>
            <tr className="bg-blue-50">
              <th className="p-2">লেভেল</th>
              <th className="p-2">মাসিক টার্গেট</th>
              <th className="p-2">বোনাস</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 text-center">লেভেল ১</td>
              <td className="p-2">৫০ পণ্য</td>
              <td className="p-2">৳300</td>
            </tr>
            <tr>
              <td className="p-2 text-center">লেভেল ২</td>
              <td className="p-2">১০০ পণ্য</td>
              <td className="p-2">৳800</td>
            </tr>
            <tr>
              <td className="p-2 text-center">লেভেল ৩</td>
              <td className="p-2">২০০ পণ্য</td>
              <td className="p-2">৳1500</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Section 3: Dashboard Features */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-blue-500">৩. রিসেলার ড্যাশবোর্ড</h2>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>✅ ব্যক্তিগত বিক্রয় রিপোর্ট</li>
          <li>✅ টিম বিক্রয় রিপোর্ট</li>
          <li>✅ কমিশন বিবরণ</li>
          <li>✅ রেফারেল কোড ম্যানেজমেন্ট</li>
        </ul>
      </section>

      {/* Section 4: Example Explanation */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-blue-500">৪. উদাহরণ</h2>
        <p className="mt-2">রিসেলার A → রিসেলার B → রিসেলার C</p>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>✅ A নিজে ১০টি পণ্য বিক্রি করলো → ১০% কমিশন।</li>
          <li>✅ B বিক্রি করলো ৫টি পণ্য → B পেলো ১০% কমিশন, A পেলো ৫%।</li>
          <li>✅ C বিক্রি করলো ৩টি পণ্য → C পেলো ১০%, B পেলো ৫%, A পেলো ২%।</li>
        </ul>
      </section>

      {/* CTA Section */}
      <section className="text-center mt-10">
        <h3 className="text-xl font-semibold">আপনার টিম তৈরি শুরু করুন!</h3>
        <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600">
          🚀 শুরু করুন
        </button>
      </section>
    </div>
      </div>
    </div>
  );
};

export default PassiveIncomePage;