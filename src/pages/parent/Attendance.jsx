import Layout from "../../components/Layout";


const Attendance = () => (
<Layout role="parent">
<h1 className="text-2xl font-bold mb-6">Attendance Report</h1>
<div className="bg-white p-6 rounded-xl shadow">
<p>Monthly Attendance: <strong>92%</strong></p>
<p>Absent Days: <strong>3</strong></p>
</div>
</Layout>
);


export default Attendance;