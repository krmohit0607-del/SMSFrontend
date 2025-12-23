import Layout from "../../components/Layout";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";


ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);


const Performance = () => {
const marksData = {
labels: ["Maths", "Science", "English", "History"],
datasets: [{ label: "Marks", data: [85, 78, 88, 90] }],
};


return (
<Layout role="parent">
<h1 className="text-2xl font-bold mb-6">Academic Performance</h1>
<div className="bg-white p-6 rounded-xl shadow max-w-xl">
<Bar data={marksData} />
</div>
</Layout>
);
};


export default Performance;