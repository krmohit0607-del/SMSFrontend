import Layout from "../../components/Layout";
import { Bar } from "react-chartjs-2";
import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
Tooltip,
Legend,
} from "chart.js";


ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);


const Dashboard = () => {
const attendanceData = {
labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
datasets: [{ label: "Attendance %", data: [90, 92, 88, 91, 94] }],
};
return (
<Layout role="teacher">
<h1 className="text-2xl font-bold mb-6">Teacher Dashboard</h1>


<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
<div className="bg-white p-5 rounded-xl shadow">
<p className="text-gray-500">Classes</p>
<h2 className="text-3xl font-bold">5</h2>
</div>
<div className="bg-white p-5 rounded-xl shadow">
<p className="text-gray-500">Students</p>
<h2 className="text-3xl font-bold">180</h2>
</div>
<div className="bg-white p-5 rounded-xl shadow">
<p className="text-gray-500">Pending Tasks</p>
<h2 className="text-3xl font-bold">3</h2>
</div>
</div>


<div className="bg-white p-6 rounded-xl shadow mb-6">
<h3 className="font-semibold mb-4">Weekly Attendance</h3>
<Bar data={attendanceData} />
</div>


<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
<button className="bg-indigo-600 text-white py-3 rounded-lg">Take Attendance</button>
<button className="bg-indigo-600 text-white py-3 rounded-lg">Upload Assignment</button>
<button className="bg-indigo-600 text-white py-3 rounded-lg">Upload Marks</button>
<button className="bg-indigo-600 text-white py-3 rounded-lg">View Students</button>
</div>
</Layout>
);
};


export default Dashboard;