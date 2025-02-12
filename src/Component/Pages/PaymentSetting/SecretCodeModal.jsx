
import React from 'react';

const SecretCodeModal = ({ message, email, onClose }) => {
    return (
        <div
        className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
        onClick={onClose}
      >
        <div
          className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-lg font-semibold text-center mb-4">সিক্রেট কোড</h3>
          <p className="text-gray-700 text-center mb-4">
            {message}
            <br />
            সিক্রেট কোডটি আপনার ইমেইলে{" "}
            <span className="text-green-500 font-semibold">{email}</span> পাঠানো হবে।
          </p>
          <button
            className="w-full bg-blue-500 text-white p-2 rounded-lg"
            onClick={onClose}
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    );
}

export default SecretCodeModal;
