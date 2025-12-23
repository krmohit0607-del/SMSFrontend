import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { getFees } from "../../api/feesApi";

const COLORS = ["#22c55e", "#ef4444"];

const FeesDashboard = () => {
  const [fees, setFees] = useState([]);

  useEffect(() => {
    fetchFees();
  }, []);

  const fetchFees = async () => {
    const data = await getFees();
    setFees(data);
  };

  const totalPaid = fees
    .filter(f => f.isPaid)
    .reduce((sum, f) => sum + f.amount, 0);

  const totalPending = fees
    .filter(f => !f.isPaid)
    .reduce((sum, f) => sum + f.amount, 0);

  const chartData = [
    { name: "Paid", value: totalPaid },
    { name: "Pending", value: totalPending },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Cards */}
      <div className="bg-green-100 p-6 rounded-xl shadow">
        <h3 className="text-gray-600">Fees Collected</h3>
        <p className="text-3xl font-bold text-green-700">₹ {totalPaid}</p>
      </div>

      <div className="bg-red-100 p-6 rounded-xl shadow">
        <h3 className="text-gray-600">Pending Fees</h3>
        <p className="text-3xl font-bold text-red-700">₹ {totalPending}</p>
      </div>

      {/* Chart */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="font-semibold mb-2 text-center">Fees Status</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={chartData} dataKey="value" innerRadius={50}>
              {chartData.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FeesDashboard;
