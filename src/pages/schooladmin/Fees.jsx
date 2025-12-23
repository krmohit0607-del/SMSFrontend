import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import FeesDashboard from "./FeesDashboard";
import { getFees, payFee } from "../../api/feesApi";

const Fees = () => {
  const [fees, setFees] = useState([]);

  useEffect(() => {
    fetchFees();
  }, []);

  const fetchFees = async () => {
    const data = await getFees();
    setFees(data);
  };

  const handlePay = async (id) => {
    await payFee(id);
    fetchFees();
  };

  return (
    <Layout role="schooladmin">
      <h1 className="text-2xl font-bold mb-4">Fees Management</h1>

      <FeesDashboard />

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Student ID</th>
              <th>Amount</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {fees.map(fee => (
              <tr key={fee.id} className="border-b">
                <td className="p-3">{fee.studentId}</td>
                <td>₹ {fee.amount}</td>
                <td>{new Date(fee.dueDate).toLocaleDateString()}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      fee.isPaid
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {fee.isPaid ? "Paid" : "Pending"}
                  </span>
                </td>
                <td>
                  {!fee.isPaid && (
                    <button
                      onClick={() => handlePay(fee.id)}
                      className="text-indigo-600 font-semibold"
                    >
                      Mark Paid
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Fees;
