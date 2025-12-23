import Layout from "../../components/Layout";


const Attendance = () => {
const students = ["Aarav", "Ananya", "Rohan", "Neha"];


return (
<Layout role="teacher">
<h1 className="text-2xl font-bold mb-6">Take Attendance</h1>


<div className="bg-white rounded-xl shadow p-6">
<table className="w-full">
<thead>
<tr className="border-b">
<th className="text-left p-2">Student</th>
<th>Present</th>
<th>Absent</th>
</tr>
</thead>
<tbody>
{students.map((s) => (
<tr key={s} className="border-b last:border-none">
<td className="p-2">{s}</td>
<td className="text-center"><input type="radio" name={s} /></td>
<td className="text-center"><input type="radio" name={s} /></td>
</tr>
))}
</tbody>
</table>
<button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded">Save Attendance</button>
</div>
</Layout>
);
};


export default Attendance;