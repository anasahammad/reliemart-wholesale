import React, { useEffect, useState } from "react";
import WithdrowReportTable from "./WithdrowReportTable";
import { useSelector } from "react-redux";

export default function WithdrowReport() {
  const [withdrawReports, setWithdrawReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [year, setYear] = useState(""); // State for year input
  const [month, setMonth] = useState(""); // State for month input
  const userState = useSelector((state) => state.user);
  const userInfo = userState?.userInfo || JSON.parse(localStorage.getItem("resellerAccount"));
  const resellerId = userInfo?.user?._id;

  useEffect(() => {
    const fetchWithdrawReports = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/reseller/withdraw-reports/${resellerId}`);
        const result = await response.json();
        console.log("Fetched reports:", result);

        if (response.ok) {
          setWithdrawReports(result.withdrawRequests);
          setFilteredReports(result.withdrawRequests); // Initially set filtered reports to all
        } else {
          console.error(result.error);
        }
      } catch (error) {
        console.error("Error fetching withdraw reports:", error);
      }
    };

    fetchWithdrawReports();
  }, [resellerId]);

  // Function to filter reports based on month and year
  const filterReports = (year, month) => {
    const filtered = withdrawReports.filter((report) => {
      const reportDate = new Date(report.requestedAt);
      const reportYear = reportDate.getFullYear();
      const reportMonth = reportDate.toLocaleString("default", { month: "long" });

      return (
        (year ? reportYear === parseInt(year) : true) &&
        (month ? reportMonth === month : true)
      );
    });
    setFilteredReports(filtered);
  };

  return (
    <div>
      {/* Year and Month selection */}
      <div className="flex justify-center items-center mb-3 space-x-4">
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
        >
          <option value="">Select Year</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
          {/* Add more years as needed */}
        </select>

        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
        >
          <option value="">Select Month</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>

        <button
          onClick={() => filterReports(year, month)}
          className="bg-[#27374D] hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-md shadow-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
        তারিখ অনুযায়ী খুজে দেখুন
        </button>
      </div>

      {/* Pass the filteredReports data to the table */}
      <WithdrowReportTable data={filteredReports} />
    </div>
  );
}
