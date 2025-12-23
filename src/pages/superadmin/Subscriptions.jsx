import { useState } from "react";
import Layout from "../../components/Layout";


const Subscriptions = () => {
const [showModal, setShowModal] = useState(false);


const subscriptions = [
{
id: 1,
school: "ABC Public School",
plan: "Premium",
price: "₹12,000",
expiry: "31 Dec 2025",
status: "Active",
},
{
id: 2,
school: "Green Valley School",
plan: "Basic",
price: "₹6,000",
expiry: "30 Jun 2025",
status: "Expired",
},
];


return (
<Layout role="superadmin">
<div className="flex justify-between items-center mb-6">
<h1 className="text-2xl font-bold">Subscription Management</h1>
<button
onClick={() => setShowModal(true)}
className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
>
+ Assign Subscription
</button>
</div>


{/* TABLE */}
<div className="bg-white rounded-xl shadow overflow-x-auto">
<table className="w-full text-sm">
<thead className="bg-gray-100 text-left">
<tr>
<th className="p-3">School</th>
<th>Plan</th>
<th>Price</th>
<th>Expiry</th>
<th>Status</th>
<th>Action</th>
</tr>
</thead>
<tbody>
{subscriptions.map((s) => (
<tr key={s.id} className="border-b last:border-none">
<td className="p-3">{s.school}</td>
<td>{s.plan}</td>
<td>{s.price}</td>
<td>{s.expiry}</td>
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
<td className="text-indigo-600 cursor-pointer">Renew</td>
</tr>
))}
</tbody>
</table>
</div>


{/* ASSIGN SUBSCRIPTION MODAL */}
{showModal && (
<div className="fixed inset-0 bg-black/40 flex items-center justify-center">
<div className="bg-white p-6 rounded-xl w-full max-w-md">
<h2 className="text-xl font-semibold mb-4">Assign Subscription</h2>


<select className="w-full mb-3 px-4 py-2 border rounded">
<option>Select School</option>
<option>ABC Public School</option>
<option>Green Valley School</option>
</select>


<select className="w-full mb-3 px-4 py-2 border rounded">
<option>Select Plan</option>
<option>Basic</option>
<option>Standard</option>
<option>Premium</option>
</select>


<input
type="date"
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
Assign
</button>
</div>
</div>
</div>
)}
</Layout>
);
};


export default Subscriptions;