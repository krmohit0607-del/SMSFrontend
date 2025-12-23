// import { useState } from "react";
// import Layout from "../../components/Layout";


// const Students = () => {
// const [showModal, setShowModal] = useState(false);


// const students = [
// {
// id: 1,
// name: "Aarav Singh",
// class: "5",
// section: "A",
// roll: 12,
// status: "Active",
// },
// {
// id: 2,
// name: "Ananya Verma",
// class: "6",
// section: "B",
// roll: 8,
// status: "Active",
// },
// ];


// return (
// <Layout role="schooladmin">
// <div className="flex justify-between items-center mb-6">
// <h1 className="text-2xl font-bold">Students Management</h1>
// <button
// onClick={() => setShowModal(true)}
// className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
// >
// + Add Student
// </button>
// </div>


// {/* FILTERS */}
// <div className="flex flex-wrap gap-3 mb-4">
// <select className="px-4 py-2 border rounded-lg">
// <option>Class</option>
// <option>1</option>
// <option>2</option>
// <option>3</option>
// </select>
// <select className="px-4 py-2 border rounded-lg">
// <option>Section</option>
// <option>A</option>
// <option>B</option>
// </select>
// <input
// type="text"
// placeholder="Search student..."
// className="px-4 py-2 border rounded-lg flex-1"
// />
// </div>

// {/* TABLE */}
// <div className="bg-white rounded-xl shadow overflow-x-auto">
// <table className="w-full text-sm">
// <thead className="bg-gray-100 text-left">
// <tr>
// <th className="p-3">Name</th>
// <th>Class</th>
// <th>Section</th>
// <th>Roll No</th>
// <th>Status</th>
// <th>Actions</th>
// </tr>
// </thead>
// <tbody>
// {students.map((s) => (
// <tr key={s.id} className="border-b last:border-none">
// <td className="p-3">{s.name}</td>
// <td>{s.class}</td>
// <td>{s.section}</td>
// <td>{s.roll}</td>
// <td>
// <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
// {s.status}
// </span>
// </td>
// <td className="space-x-3">
// <button className="text-indigo-600">Edit</button>
// <button className="text-red-600">Delete</button>
// </td>
// </tr>
// ))}
// </tbody>
// </table>
// </div>
// {/* ADD STUDENT MODAL */}
// {showModal && (
// <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
// <div className="bg-white p-6 rounded-xl w-full max-w-lg">
// <h2 className="text-xl font-semibold mb-4">Add Student</h2>


// <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
// <input placeholder="Full Name" className="border px-4 py-2 rounded" />
// <input placeholder="Roll Number" className="border px-4 py-2 rounded" />
// <select className="border px-4 py-2 rounded">
// <option>Class</option>
// <option>1</option>
// <option>2</option>
// </select>
// <select className="border px-4 py-2 rounded">
// <option>Section</option>
// <option>A</option>
// <option>B</option>
// </select>
// <input placeholder="Parent Email" className="border px-4 py-2 rounded md:col-span-2" />
// </div>


// <div className="flex justify-end gap-3 mt-4">
// <button onClick={() => setShowModal(false)} className="border px-4 py-2 rounded">
// Cancel
// </button>
// <button className="bg-indigo-600 text-white px-4 py-2 rounded">
// Save
// </button>
// </div>
// </div>
// </div>
// )}
// </Layout>
// );
// };


// export default Students;


import { useEffect, useState } from "react";
import Layout from "../../components/Layout";

const Students = () => {
  const [students, setStudents] = useState([]);

  const load = async () => {
    const res = await fetch("https://localhost:7155/api/schooladmin/students", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setStudents(await res.json());
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Layout role="schooladmin">
      <h1 className="text-2xl font-bold mb-4">Students</h1>

      <table className="w-full bg-white shadow rounded-xl">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Name</th>
            <th>Roll</th>
            <th>Class</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id} className="border-b">
              <td className="p-3">{s.fullName}</td>
              <td>{s.rollNumber}</td>
              <td>{s.class.name} {s.class.section}</td>
              <td>
                <button
                  onClick={() =>
                    fetch(`https://localhost:7155/api/schooladmin/students/${s.id}`, {
                      method: "DELETE",
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                      },
                    }).then(load)
                  }
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Students;
