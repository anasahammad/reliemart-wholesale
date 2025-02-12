import { FaHourglass, FaCheckCircle, FaTimesCircle, FaInfoCircle } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';

export default function WithdrowReportTable({ data }) {
  // Calculate total amount
  const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="bg-[#DDE6ED] p-4">
      <div className="overflow-x-auto bg-white border border-gray-300 rounded-lg shadow-lg">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-4 font-semibold">ক্রমিক নম্বর</th>
              <th className="py-3 px-4 font-semibold">অনুরোধের তারিখ</th>
              <th className="py-3 px-4 font-semibold">অ্যাকাউন্ট নম্বর</th>
              <th className="py-3 px-4 font-semibold">অনুরোধের পরিমাণ</th>
              <th className="py-3 px-4 font-semibold">ব্যাংক</th>
              <th className="py-3 px-4 font-semibold">উত্তোলনের ধরণ</th>
              <th className="py-3 px-4 font-semibold">স্ট্যাটাস</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">
                  {new Date(item.requestedAt).toLocaleDateString("bn-BD", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
                <td className="py-3 px-4">{item.accountNumber}</td>
                <td className="py-3 px-4">{item.amount.toLocaleString('bn-BD')} ৳</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={
                        item.bankName === "bkash"
                          ? "https://freepnglogo.com/images/all_img/1701670291bKash-App-Logo-PNG.png"
                          : item.bankName === "nagad"
                          ? "https://freelogopng.com/images/all_img/1679248828Nagad-Logo-PNG.png"
                          : item.bankName === "rocket"
                          ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT12VgBUxXDd2i17DbU1_o5hp-u6YxBBdSKkQ&s"
                          : "https://upload.wikimedia.org/wikipedia/bn/a/a8/%E0%A6%89%E0%A6%AA%E0%A6%BE%E0%A6%AF%E0%A6%BC_%E0%A6%B2%E0%A7%8B%E0%A6%97%E0%A7%8B.png"
                      }
                      alt={item.bankName}
                      className="w-8 h-8 object-contain"
                    />
                    <span>{item.bankName}</span>
                  </div>
                </td>
                <td className="py-3 px-4">{item.withdrawType}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    {item.status === "pending" ? (
                      <FaHourglass className="text-yellow-500" />
                    ) : item.status === "approved" ? (
                      <FaCheckCircle className="text-green-600" />
                    ) : item.status === "rejected" ? (
                      <>
                        <FaTimesCircle className="text-red-600" />
                        {item.rejectionNote && (
                          <>
                            <FaInfoCircle 
                              className="text-blue-500 cursor-pointer" 
                              data-tooltip-id={`rejection-note-${item._id}`}
                              data-tooltip-content={item.rejectionNote}
                            />
                            <Tooltip id={`rejection-note-${item._id}`} />
                          </>
                        )}
                      </>
                    ) : null}
                    <span>{item.status}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-100 font-bold">
              <td colSpan="3" className="py-3 px-4 text-right">মোট</td>
              <td className="py-3 px-4">{totalAmount.toLocaleString('bn-BD')} ৳</td>
              <td colSpan="3"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}