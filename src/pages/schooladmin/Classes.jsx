import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getClasses, createClass, deleteClass } from "../../api/classApi";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [name, setName] = useState("");
  const [section, setSection] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setClasses(await getClasses());
  };

  const handleCreate = async () => {
    await createClass({ name, section });
    setName("");
    setSection("");
    load();
  };

  return (
    <Layout role="schooladmin">
      <h1 className="text-2xl font-bold mb-4">Classes</h1>

      <div className="bg-white p-4 rounded-xl shadow mb-6 flex gap-3">
        <input
          placeholder="Class Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          placeholder="Section"
          value={section}
          onChange={(e) => setSection(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <button
          onClick={handleCreate}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <div className="bg-white rounded-xl shadow">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Class</th>
              <th>Section</th>
              <th>Subjects</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((c) => (
              <tr key={c.id} className="border-b">
                <td className="p-3">{c.name}</td>
                <td>{c.section}</td>
                <td>{c.subjects.length}</td>
                <td>
                  <button
                    onClick={() => deleteClass(c.id).then(load)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Classes;
