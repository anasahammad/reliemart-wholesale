import React from "react";

function NitimalaModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50"
      aria-labelledby="terms-dialog-title"
      aria-describedby="terms-dialog-description"
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        {/* Dialog Title */}
        <div className="border-b p-4">
          <h2
            id="terms-dialog-title"
            className="text-center text-[#f45142] text-lg sm:text-sm font-semibold"
          >
            রিলাইফমার্ট রিসেলিং নীতিমালা
          </h2>
        </div>

        {/* Dialog Content */}
        <div className="p-4">
          {/* Introductory Section */}
          <p className="text-[#333] text-sm sm:text-xs leading-relaxed mb-4">
            রিলাইফমার্ট হল একটি বিশ্বস্ত ই-কমার্স প্ল্যাটফর্ম, যা সাশ্রয়ী মূল্যে
            মানসম্পন্ন পণ্য সরবরাহ করার জন্য প্রতিশ্রুতিবদ্ধ। আমাদের লক্ষ্য হল
            রিসেলারদের জন্য সহজ এবং ঝামেলামুক্ত সেবা প্রদান করা। নিচে রিসেলিং
            নীতিমালা দেওয়া হল:
          </p>

          {/* List of Rules */}
          <ul className="list-disc list-inside space-y-2 text-[#f45142] text-sm sm:text-xs">
            <li>
              নতুন সেলারের ক্ষেত্রে প্রথম ২ টি অর্ডারের ডেলিভারি চার্জ অবশ্যই
              অগ্রিম প্রদান করিতে হবে।
            </li>
            <li>
              ডেলিভারি ম্যান দাঁড়িয়ে থাকা অবস্থায় প্রোডাক্টটি চেক করে নিতে হবে,
              প্রোডাক্ট এর কোন ত্রুটি বের হলে তখনই রিটার্ন করতে বলবেন।
            </li>
            <li>
              ডেলিভারি ম্যান চলে যাওয়ার পর প্রোডাক্টটি রিটার্ন অথবা পরিবর্তন করে
              নিতে চাইলে অতিরিক্ত ডেলিভারি চার্জ প্রদান করতে হবে।
            </li>
            <li>
              নিচের উল্লেক্ষিত ক্যাটেগরির প্রোডাক্টের জন্য অবশ্যই কাস্টমারের
              নিকট থেকে ডেলিভারি চার্জ অগ্রিম নিতে হবে এবং আমাদের পেমেন্ট করে
              অর্ডার প্লেস করতে হবেঃ
              <ul className="list-disc list-inside text-gray-600 italic text-xs mt-1 ml-4">
                <li>হেডফোন</li>
                <li>স্মার্ট-ওয়াচ</li>
                <li>পাওয়ার-ব্যাংক</li>
                <li>ক্যামেরা</li>
                <li>স্পিকার</li>
              </ul>
            </li>
          </ul>

          {/* Additional Note */}
          <p className="text-green-600 text-xs sm:text-[10px] font-medium mt-4 leading-relaxed">
            কারণঃ এই প্রোডাক্ট গুলো রিটার্ন হলে কাভার নষ্ট হয়ে যায়। পরবর্তীতে
            বিক্রয় উপযুক্ত থাকে না। চেষ্টা করবেন যেন রিটার্ন না আসে।
          </p>
        </div>

        {/* Dialog Actions */}
        <div className="border-t p-4">
          <button
            onClick={onClose}
            className="w-full bg-[#f45142] text-white py-2 rounded hover:bg-[#d13d36] transition"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}

export default NitimalaModal;
