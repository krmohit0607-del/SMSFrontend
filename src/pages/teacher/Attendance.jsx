import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import api from "../../api/api";

export default function Attendance() {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);

  const [classId, setClassId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    api.get("/teacher/attendance/classes")
      .then(res => setClasses(res.data))
      .catch(err => console.error(err));
      console.log(classes);
  }, []);

  const loadSubjects = async (cid) => {
    setClassId(cid);
    setSubjectId("");
    setStudents([]);
    const res = await api.get(`/teacher/attendance/subjects/${cid}`);
    setSubjects(res.data);
  };

  const loadStudents = async (sid) => {
    setSubjectId(sid);
    const res = await api.get(
      `/teacher/attendance/students/${classId}`
      // &subjectId=${sid}`
    );
    setStudents(res.data);
  };

  const submitAttendance = async () => {
    const payload = {
      classId: Number(classId),
      subjectId: Number(subjectId),
      date: new Date().toISOString().split("T")[0],
      students: students.map(s => ({
        studentId: s.id,
        isPresent: attendance[s.id] ?? false
      }))
    };

    await api.post("/teacher/attendance", payload);
    alert("Attendance saved successfully");
  };

  return (
    <Layout role="teacher">
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Take Attendance</h2>

      {/* Class */}
      <select
        value={classId}
        onChange={e => loadSubjects(e.target.value)}
        className="border p-2 mb-3 w-full"
      >
        <option value="">Select Class</option>
        {classes.map(c => (
          <option key={c.id} value={c.id}>{c.name}{c.section.toUpperCase()}</option>
        ))}
      </select>

      {/* Subject */}
      <select
        value={subjectId}
        onChange={e => loadStudents(e.target.value)}
        className="border p-2 mb-3 w-full"
        disabled={!classId}
      >
        <option value="">Select Subject</option>
        {subjects.map(s => (
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>

      {/* Students */}
      {students.length > 0 && (
  <table className="w-full mt-4 border border-gray-300 rounded-lg overflow-hidden">
    <thead className="bg-gray-100">
      <tr>
        <th className="p-2 border text-left">Roll No</th>
        <th className="p-2 border text-left">Student Name</th>
        <th className="p-2 border text-center">Present</th>
      </tr>
    </thead>

    <tbody>
      {students.map((s, index) => (
        <tr key={s.id} className="hover:bg-gray-50">
          <td className="p-2 border">{s.rollNumber}</td>
          <td className="p-2 border">{s.fullName}</td>
          <td className="p-2 border text-center">
            <input
              type="checkbox"
              checked={attendance[s.id] ?? false}
              onChange={(e) =>
                setAttendance((prev) => ({
                  ...prev,
                  [s.id]: e.target.checked,
                }))
              }
            />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)}


      <button
        disabled={!students.length}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={submitAttendance}
      >
        Submit Attendance
      </button>
    </div>
    </Layout>
  );
}
