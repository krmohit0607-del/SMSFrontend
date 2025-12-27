import { useEffect, useState } from "react";
import Layout from "../../components/Layout";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const [fullName, setFullName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [classId, setClassId] = useState("");
  const [search, setSearch] = useState("");
  const [classSortOrder, setClassSortOrder] = useState("asc"); // asc | desc
  const [lastRoll, setLastRoll] = useState(null);
  const [dob, setDob] = useState("");
const [email, setEmail] = useState("");



  useEffect(() => {
    fetchStudents();
    fetchClasses();

    if (editingStudent) {
      setFullName(editingStudent.fullName);
      setRollNumber(editingStudent.rollNumber);
      setClassId(editingStudent.class.id);
      setDob(editingStudent.dob?.split("T")[0] || "");
  setEmail(editingStudent.email || "");
    } else {
      setFullName("");
      setRollNumber("");
      setClassId("");
      setDob("");
setEmail("");
    }
  }, [editingStudent]);

  /* ================= API CALLS ================= */

  const fetchStudents = async () => {
    const res = await fetch(
      "https://sikshakendra-api.azurewebsites.net/api/schooladmin/students",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setStudents(await res.json());
  };

  const fetchClasses = async () => {
    const res = await fetch(
      "https://sikshakendra-api.azurewebsites.net/api/schooladmin/classes",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    
    setClasses(await res.json());
  };

  const toggleClassSort = () => {
  setClassSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
};
  const handleSaveStudent = async () => {
    const url = editingStudent
      ? `https://sikshakendra-api.azurewebsites.net/api/schooladmin/students/${editingStudent.id}`
      : "https://sikshakendra-api.azurewebsites.net/api/schooladmin/students";

    const method = editingStudent ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
         fullName,
  rollNumber,
  classId,
  dob,
  email
      }),
    });

    if (!res.ok) {
      alert("Failed to save student");
      return;
    }

    setShowModal(false);
    setEditingStudent(null);
    fetchStudents();
  };

  const fetchLastRoll = async (classId) => {
  const res = await fetch(
    `https://sikshakendra-api.azurewebsites.net/api/schooladmin/student/last-roll/${classId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  const data = await res.json();
  console.log(data.lastRollNumber);
  setLastRoll(data.lastRollNumber);
  setRollNumber(Number(data.lastRollNumber) + 1);
};


  const handleDeleteStudent = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    await fetch(
      `https://sikshakendra-api.azurewebsites.net/api/schooladmin/students/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    fetchStudents();
  };

  /* ================= FILTER ================= */

  const filteredStudents = students
  .filter((s) =>
    `${s.fullName} ${s.rollNumber} ${s.class.name} ${s.class.section}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  .sort((a, b) => {
    const classA = `${a.class.name} ${a.class.section}`.toLowerCase();
    const classB = `${b.class.name} ${b.class.section}`.toLowerCase();

    if (classA < classB) return classSortOrder === "asc" ? -1 : 1;
    if (classA > classB) return classSortOrder === "asc" ? 1 : -1;
    return 0;
  });

  /* ================= UI ================= */

  return (
    <Layout role="schooladmin">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Students Management</h1>
        <button
          onClick={() => {
            setShowModal(true);
            setEditingStudent(null);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Student
        </button>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search student..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 px-4 py-2 border rounded-lg w-full md:w-1/3"
      />

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th>Roll</th>
              <th
  className="cursor-pointer select-none"
  onClick={toggleClassSort}
>
  Class {classSortOrder === "asc" ? "▲" : "▼"}
</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((s) => (
              <tr key={s.id} className="border-b last:border-none">
                <td className="p-3">{s.fullName}</td>
                <td>{s.rollNumber}</td>
                <td>
                  {s.class.name} {s.class.section.toUpperCase()}
                </td>
                <td className="space-x-3">
                  <button
                    className="text-indigo-600"
                    onClick={() => {
                      setEditingStudent(s);
                      setShowModal(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600"
                    onClick={() => handleDeleteStudent(s.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingStudent ? "Edit Student" : "Add Student"}
            </h2>

            <input
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full mb-3 px-4 py-2 border rounded"
            />

            <input
              placeholder="Roll Number"
              type="number"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              className="w-full mb-3 px-4 py-2 border rounded"
            />

            <select
  value={classId}
  onChange={(e) => {
    const selectedClassId = e.target.value;
    setClassId(selectedClassId);

    if (!editingStudent) {
      fetchLastRoll(selectedClassId);
    }
  }}
  className="w-full mb-3 px-4 py-2 border rounded"
>

              <option value="">Select Class</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} {c.section.toUpperCase()}
                </option>
              ))}
            </select>
            <input
  type="date"
  value={dob}
  onChange={(e) => setDob(e.target.value)}
  className="w-full mb-3 px-4 py-2 border rounded"
/>
<input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full mb-3 px-4 py-2 border rounded"
/>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {setShowModal(false);setLastRoll(null);setRollNumber("");}}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveStudent}
                className="bg-indigo-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Students;
