import React, { useState, useEffect } from 'react';
import axios from 'axios'; // API call for fetching data
import { useSelector } from 'react-redux';
import { getUserByIdForReseller } from '../../../services/index/users';

const ResellerTeamRanking = () => {
  const [resellers, setResellers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [selectedReseller, setSelectedReseller] = useState(null);
  const [accounts, setAccounts] = useState();
  const userState = useSelector((state) => state.user);
  const userInfo = userState?.userInfo || JSON.parse(localStorage.getItem("resellerAccount"));
  const resellerId = userInfo?.user?._id;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserByIdForReseller(resellerId);
        setAccounts(userData.user);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUser();
  }, [resellerId]);

  const referralCode = accounts?.referralCode;

  useEffect(() => {
    const fetchResellers = async () => {
      try {
        const response = await axios.get(`https://reseller-backend-zeta.vercel.app/api/v4/reseller/resellers/referral/${referralCode}`);
        setResellers(response.data.referredResellers);
      } catch (error) {
        console.error('Error fetching resellers:', error);
      }
    };

    if (referralCode) {
      fetchResellers();
    }
  }, [referralCode]);

  const openModal = (reseller) => {
    setSelectedReseller(reseller);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedReseller(null);
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Reseller List</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-gray-700 font-medium">Name</th>
              <th className="px-6 py-3 text-left text-gray-700 font-medium">Email</th>
              <th className="px-6 py-3 text-left text-gray-700 font-medium">Phone</th>
              <th className="px-6 py-3 text-left text-gray-700 font-medium">Referred By</th>
              <th className="px-6 py-3 text-left text-gray-700 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {resellers.map((reseller) => (
              <tr key={reseller._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-600">{reseller.name}</td>
                <td className="px-6 py-4 text-gray-600">{reseller.email || 'N/A'}</td>
                <td className="px-6 py-4 text-gray-600">{reseller.phone}</td>
                <td className="px-6 py-4 text-gray-600">{reseller.referredBy || 'N/A'}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => openModal(reseller)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && selectedReseller && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">{selectedReseller.name} Details</h2>

            <p className="mb-2 text-gray-700"><strong>Phone:</strong> {selectedReseller.phone}</p>
            <p className="mb-2 text-gray-700"><strong>Email:</strong> {selectedReseller.email || 'Not Provided'}</p>
            <p className="mb-2 text-gray-700"><strong>Referred By:</strong> {selectedReseller.referredBy || 'Not Provided'}</p>
            <p className="mb-2 text-gray-700"><strong>Address:</strong> {selectedReseller.address || 'Not Provided'}</p>
            <p className="mb-2 text-gray-700"><strong>Role:</strong> {selectedReseller.role}</p>
            <p className="mb-2 text-gray-700"><strong>Platform Usage:</strong> {selectedReseller.platformUsage}</p>
            <p className="mb-2 text-gray-700"><strong>Team Leader:</strong> {selectedReseller.teamLeader ? 'Yes' : 'No'}</p>
            <p className="mb-2 text-gray-700"><strong>Total Sales:</strong> {selectedReseller.totalSalesAmount} BDT</p>
            <p className="mb-2 text-gray-700"><strong>Total Orders:</strong> {selectedReseller.totalOrders}</p>
            <p className="mb-2 text-gray-700"><strong>Ratings:</strong> {selectedReseller.ratings} / 5</p>
            <p className="mb-4 text-gray-700"><strong>Withdraw Amount:</strong> {selectedReseller.withdrawAmount} BDT</p>

            {selectedReseller.bankAccount && selectedReseller.bankAccount.length > 0 ? (
              <div className="mb-4">
                <strong className="text-gray-800">Bank Account:</strong>
                <ul className="list-disc list-inside text-gray-700 mt-2">
                  {selectedReseller.bankAccount.map((account, index) => (
                    <li key={index} className="mb-2">
                      <p><strong>Account Name:</strong> {account.accountName}</p>
                      <p><strong>Account Number:</strong> {account.accountNumber}</p>
                      <p><strong>Bank Name:</strong> {account.bankName}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-gray-700">No Bank Account Information</p>
            )}

            <button
              onClick={closeModal}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResellerTeamRanking;
