import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../components/Layout";


const Teachers = () => {
    const location = useLocation();

    const [showAddTeacherModal, setShowAddTeacherModal] = useState(false);
    const [fullName, setFullName] = useState("");
    const [subject, setSubject] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [teachers, setTeachers] = useState([]);
    const [editingTeacher, setEditingTeacher] = useState(null);
    const [search, setSearch] = useState("");

useEffect(() => {
    fetchTeachers();
    if (editingTeacher) {
        setFullName(editingTeacher.fullName);
        setEmail(editingTeacher.email);
        setSubject(editingTeacher.subject);
        setPassword(editingTeacher.password);
  } else {
        setFullName("");
        setEmail("");
        setSubject("");
        setPassword("");
  }
    if (location.state?.openAddTeacher) {
      setShowAddTeacherModal(true);
      setEditingTeacher(false);
    }
  }, [editingTeacher]);

const handleSaveTeacher = async () => {
  try {
    const url = editingTeacher
    ? `https://sikshakendra-api.azurewebsites.net/api/schooladmin/teachers/${editingTeacher.id}`
    : "https://sikshakendra-api.azurewebsites.net/api/schooladmin/teachers";

  const method = editingTeacher ? "PUT" : "POST";

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      fullName,
      email,
      subject,
      password: editingTeacher ? undefined : password,
    }),
  });

    if (!response.ok) {
      const err = await response.text();
      alert(err);
      return;
    }

    alert("Teacher added successfully");
    setShowAddTeacherModal(false);

    // OPTIONAL: refresh teacher list
  setEditingTeacher(null);
  fetchTeachers();

  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
};

const fetchTeachers = async () => {
  const response = await fetch(
    "https://sikshakendra-api.azurewebsites.net/api/schooladmin/teachers",
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  if (!response.ok) {
    console.error("Failed to fetch teachers");
    return;
  }

  const data = await response.json();
  setTeachers(data);
};
const handleDeleteTeacher = async (id) => {
  if (!window.confirm("Are you sure?")) return;

  await fetch(
    `https://sikshakendra-api.azurewebsites.net/api/schooladmin/teachers/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  fetchTeachers(); // refresh table
};
const filteredTeachers = teachers.filter((t) =>
  `${t.fullName} ${t.email} ${t.subject}`
    .toLowerCase()
    .includes(search.toLowerCase())
);



return (
<Layout role="schooladmin">
<div className="flex justify-between items-center mb-6">
<h1 className="text-2xl font-bold">Teachers Management</h1>
<button
onClick={() => {setShowAddTeacherModal(true);setEditingTeacher(false);}}
className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
>
+ Add Teacher
</button>
</div>


{/* SEARCH */}
<input
type="text"
placeholder="Search teacher..."
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
<th>Subject</th>
<th>Email</th>
<th>Status</th>
<th>Actions</th>
</tr>
</thead>
<tbody>
{filteredTeachers.map((t) => (
<tr key={t.id} className="border-b last:border-none">
<td className="p-3">{t.fullName}</td>
<td>{t.Teacher.subject}</td>
<td>{t.email}</td>
<td>
<span
className={`px-3 py-1 rounded-full text-xs ${
t.status === "Active"
? "bg-green-100 text-green-700"
: "bg-red-100 text-red-700"
}`}
>
{t.isActive}
</span>
</td>
<td className="space-x-3">
<button className="text-indigo-600" onClick={() => {
    setEditingTeacher(t);
    setShowAddTeacherModal(true);
  }}>Edit</button>
<button className="text-red-600" onClick={() => handleDeleteTeacher(t.id)}>Delete</button>
</td>
</tr>
))}
</tbody>
</table>
</div>


{/* ADD TEACHER MODAL */}
{showAddTeacherModal && (
<div className="fixed inset-0 bg-black/40 flex items-center justify-center">
<div className="bg-white p-6 rounded-xl w-full max-w-md">
<h2 className="text-xl font-semibold mb-4">Add Teacher</h2>


<input
placeholder="Full Name"
value={fullName}
onChange={(e) => setFullName(e.target.value)}
className="w-full mb-3 px-4 py-2 border rounded"
/>
<input
placeholder="Subject"
value={subject}
  onChange={(e) => setSubject(e.target.value)}
className="w-full mb-3 px-4 py-2 border rounded"
/>
<input
placeholder="Email"
 value={email}
  onChange={(e) => setEmail(e.target.value)}
className="w-full mb-3 px-4 py-2 border rounded"
/>
<input
type="password"
placeholder="Temporary Password"
value={password}
  onChange={(e) => setPassword(e.target.value)}
className="w-full mb-3 px-4 py-2 border rounded"
/>


<div className="flex justify-end gap-3">
<button
onClick={() => setShowAddTeacherModal(false)}
className="px-4 py-2 border rounded"
>
Cancel
</button>
<button className="bg-indigo-600 text-white px-4 py-2 rounded"  onClick={handleSaveTeacher}>
Save
</button>
</div>
</div>
</div>
)}
</Layout>
);
};


export default Teachers;