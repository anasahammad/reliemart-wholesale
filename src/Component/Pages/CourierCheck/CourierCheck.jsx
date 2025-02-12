import { useState } from "react";
import axios from "axios";
import { ImSpinner9 } from "react-icons/im";

const CourierCheck = () => {
  const [phone, setPhone] = useState(""); // Phone number state
  const [responseData, setResponseData] = useState(null); // API response state
  const [error, setError] = useState(null); // Error state
  const apiKey = "ktlY9kJCbKJukmakVNtvpgHpZ3Tm83vPBtmAKfHWCDyhn9wlas7G0OUIUXWS"; // Your API key
  const [isLoading, setIsLoading] = useState(false);

  const handleCheck = async () => {
    if (!phone.trim()) {
      setError("Please enter a valid phone number.");
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.post(
        `https://bdcourier.com/api/courier-check?phone=${phone}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      setResponseData(response.data); // Set the API response data
      console.log(response.data);
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error(err.message);
      setError("Something went wrong. Please try again."); // Set error message
      setResponseData(null); // Clear previous data on error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div data-aos="fade-down" className="flex  justify-center  bg-gray-100">
      <div className="w-full lg:w-[60%] mx-auto  p-6 bg-white shadow-lg rounded-lg">
        <h1 className="lg:text-lg text-base  font-bold text-[#27374D] text-center mb-6">
        এখানে আপনি খুব সহজেই গ্রাহকের ফোন নম্বর দিয়ে প্রতারক গ্রাহক চেক করতে পারবেন। আমাদের সিস্টেম আপনাকে দ্রুত এবং নির্ভুল তথ্য প্রদান করবে, যাতে আপনি নিশ্চিন্তে আপনার ব্যবসায়িক সিদ্ধান্ত নিতে পারেন।
        </h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="কাস্টমার  মোবাইল নাম্বার দিন "
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 border   rounded-md focus:outline-none focus:ring-2 focus:ring-[#27374D] focus:border-transparent"
          />
        </div>
        <button
          onClick={handleCheck}
          className="w-full flex justify-center items-center gap-3 bg-[#F4511E] text-white py-2 px-4 rounded-md    transition"
        >
          {isLoading && <ImSpinner9 className="animate-spin" />}
          চেক কাস্টমার 
        </button>

        <div className="mt-6">
          {responseData?.courierData && (
            <div className="bg-white border border-gray-300 p-4 rounded-md">
              <h3 className="font-semibold text-lg text-[#27374D] mb-4">
                Courier Data
              </h3>
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2">
                      Courier Name
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Total Parcels
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Successful Parcels
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Cancelled Parcels
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Success Ratio (%)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(responseData.courierData).map(
                    ([courier, details]) =>
                      courier !== "summary" ? (
                        <tr key={courier} className="hover:bg-[#DDE6ED]">
                          <td className="border border-gray-300 px-4 py-2 capitalize">
                            {courier}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {details.total_parcel}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {details.success_parcel}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {details.cancelled_parcel}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {details.success_ratio}%
                          </td>
                        </tr>
                      ) : null
                  )}
                </tbody>
              </table>
              <h4 className="font-medium text-[#27374D] mt-4">Summary</h4>
              <p className="text-[#30425a]">
                Total Parcels:{" "}
                <strong>{responseData.courierData.summary.total_parcel}</strong>
                , Successful:{" "}
                <strong>
                  {responseData.courierData.summary.success_parcel}
                </strong>
                ,
                <span className="text-red-600">
                  {" "}
                  Cancelled:{" "}
                  <strong>
                    {responseData.courierData.summary.cancelled_parcel}
                  </strong>
                </span>
                ,{" "}
                <span className="text-green-600">
                  Success Ratio:{" "}
                  <strong>
                    {responseData.courierData.summary.success_ratio}%
                  </strong>
                </span>
              </p>
            </div>
          )}

          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default CourierCheck;
