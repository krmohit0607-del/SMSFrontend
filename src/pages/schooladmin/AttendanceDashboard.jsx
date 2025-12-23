import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { getAttendanceSummary } from "../../api/attendanceApi";

const COLORS = ["#22c55e", "#ef4444"];

const AttendanceDashboard = () => {
  const [data, setData] = useState({ present: 0, absent: 0 });

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getAttendanceSummary();
    setData(res);
  };

  const chartData = [
    { name: "Present", value: data.present },
    { name: "Absent", value: data.absent },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <div className="bg-green-100 p-6 rounded-xl shadow">
        <h3 className="text-gray-600">Present Today</h3>
        <p className="text-3xl font-bold text-green-700">{data.present}</p>
      </div>

      <div className="bg-red-100 p-6 rounded-xl shadow">
        <h3 className="text-gray-600">Absent Today</h3>
        <p className="text-3xl font-bold text-red-700">{data.absent}</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="font-semibold mb-2 text-center">
          Today's Attendance
        </h3>
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

export default AttendanceDashboard;
