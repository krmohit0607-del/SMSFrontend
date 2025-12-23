import Layout from "../../components/Layout";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";


ChartJS.register(ArcElement, Tooltip, Legend);


const Dashboard = () => {
const attendanceData = {
labels: ["Present", "Absent"],
datasets: [{ data: [92, 8] }],
};


return (
<Layout role="parent">
<h1 className="text-2xl font-bold mb-6">Parent Dashboard</h1>


<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
<div className="bg-white p-5 rounded-xl shadow">
<p className="text-gray-500">Student Name</p>
<h2 className="text-xl font-bold">Aarav Singh</h2>
</div>
<div className="bg-white p-5 rounded-xl shadow">
<p className="text-gray-500">Class</p>
<h2 className="text-xl font-bold">5 - A</h2>
</div>
<div className="bg-white p-5 rounded-xl shadow">
<p className="text-gray-500">Overall Attendance</p>
<h2 className="text-xl font-bold">92%</h2>
</div>
</div>
<div className="bg-white p-6 rounded-xl shadow mb-6 max-w-sm">
<h3 className="font-semibold mb-4">Attendance Overview</h3>
<Doughnut data={attendanceData} />
</div>


<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
<button className="bg-indigo-600 text-white py-3 rounded-lg">Attendance</button>
<button className="bg-indigo-600 text-white py-3 rounded-lg">Performance</button>
<button className="bg-indigo-600 text-white py-3 rounded-lg">Assignments</button>
<button className="bg-indigo-600 text-white py-3 rounded-lg">Fees</button>
</div>
</Layout>
);
};


export default Dashboard;