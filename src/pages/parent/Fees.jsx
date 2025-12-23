import Layout from "../../components/Layout";


const Fees = () => (
<Layout role="parent">
<h1 className="text-2xl font-bold mb-6">Fees Status</h1>
<div className="bg-white p-6 rounded-xl shadow">
<p>Total Fees: ₹30,000</p>
<p className="text-green-600">Paid: ₹30,000</p>
<p className="text-red-600">Pending: ₹0</p>
</div>
</Layout>
);


export default Fees;