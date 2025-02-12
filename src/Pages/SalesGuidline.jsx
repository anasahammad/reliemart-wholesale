import React from "react";

const SalesGuideline = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <header className="bg-orange-500 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-lg font-bold">RELIFEMART</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <section className="bg-white shadow-md rounded-md p-6">
          <h2 className="text-xl font-bold text-green-600 mb-4">
            প্রোডাক্ট কোয়ালিটি এবং সতর্কতা
          </h2>
          <p className="text-gray-700 mb-6">
            আমাদের প্ল্যাটফর্মে প্রোডাক্ট নিয়ে অনেকেই সেল করার ক্ষেত্রে অনেকেই
            নিজের সেলস বাড়ানোর এবং ক্রেতা ধরে রাখার নিয়ম এবং অনুমান করা হয়।
          </p>
          <ul className="list-disc list-inside mb-6">
            <li>
              ***(★★★) গ্রাহকদের সর্বোচ্চ সন্তুষ্টির জন্য প্রোডাক্ট যেন সঠিক
              সময় সঠিক মানে ডেলিভারি দেয়া হয়।
            </li>
            <li>
              ***(★★★) প্রোডাক্টের ক্রেতার অভিযোগ নিশ্চিত করুন এবং প্রয়োজনে
              ক্রেতাদের সঙ্গে কমিউনিকেশন রাখুন।
            </li>
          </ul>
          <p className="text-gray-700">
            গ্রাহক অভিযোগের ক্ষেত্রে গ্রাহকদের সঠিক পরিষেবা নিশ্চিত করুন। এটি
            প্রোডাক্ট কেনার জন্য ক্রেতাদের আস্থা অর্জনের একটি বড় ভূমিকা পালন
            করে।
          </p>
        </section>

        <section className="bg-white shadow-md rounded-md p-6 mt-6">
          <h2 className="text-xl font-bold text-green-600 mb-4">
            অর্ডার সংগ্রহ নিয়মাবলী
          </h2>
          <p className="text-gray-700">
            অর্ডার গ্রহণের ক্ষেত্রে পেমেন্ট নিশ্চিত করুন এবং ডেলিভারির তথ্য
            সঠিকভাবে পূরণ করুন।
          </p>
          <p className="text-gray-700 mt-2">
            পেমেন্ট নিশ্চিত করার পর অর্ডার শিপিং করুন।
          </p>
        </section>

        <section className="bg-white shadow-md rounded-md p-6 mt-6">
          <h2 className="text-xl font-bold text-green-600 mb-4">
            অ্যাকাউন্ট সম্পর্কিত নিরাপত্তা
          </h2>
          <p className="text-gray-700">
            অ্যাকাউন্টের পাসওয়ার্ড নিরাপত্তার ক্ষেত্রে নিশ্চিত করুন যে আপনার
            পাসওয়ার্ডটি অন্য কোথাও শেয়ার না করা হয়।
          </p>
          <p className="text-gray-700 mt-2">
            সেলারের অ্যাকাউন্টের তথ্য আপডেট করুন যাতে যেকোনো পরিবর্তন সঠিক
            সময়ে ঘটে।
          </p>
        </section>
      </main>
    </div>
  );
};

export default SalesGuideline;
