import Layout from "../../components/Layout";


const Marks = () => {
const students = ["Aarav", "Ananya", "Rohan"];


return (
<Layout role="teacher">
<h1 className="text-2xl font-bold mb-6">Upload Marks</h1>


<div className="bg-white rounded-xl shadow p-6">
{students.map((s) => (
<div key={s} className="flex justify-between mb-3">
<span>{s}</span>
<input className="border px-3 py-1 rounded w-24" placeholder="Marks" />
</div>
))}
<button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded">Save Marks</button>
</div>
</Layout>
);
};


export default Marks;