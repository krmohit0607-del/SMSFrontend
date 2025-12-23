import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import SuperAdminDashboard from "./pages/superadmin/Dashboard";
import Schools from "./pages/superadmin/Schools"
import Subscriptions from "./pages/superadmin/Subscriptions"
import Dashboard from "./pages/schooladmin/Dashboard";
import Teachers from "./pages/schooladmin/Teachers";
import Students from "./pages/schooladmin/Students";
import Timetable from "./pages/schooladmin/Timetable";
import Attendance from "./pages/schooladmin/Attendance";
import Classes from "./pages/schooladmin/Classes";
import Fees from "./pages/schooladmin/Fees";
import TDashboard from "./pages/teacher/Dashboard";
import TAttendance from "./pages/teacher/Attendance";
import Assignments from "./pages/teacher/Assignments";
import Marks from "./pages/teacher/Marks";
import PDashboard from "./pages/parent/Dashboard";
import PAttendance from "./pages/parent/Attendance";
import Performance from "./pages/parent/Performance";
import PAssignments from "./pages/parent/Assignments";
import PFees from "./pages/parent/Fees";


function App() {
return (
<BrowserRouter>
<Routes>
<Route path="/" element={<Login />} />
<Route path="/superadmin" element={<SuperAdminDashboard />} />
<Route path="/superadmin/schools" element={<Schools />} />
<Route path="/superadmin/subscriptions" element={<Subscriptions />} />
<Route path="/schooladmin" element={<Dashboard />} />
<Route path="/schooladmin/teachers" element={<Teachers />} />
<Route path="/schooladmin/students" element={<Students />} />
<Route path="/schooladmin/timetable" element={<Timetable />} />
<Route path="/schooladmin/fees" element={<Fees />} />
<Route path="/schooladmin/attendance" element={<Attendance />} />
<Route path="/schooladmin/classes" element={<Classes />} />
<Route path="/teacher" element={<TDashboard />} />
<Route path="/teacher/attendance" element={<TAttendance />} />
<Route path="/teacher/assignments" element={<Assignments />} />
<Route path="/teacher/marks" element={<Marks />} />
<Route path="/parent" element={<PDashboard />} />
<Route path="/parent/attendance" element={<PAttendance />} />
<Route path="/parent/performance" element={<Performance />} />
<Route path="/parent/assignments" element={<PAssignments />} />
<Route path="/parent/fees" element={<PFees />} />
</Routes>
</BrowserRouter>
);
}


export default App;