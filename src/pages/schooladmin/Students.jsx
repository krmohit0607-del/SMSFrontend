import { useEffect, useState } from "react";
import Layout from "../../components/Layout";

const Students = () => {
  const [students, setStudents] = useState([]);
const [classSortOrder, setClassSortOrder] = useState("asc"); // asc | desc
  const load = async () => {
    const res = await fetch("https://sikshakendra-api.azurewebsites.net/api/schooladmin/students", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setStudents(await res.json());
  };
const toggleClassSort = () => {
  setClassSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
};
const sortedStudents = [...students].sort((a, b) => {
  const classA = `${a.class.name} ${a.class.section}`;
  const classB = `${b.class.name} ${b.class.section}`;

  if (classA < classB) return classSortOrder === "asc" ? -1 : 1;
  if (classA > classB) return classSortOrder === "asc" ? 1 : -1;
  return 0;
});

  useEffect(() => {
    load();
  }, []);

  return (
    <Layout role="schooladmin">
      <h1 className="text-2xl font-bold mb-4">Students</h1>

      <table className="w-full bg-white shadow rounded-xl">
        <thead className="bg-gray-100">
           <tr>
    <th className="p-3 text-left">Name</th>
    <th className="p-3 text-left">Roll</th>
    <th className="p-3 text-left cursor-pointer select-none" onClick={toggleClassSort}>Class {classSortOrder === "asc" ? "▲" : "▼"}</th>
    <th className="p-3 text-left">Action</th>
  </tr>
        </thead>
        <tbody>
          {sortedStudents.map(s => (
            <tr key={s.id} className="border-b">
              <td className="p-3">{s.fullName}</td>
              <td  className="p-3">{s.rollNumber}</td>
              <td  className="p-3">{s.class.name} {s.class.section}</td>
              <td  className="p-3">
                <button
                  onClick={() =>
                    fetch(`https://sikshakendra-api.azurewebsites.net/api/schooladmin/students/${s.id}`, {
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
