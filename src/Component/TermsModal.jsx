import React from "react";

function TermsModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Modal Container */}
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg">
        {/* Modal Header */}
        <div className="border-b px-4 py-3 text-center">
          <h2 className="text-green-700 text-lg font-semibold">শর্ত সমূহ</h2>
        </div>

        {/* Modal Body */}
        <div className="p-4">
          {/* Intro Section */}
          <div className="flex justify-center items-center gap-2 mb-4">
            <h2 className="font-semibold text-sm lg:text-base">
              অর্ডার করতে ক্লিক করুন ➡
            </h2>
            <button
              onClick={handleConfirm}
              className="bg-gradient-to-r from-green-500 to-green-700 text-white px-3 py-1 text-sm rounded-md shadow-md hover:from-green-600 hover:to-green-800 transition"
            >
              শর্তসমূহে রাজি আছি
            </button>
          </div>

          {/* List of Terms */}
          <ul className="list-disc list-inside space-y-3 text-[#f45142] text-sm">
            <li>
              নতুন সেলারের ক্ষেত্রে প্রথম ২ টি অর্ডারের ডেলিভারি চার্জ অবশ্যই
              অগ্রিম প্রদান করিতে হবে।
            </li>
            <li>
              ডেলিভারি ম্যান দাঁড়িয়ে থাকা অবস্থায় প্রোডাক্টটি চেক করে নিতে
              হবে, প্রোডাক্ট এর কোন ত্রুটি বের হলে তখনই রিটার্ন করতে বলবেন।
            </li>
            <li>
              ডেলিভারি ম্যান চলে যাওয়ার পর প্রোডাক্টটি রিটার্ন অথবা পরিবর্তন
              করে নিতে চাইলে অতিরিক্ত ডেলিভারি চার্জ প্রদান করতে হবে।
            </li>
            <li>
              নিচের উল্লেক্ষিত ক্যাটেগরির প্রোডাক্টের জন্য অবশ্যই কাস্টমারের
              নিকট থেকে ডেলিভারি চার্জ অগ্রিম নিতে হবে এবং আমাদের পেমেন্ট করে
              অর্ডার প্লেস করতে হবেঃ
              <ul className="list-disc list-inside mt-1 ml-5 text-gray-600 italic text-xs">
                <li>হেডফোন</li>
                <li>স্মার্ট-ওয়াচ</li>
                <li>পাওয়ার-ব্যাংক</li>
                <li>ক্যামেরা</li>
                <li>স্পিকার</li>
              </ul>
            </li>
          </ul>

          {/* Additional Note */}
          <p className="text-green-600 text-xs font-medium mt-4">
            কারণঃ এই প্রোডাক্ট গুলো রিটার্ন হলে কাভার নষ্ট হয়ে যায়। পরবর্তীতে
            বিক্রয় উপযুক্ত থাকে না। চেষ্টা করবেন যেন রিটার্ন না আসে।
          </p>
        </div>

        {/* Modal Footer */}
        <div className="border-t px-4 py-3 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition"
          >
            বাতিল করুন
          </button>
        </div>
      </div>
    </div>
  );
}

export default TermsModal;
