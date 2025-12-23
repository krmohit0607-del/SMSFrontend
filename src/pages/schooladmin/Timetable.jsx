// import Layout from "../../components/Layout";


// const Timetable = () => {
// const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
// const periods = ["9-10", "10-11", "11-12", "12-1", "2-3", "3-4"];


// return (
// <Layout role="schooladmin">
// <div className="flex justify-between items-center mb-6">
// <h1 className="text-2xl font-bold">Timetable Management</h1>
// <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
// Upload Timetable
// </button>
// </div>


// {/* FILTERS */}
// <div className="flex gap-3 mb-4">
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
// </div>
// {/* TIMETABLE GRID */}
// <div className="bg-white rounded-xl shadow overflow-x-auto">
// <table className="w-full text-sm border-collapse">
// <thead className="bg-gray-100">
// <tr>
// <th className="p-3">Day / Time</th>
// {periods.map((p) => (
// <th key={p} className="p-3">{p}</th>
// ))}
// </tr>
// </thead>
// <tbody>
// {days.map((day) => (
// <tr key={day} className="border-t">
// <td className="p-3 font-medium">{day}</td>
// {periods.map((p) => (
// <td key={p} className="p-3 text-center">—</td>
// ))}
// </tr>
// ))}
// </tbody>
// </table>
// </div>
// </Layout>
// );
// };


// export default Timetable;

import { useEffect, useState } from "react";
import Layout from "../../components/Layout";

const Timetable = () => {
  const [slots, setSlots] = useState([]);

  const load = async () => {
    const res = await fetch(
      "https://localhost:7155/api/schooladmin/timetable/1",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setSlots(await res.json());
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Layout role="schooladmin">
      <h1 className="text-2xl font-bold mb-4">Timetable</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {slots.map(s => (
          <div key={s.id} className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold">{s.subject.name}</h3>
            <p>{s.day}</p>
            <p>{s.startTime} - {s.endTime}</p>
            <p className="text-sm text-gray-500">
              {s.subject.teacher.fullName}
            </p>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Timetable;
