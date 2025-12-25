import { useEffect, useState } from "react";
import Layout from "../../components/Layout";

const Students = () => {
  const [students, setStudents] = useState([]);

  const load = async () => {
    const res = await fetch("https://sikshakendra-api.azurewebsites.net/api/schooladmin/students", {
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
    <th className="p-3 text-left">Name</th>
    <th className="p-3 text-left">Roll</th>
    <th className="p-3 text-left">Class</th>
    <th className="p-3 text-left">Action</th>
  </tr>
        </thead>
        <tbody>
          {students.map(s => (
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
