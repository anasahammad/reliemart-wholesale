import React, { useState } from "react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import axios from "axios";

const Checkout = ({ setShowActive, onFormSubmit}) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const customer = useSelector((state) => state?.customer?.customerInfo?.user);
  const [address1, setAddress1] = useState(customer?.address || "");
  const [number, setNumber] = useState(customer?.phone || "+88");
  const [name, setName] = useState(customer?.name || "");
  const [email, setEmail] = useState(customer?.email || "");
  const [error, setError] = useState("");
  const [divisions, setDivisions] = useState([])
  const [districts, setDistricts] = useState([])
  const [upazilas, setUpazilas] = useState([])
  
  const [order, setOrder] = useState({
    customerAddress: {
      division: "",
      district: "",
      upazila: "",
      address: ''
    },
     name,
     email,
     number,
     customerId: customer?._id ||  null,
  });
  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const response = await axios.get("https://bdapis.com/api/v1.2/divisions")
        setDivisions(response.data.data)
      } catch (error) {
        console.error("Error fetching divisions:", error)
      }
    }
    fetchDivisions()
  }, [])

  useEffect(() => {
    const fetchDistricts = async () => {
      if (order.customerAddress.division) {
        try {
          const response = await axios.get(`https://bdapis.com/api/v1.1/division/${order.customerAddress.division}`)
          console.log("Districts:", response.data.data)
          setDistricts(response.data.data)
        } catch (error) {
          console.error("Error fetching districts:", error)
        }
      }
    }
    fetchDistricts()
  }, [order.customerAddress.division])

  useEffect(() => {
    const fetchUpazilas = async () => {
      if (order.customerAddress.district) {
        try {
          const response = await axios.get(`https://bdapis.com/api/v1.2/district/${order.customerAddress.district.toLowerCase()}`)
          console.log("Upazilas for:", response.data.data)
          setUpazilas(response.data.data)
        } catch (error) {
          console.error("Error fetching upazilas:", error)
        }
      }
    }
    fetchUpazilas()
  }, [order.customerAddress.district])
  const paymentSubmit = () => {
    // if (!address1 || !name || !number) {
    //   toast.error("Please fill all required fields!");
    //   return;
    // }

     // If phone number doesn't start with +88 or is not 11 digits, show error
     if (!number.startsWith("+88") || number.length !== 14) {
      toast.error("ফোন নম্বরটি '+88' দিয়ে শুরু হতে হবে এবং ১১ ডিজিট হতে হবে");
      return;
    }

    

    

     
    const formData = {
      order
    };

    onFormSubmit(formData); // Parent এ Data পাঠানো হচ্ছে
    setShowActive(2); // পরবর্তী ধাপে যাওয়ার জন্য
  };

  console.log('customer from checkout page ',customer?._id);

  const handleNumberChange = (e) => {
    const value = e.target.value;
    
    // Allow the value to start with +88, but make sure the total length is 13 digits
    if (value.startsWith("+88") && value.length <= 14) {
      setNumber(value);
      setError("");  // Reset error when input is valid
    } else if (value.startsWith("+88") === false) {
      setError("ফোন নম্বরটি '+88' দিয়ে শুরু হতে হবে");
    } else if (value.length > 14) {
      setError("ফোন নম্বরটি ১১ ডিজিট হতে হবে");
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target
    setOrder((prevOrder) => ({
      ...prevOrder,
      customerAddress: {
        ...prevOrder.customerAddress,
        [name]: value,
      },
    }))
  }

  const allUpazellas = upazilas.map((upazila) => upazila.upazillas).flat();
  return (
        <div className="w-full 800px:w-[65%] ">
           <motion.div
            initial={{ opacity: 0, x: -500 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -500 }}
            transition={{ duration: 0.6 }}
            className="w-full 800px:w-[95%] bg-white rounded-md lg:p-5 p-0 pb-8">
            <h5 className="text-[18px] font-[500]">Shipping Address</h5>
            <br />
            <form>
              <div className="w-full flex pb-3">
                <div className="w-[50%]">
                  <label className="pb-1 flex justify-start items-center gap-1 text-sm font-semibold">Full Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="border border-orange-500 rounded-sm !w-[95%] px-1 py-[2px]"
                  />
                </div>
                <div className="w-[50%]">
                  <label className="pb-1 flex justify-start items-center gap-1 text-sm font-semibold">Email Address</label>
                  <input
                    type="email"
                     placeholder="Optional"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-orange-500 rounded-sm !w-[95%] px-1 py-[2px]"
                  />
                </div>
              </div>
              {/* <div className="w-full flex pb-3">
                <div className="lg:w-[50%] w-full">
                  <label className="pb-1 flex justify-start items-center gap-1 text-sm font-semibold">Phone Number <span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    required
                    className="border border-orange-500 rounded-sm !w-[95%] px-1 py-[2px]"
                  />
                </div>
              </div> */}


<div className="w-full flex pb-3">
  <div className="lg:w-[50%] w-full">
    <label className="pb-1 flex justify-start items-center gap-1 text-sm font-semibold">
      Phone Number <span className="text-red-500">*</span>
    </label>
    <input
      type="text" // Change to text to prevent default number input behavior
      value={number}
    onChange={handleNumberChange}
      required
      className="border border-orange-500 rounded-sm !w-[95%] px-1 py-[2px]"
    />
    {error && <p className="text-red-500 text-xs">{error}</p>}
  </div>
</div>

              {/* <div className="w-full flex pb-3">
                <div className="w-full">
                  <label className="pb-1 flex justify-start items-center gap-1 text-sm font-semibold">Address <span className="text-red-500">*</span></label>
                  <textarea
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                    required
                   
                    className="border border-orange-500 rounded-sm !w-[95%] px-1 py-[2px]"
                  />
                </div>
              </div> */}

<div>
              <label htmlFor="division" className="block text-sm font-medium text-gray-700 mb-1">
                বিভাগ
              </label>
              <select
                id="division"
                name="division"
                value={order.customerAddress.division}
                onChange={handleAddressChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">বিভাগ নির্বাচন করুন</option>
                {divisions.map((division) => (
                  <option key={division.id} value={division.division}>
                    {division.division}
                  </option>
                ))}
              </select>
            </div>
            {order.customerAddress.division && (
              <div>
                <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
                  জেলা
                </label>
                <select
                  id="district"
                  name="district"
                  value={order.customerAddress.district}
                  onChange={handleAddressChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">জেলা নির্বাচন করুন</option>
                  {districts.map((district) => (
                    <option key={district} value={district.district}>
                      {district.district}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {order.customerAddress.district && (
              <div>
                <label htmlFor="upazila" className="block text-sm font-medium text-gray-700 mb-1">
                  উপজেলা
                </label>
                <select
                  id="upazila"
                  name="upazila"
                  value={order.customerAddress.upazila}
                  onChange={handleAddressChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">উপজেলা নির্বাচন করুন</option>

                  {allUpazellas.map((upazila, index) => (
                    <option key={index} value={upazila}>
                      {upazila}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                ঠিকানা
              </label>
              <textarea
                id="address"
                name="address"
                value={order.customerAddress.address}
                onChange={handleAddressChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="বিস্তারিত ঠিকানা দিন"
                rows="3"
                required
              ></textarea>
            </div>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.6 }}
            className="bg-orange-500 text-white px-4 py-2 rounded-md cursor-pointer w-[150px] 800px:w-[280px] -lg:mt-3 -mt-5"
            onClick={paymentSubmit}>
            <h5>Go to Payment</h5>
          </motion.div>
        </div>
  );
};

export default Checkout;
