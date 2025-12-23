import Layout from "../../components/Layout";
import { Bar, Line } from "react-chartjs-2";
import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
LineElement,
PointElement,
Tooltip,
Legend,
} from "chart.js";


ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
LineElement,
PointElement,
Tooltip,
Legend
);


const Dashboard = () => {
const schoolData = {
labels: ["Jan", "Feb", "Mar", "Apr", "May"],
datasets: [
{
label: "New Schools",
data: [5, 8, 6, 10, 12],
},
],
};


const revenueData = {
labels: ["Jan", "Feb", "Mar", "Apr", "May"],
datasets: [
{
label: "Revenue (₹)",
data : [20000, 35000, 30000, 50000, 60000],
},
],
};


const schools = [
{ id: 1, name: "ABC Public School", status: "Active" },
{ id: 2, name: "Green Valley School", status: "Active" },
{ id: 3, name: "Sunrise Convent", status: "Inactive" },
];

return (
<Layout role="superadmin">
<h1 className="text-2xl font-bold mb-6">Super Admin Dashboard</h1>


{/* KPI CARDS */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
<div className="bg-white p-5 rounded-xl shadow">
<p className="text-gray-500 text-sm">Total Schools</p>
<h2 className="text-3xl font-bold">120</h2>
</div>
<div className="bg-white p-5 rounded-xl shadow">
<p className="text-gray-500 text-sm">Active Schools</p>
<h2 className="text-3xl font-bold text-green-600">98</h2>
</div>
<div className="bg-white p-5 rounded-xl shadow">
<p className="text-gray-500 text-sm">Inactive Schools</p>
<h2 className="text-3xl font-bold text-red-500">22</h2>
</div>
<div className="bg-white p-5 rounded-xl shadow">
<p className="text-gray-500 text-sm">Monthly Revenue</p>
<h2 className="text-3xl font-bold">₹3.2L</h2>
</div>
</div>


{/* CHARTS */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
<div className="bg-white p-6 rounded-xl shadow">
<h3 className="font-semibold mb-4">Schools Growth</h3>
<Bar data={schoolData} />
</div>
<div className="bg-white p-6 rounded-xl shadow">
<h3 className="font-semibold mb-4">Revenue Trend</h3>
<Line data={revenueData} />
</div>
</div>


{/* RECENT SCHOOLS TABLE */}
<div className="bg-white p-6 rounded-xl shadow">
<h3 className="font-semibold mb-4">Recent Schools</h3>
<table className="w-full text-sm">
<thead className="text-left text-gray-500 border-b">
<tr>
<th className="py-2">School Name</th>
<th>Status</th>
<th>Action</th>
</tr>
</thead>
<tbody>
{schools.map((s) => (
<tr key={s.id} className="border-b last:border-none">
<td className="py-2">{s.name}</td>
<td>
<span
className={`px-2 py-1 rounded text-xs ${
s.status === "Active"
? "bg-green-100 text-green-700"
: "bg-red-100 text-red-700"
}`}
>
{s.status}
</span>
</td>
<td className="text-indigo-600 cursor-pointer">View</td>
</tr>
))}
</tbody>
</table>
</div>
</Layout>
);
};


export default Dashboard;