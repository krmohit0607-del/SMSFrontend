// import Layout from "../../components/Layout";
// import { useNavigate } from "react-router-dom";
// import { useEffect,useState } from "react";
// import { Bar, Doughnut } from "react-chartjs-2";
// // import {getStudents} from "../../api/students"
// import {
//   Chart as ChartJS,
//   BarElement,
//   ArcElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   BarElement,
//   ArcElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend
// );


// const Dashboard = () => {
//     const navigate = useNavigate();
//     const [teachers, setTeachers] = useState();
//     const [students, setStudents] = useState();
//     const [classes, setClasses] = useState();
//      useEffect(() => {
//     fetchTeachers();
//     fetchStudents();
//     fetchClasses();
//     // fetchData();
//   }, []); 


// //   const fetchData = async () => {
// //     const res = await getStudents();
// //     console.log(res);
// //   const data = await response.json();
// //   setStudents(data.length);}


//   const fetchStudents = async () => {
//     const response = await fetch(
//     "https://localhost:7155/api/schooladmin/students",
//     {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     }
//   );
//   const data = await response.json();
//   setStudents(data.length);}

//   const fetchClasses = async () => {
//     const response = await fetch(
//     "https://localhost:7155/api/schooladmin/classes",
//     {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     }
//   );
//   const data = await response.json();
//   setClasses(data.length);}


//   const fetchTeachers = async () => {
//     const response = await fetch(
//     "https://localhost:7155/api/schooladmin/teachers",
//     {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     }
//   );
//   const data = await response.json();
//   setTeachers(data.length);}

// const attendanceData = {
//   labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
//   datasets: [
//     {
//       label: "Attendance %",
//       data: [90, 85, 88, 92, 95, 65],
//       backgroundColor: "#22C55E",
//       borderRadius: 8,
//     },
//   ],
// };

// const feesData = {
//   labels: ["Paid", "Pending"],
//   datasets: [
//     {
//       data: [75, 25],
//       backgroundColor: ["#6366F1", "#F97316"],
//     },
//   ],
// };


// return (
// <Layout role="schooladmin">
// <h1 className="text-2xl font-bold mb-6">School Admin Dashboard</h1>


// {/* KPI CARDS */}
// <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// <div className="bg-white p-5 rounded-xl shadow">
// <p className="text-gray-500 text-sm">Teachers</p>
// <h2 className="text-3xl font-bold">{teachers}</h2>
// </div>
// <div className="bg-white p-5 rounded-xl shadow">
// <p className="text-gray-500 text-sm">Students</p>
// <h2 className="text-3xl font-bold">{students}</h2>
// </div>
// <div className="bg-white p-5 rounded-xl shadow">
// <p className="text-gray-500 text-sm">Classes</p>
// <h2 className="text-3xl font-bold">{classes}</h2>
// </div>
// <div className="bg-white p-5 rounded-xl shadow"> 
// <p className="text-gray-500 text-sm">Fees Collected</p>
// <h2 className="text-3xl font-bold">₹18L</h2>
// </div>
// </div>


// {/* CHARTS */}
// <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

//       <div className="bg-white p-6 rounded-xl shadow">
//         <h3 className="font-semibold mb-4">Weekly Attendance</h3>
//         <Bar data={attendanceData} />
//       </div>

//       <div className="bg-white p-6 rounded-xl shadow">
//         <h3 className="font-semibold mb-4">Fees Status</h3>
//         <Doughnut data={feesData} />
//       </div>

//     </div>

// {/* QUICK ACTIONS */}
// <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// <button className="bg-indigo-600 text-white py-3 rounded-lg"onClick={() => navigate("/schooladmin/teachers",{state: { openAddTeacher: true },})}>Add Teacher</button>
// <button className="bg-indigo-600 text-white py-3 rounded-lg">Add Student</button>
// <button className="bg-indigo-600 text-white py-3 rounded-lg">Upload Timetable</button>
// <button className="bg-indigo-600 text-white py-3 rounded-lg">Upload Fees</button>
// </div>
// </Layout>
// );
// };


// export default Dashboard;


import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { fetchDashboard } from "../../api/dashboard";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDashboard().then(setData);
  }, []);

  if (!data) return <p>Loading...</p>;

  const attendanceData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Attendance %",
        data: data.weeklyAttendance,
        backgroundColor: [
          "#6366f1",
          "#22c55e",
          "#f59e0b",
          "#ef4444",
          "#06b6d4",
        ],
        borderRadius: 10,
      },
    ],
  };

  const feesData = {
    labels: ["Paid", "Pending"],
    datasets: [
      {
        data: [data.feesPaid, data.feesPending],
        backgroundColor: ["#22c55e", "#ef4444"],
      },
    ],
  };

  return (
    <Layout role="schooladmin">
      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card title="Teachers" value={data.totalTeachers} />
        <Card title="Students" value={data.totalStudents} />
        <Card title="Classes" value={data.totalClasses} />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4">Weekly Attendance</h3>
          <Bar data={attendanceData} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4">Fees Status</h3>
          <Doughnut data={feesData} />
        </div>
      </div>
    </Layout>
  );
};

const Card = ({ title, value }) => (
  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-xl shadow">
    <h4 className="text-sm">{title}</h4>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
);

export default Dashboard;
