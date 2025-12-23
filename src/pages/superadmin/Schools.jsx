import { useState } from "react";
import Layout from "../../components/Layout";


const Schools = () => {
const [showModal, setShowModal] = useState(false);


const schools = [
{ id: 1, name: "ABC Public School", city: "Delhi", status: "Active" },
{ id: 2, name: "Green Valley School", city: "Mumbai", status: "Inactive" },
{ id: 3, name: "Sunrise Convent", city: "Pune", status: "Active" },
];


return (
<Layout role="superadmin">
<div className="flex justify-between items-center mb-6">
<h1 className="text-2xl font-bold">Schools Management</h1>
<button
onClick={() => setShowModal(true)}
className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
>
+ Add School
</button>
</div>


{/* SEARCH */}
<input
type="text"
placeholder="Search school..."
className="mb-4 px-4 py-2 border rounded-lg w-full md:w-1/3"
/>


{/* TABLE */}
<div className="bg-white rounded-xl shadow overflow-x-auto">
<table className="w-full text-sm">
<thead className="bg-gray-100 text-left">
<tr>
<th className="p-3">School Name</th>
<th>City</th>
<th>Status</th>
<th>Actions</th>
</tr>
</thead>
<tbody>
{schools.map((s) => (
<tr key={s.id} className="border-b last:border-none">
<td className="p-3">{s.name}</td>
<td>{s.city}</td>
<td>
<span
className={`px-3 py-1 rounded-full text-xs ${
s.status === "Active"
? "bg-green-100 text-green-700"
: "bg-red-100 text-red-700"
}`}
>
{s.status}
</span>
</td>
<td className="space-x-3">
<button className="text-indigo-600">Edit</button>
<button className="text-red-600">Delete</button>
</td>
</tr>
))}
</tbody>
</table>
</div>


{/* ADD SCHOOL MODAL */}
{showModal && (
<div className="fixed inset-0 bg-black/40 flex items-center justify-center">
<div className="bg-white p-6 rounded-xl w-full max-w-md">
<h2 className="text-xl font-semibold mb-4">Add School</h2>


<input
placeholder="School Name"
className="w-full mb-3 px-4 py-2 border rounded"
/>
<input
placeholder="City"
className="w-full mb-3 px-4 py-2 border rounded"
/>
<input
placeholder="Admin Email"
className="w-full mb-3 px-4 py-2 border rounded"
/>


<div className="flex justify-end gap-3">
<button
onClick={() => setShowModal(false)}
className="px-4 py-2 border rounded"
>
Cancel
</button>
<button className="bg-indigo-600 text-white px-4 py-2 rounded">
Save
</button>
</div>
</div>
</div>
)}
</Layout>
);
};


export default Schools;