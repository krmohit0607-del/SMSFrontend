import Layout from "../../components/Layout";


const Assignments = () => (
<Layout role="teacher">
<h1 className="text-2xl font-bold mb-6">Assignments</h1>


<div className="bg-white rounded-xl shadow p-6 mb-4">
<input placeholder="Title" className="border px-4 py-2 rounded w-full mb-3" />
<input type="file" className="mb-3" />
<button className="bg-indigo-600 text-white px-4 py-2 rounded">Upload Assignment</button>
</div>
</Layout>
);


export default Assignments;