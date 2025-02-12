import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import axios from "axios";
import { getUserByIdForReseller } from "../../../services/index/users";

export default function AddPaymentMethod() {
  const [accounts, setAccounts] = useState([]);
  const [resellerAccounts, setResellerAccounts] = useState();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const userState = useSelector((state) => state.user);

  const userInfo = userState?.userInfo || JSON.parse(localStorage.getItem("resellerAccount"));
  const resellerId = userInfo?.user?._id;

  const paymentMethods = [
    {
      value: "bkash",
      label: "বিকাশ",
      img: "https://freepnglogo.com/images/all_img/1701670291bKash-App-Logo-PNG.png",
    },
    {
      value: "nagad",
      label: "নগদ",
      img: "https://freelogopng.com/images/all_img/1679248828Nagad-Logo-PNG.png",
    },
    {
      value: "rocket",
      label: "রকেট",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT12VgBUxXDd2i17DbU1_o5hp-u6YxBBdSKkQ&s",
    },
    {
      value: "upay",
      label: "উপায়",
      img: "https://upload.wikimedia.org/wikipedia/bn/a/a8/%E0%A6%89%E0%A6%AA%E0%A6%BE%E0%A6%AF%E0%A6%BC_%E0%A6%B2%E0%A7%8B%E0%A6%97%E0%A7%8B.png",
    },
    {
      value: "mCash",
      label: "এমক্যাশ",
      img: "https://play-lh.googleusercontent.com/8sY7fsOPPoXNt36tNQR9dOnpmbjaYaoXQ8e2U_m-Jd535v1W--Zp31JUFAT1j35lmA4",
    },
  ];


  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    try {
      const response = await axios.patch(`${import.meta.env.VITE_API_URL}/reseller/update-withdraw-secret`, { resellerId });
      setMessage(response.data.message);
      setLoading(false); // Set loading to false after the request is completed
    } catch (error) {
      setMessage(error.response.data.message);
      setLoading(false); // Set loading to false in case of error
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserByIdForReseller(resellerId);
        console.log(userData)
        setResellerAccounts(userData.user);
        setAccounts(userData.user.bankAccount);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUser();
  }, [resellerId]);

  // Save account to database
  const saveToDatabase = async (newAccount) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/reseller/${resellerId}/bankAccount`, {
        accountNumber: newAccount.accountNumber,
        accountName: newAccount.paymentMethod,
        bankName: newAccount.paymentValue,
      });
      setAccounts((prev) => [...prev, newAccount]);
      toast.success("সফলভাবে সংরক্ষণ করা হয়েছে!");
    } catch (error) {
      toast.error("একাউন্ট সংরক্ষণে সমস্যা হয়েছে।");
      console.error(error);
    }
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const accountNumber = e.target.accountNumber.value;

    if (!selectedMethod) {
      toast.error("পেমেন্ট মেথড নির্বাচন করুন।");
      return;
    }

    if (!/^\d{11}$/.test(accountNumber)) {
      toast.error("একাউন্ট নাম্বার ১১ সংখ্যার হতে হবে।");
      return;
    }

    const newAccount = {
      paymentMethod: selectedMethod.label,
      paymentValue: selectedMethod.value,
      accountNumber,
      img: selectedMethod.img,
    };

    saveToDatabase(newAccount);
    setSelectedMethod(null);
    e.target.reset();
  };

console.log(resellerAccounts)

  return (
    <div>
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Left Section */}
      <div className="w-full flex flex-col gap-4">
        <form
          className="p-5 rounded-md bg-white shadow-md space-y-5"
          onSubmit={handleFormSubmit}
        >
          {/* Payment Method Dropdown */}
          <div className="relative">
            <label className="block text-sm font-medium text-[#30425a] mb-2">
              মোবাইল পেমেন্ট মেথড
            </label>
            <div
              className="border p-2 rounded-md cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {selectedMethod ? (
                <div className="flex items-center gap-3">
                  <img
                    src={selectedMethod.img}
                    alt={selectedMethod.label}
                    className="w-8 h-8 object-contain"
                  />
                  <span>{selectedMethod.label}</span>
                </div>
              ) : (
                <span className="text-gray-400">মেথড নির্বাচন করুন</span>
              )}
            </div>
            {dropdownOpen && (
              <ul className="absolute z-10 bg-white border rounded-md shadow-lg mt-2 w-full max-h-60 overflow-y-auto">
                {paymentMethods.map((method) => (
                  <li
                    key={method.value}
                    className="flex items-center gap-3 p-2 cursor-pointer hover:bg-[#DDE6ED]"
                    onClick={() => {
                      setSelectedMethod(method);
                      setDropdownOpen(false);
                    }}
                  >
                    <img
                      src={method.img}
                      alt={method.label}
                      className="w-8 h-8 object-contain"
                    />
                    <span>{method.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Account Number Input */}
          <div>
            <label className="block text-sm font-medium text-[#30425a] mb-2">
              একাউন্ট নাম্বার
            </label>
            <input
              type="text"
              name="accountNumber"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="আপনার একাউন্ট নাম্বার লিখুন"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition"
          >
            সেভ করুন
          </button>
        </form>
      </div>

      {/* Right Section */}
      <div className="w-full">
        <div className="p-5 bg-white rounded-md shadow-md">
          <h2 className="text-lg font-semibold text-[#30425a] mb-3">
            একাউন্ট লিস্ট
          </h2>
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-[#DDE6ED]">
                <th>#</th>
                <th>পেমেন্ট মেথড</th>
                <th>একাউন্ট নাম্বার</th>
              </tr>
            </thead>
            <tbody>
              {accounts.length > 0 ? (
                accounts.map((account, index) => {
                  const matchedPayment = paymentMethods.find(
                    (method) => method.label === account.accountName
                  );
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td className="flex justify-center items-center gap-2">
                        {matchedPayment?.img ? (
                          <img
                            src={matchedPayment.img}
                            alt={matchedPayment.label}
                            className="w-6 h-6"
                          />
                        ) : (
                          <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                            ❌
                          </div>
                        )}
                        {account.accountName}
                      </td>
                      <td className="text-center">{account.accountNumber}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="3">কোনও তথ্য পাওয়া যায়নি।</td>
                </tr>
              )}
             </tbody>

          </table>
        </div>

    
      </div>  
      
    </div>
    {message && !loading && (
  <div
    className={`mt-4 text-center ${
      message.includes("success") ? "text-green-500" : "text-red-500"
    }`}
  >
    <p className="shadow-md p-4 text-xl bg-white rounded-lg mb-2">
      {message} 
      <span className="text-red-500 font-semibold mx-3">{resellerAccounts?.email}</span> 
      পাঠানো হয়েছে।
    </p>
  </div>
)}

        <div className={`p-6 w-full mx-auto bg-white rounded-lg shadow-md ${message ? 'hidden' : 'block'}`}>
      <h3 className="text-xl font-semibold text-center mb-4">টাকা উত্তোলন সিক্রেট কোড তৈরি করুন</h3>
      <p className="text-gray-600 text-sm mb-6 flex flex-col justify-start items-start">
  <span>আপনার জন্য একটি নতুন সিক্রেট কোড তৈরি করা হবে।</span>
  <span>
    এই কোডটি আপনার ইমেইলে{" "}
    <span className="text-[#F4511E] font-semibold">{resellerAccounts?.email}</span>
    {" "}পাঠানো হবে।
  </span>
  <span className="mt-4 text-[#F4511E] ">
    অনুগ্রহ করে নিচে "Generate Secret" বাটনে ক্লিক করুন।
  </span>
</p>

      
      {/* Form */}
      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          {loading ? "Generating..." : "Generate Secret"}
        </button>
      </form>

      {/* Loading state */}
      {loading && (
        <div className="mt-4 text-center">
          <span className="text-gray-500">অপেক্ষা করুন, সিক্রেট কোড তৈরি করা হচ্ছে...</span>
        </div>
      )}

      {/* Success or error message */}
     
    </div>
    </div>
  );
}
