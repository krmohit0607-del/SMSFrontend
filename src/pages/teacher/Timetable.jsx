import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import TeacherLayout from "./components/TeacherLayout";

export default function Timetable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/teacher/timetable")
      .then(res => setData(res.data));
  }, []);

  return (
    <TeacherLayout>
      <h2 className="text-xl font-bold mb-4">My Timetable</h2>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr>
            <th>Day</th>
            <th>Class</th>
            <th>Subject</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((t, i) => (
            <tr key={i}>
              <td>{t.day}</td>
              <td>{t.className}</td>
              <td>{t.subject}</td>
              <td>{t.startTime} - {t.endTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </TeacherLayout>
  );
}
