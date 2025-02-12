import { useState } from "react";
import { ImSpinner9 } from "react-icons/im";

const OrderTracking = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [trackingId, setTrackingId] = useState("");
  const [orderStatus, setOrderStatus] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleServiceSelection = (service) => {
    setSelectedService(service);
    setTrackingId(""); // Reset tracking ID when service is changed
    setOrderStatus(null); // Clear previous status
    setError(null); // Clear previous error
  };

  const fetchOrderStatus = async () => {
    if (!trackingId) {
      setError("Please enter a valid tracking ID.");
      return;
    }

    try {
      setIsLoading(true);
      setOrderStatus(null);
      setError(null);

      const apiUrl =
        selectedService === "Pathao"
          ? "https://courier-api-sandbox.pathao.com"
          : "https://steadfast.com/api/v1/orders/track";

      const credentials =
        selectedService === "Pathao"
          ? {
              clientId: "QBeXLnoeyK",
              clientSecret: "imn7G1HWztCbWFCZSI7NAn6pukXqEqcfhjn64Abo",
            }
          : {
              apiKey: "1xmrzg0kqp4s4b5n4qm4f3n5rxqzkxvw",
              secretKey: "ztyedvojgis4i3vbosxtcigx",
            };

      const body =
        selectedService === "Pathao"
          ? { tracking_id: trackingId }
          : { order_id: trackingId };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(selectedService === "Pathao"
            ? {
                Authorization: `Basic ${btoa(
                  `${credentials.clientId}:${credentials.clientSecret}`
                )}`,
              }
            : {
                "Api-Key": credentials.apiKey,
                "Secret-Key": credentials.secretKey,
              }),
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        throw new Error("Tracking information not found!");
      }

      const data = await response.json();
      setOrderStatus(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div data-aos="fade-down" className="w-full mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-xl text-gray-800 font-bold mb-4 text-center">
        অর্ডার ট্র্যাকিং
      </h1>

      {!selectedService ? (
        <div className="flex justify-center gap-4">
          <button
            onClick={() => handleServiceSelection("Pathao")}
            className="bg-[#F4511E] text-white px-4 py-2 rounded"
          >
            Pathao
          </button>
          <button
            onClick={() => handleServiceSelection("Steadfast")}
            className="bg-[#F4511E] text-white px-4 py-2 rounded"
          >
            Steadfast
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setSelectedService(null)}
              className="text-sm text-blue-500 underline"
            >
              Change Service
            </button>
            <p className="text-gray-700 font-medium">
              Selected Service: {selectedService}
            </p>
          </div>

          <input
            type="text"
            placeholder="আপনার অর্ডার ট্র্যাকিং আইডি দিন"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            className="w-full px-4 py-2 border rounded mb-4"
          />

          <button
            onClick={fetchOrderStatus}
            className="bg-[#F4511E] text-white px-4 flex justify-center items-center gap-3 py-2 rounded w-full"
          >
            {isLoading && <ImSpinner9 className="animate-spin" />}
            ট্রাক অর্ডার
          </button>

          {error && <p className="text-red-500 mt-4">{error}</p>}
          {orderStatus && (
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <h2 className="font-semibold text-lg">Order Status:</h2>
              <pre className="text-sm mt-2">
                {JSON.stringify(orderStatus, null, 2)}
              </pre>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OrderTracking;
