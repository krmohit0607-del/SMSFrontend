import { Link } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";


const menus = {
superadmin: [
{ name: "Dashboard", path: "/superadmin" },
{ name: "Schools", path: "/superadmin/schools" },
{ name: "Subscriptions", path: "/superadmin/subscriptions" },
],
schooladmin: [
{ name: "Dashboard", path: "/schooladmin" },
{ name: "Teachers", path: "/schooladmin/teachers" },
{ name: "Students", path: "/schooladmin/students" },
{ name: "Attendance", path: "/schooladmin/attendance" },
{ name: "Classes", path: "/schooladmin/classes" },
// { name: "Timetable", path: "/schooladmin/timetable" },
{ name: "Fees", path: "/schooladmin/fees" },
],
teacher: [
{ name: "Dashboard", path: "/teacher" },
{ name: "Attendance", path: "/teacher/attendance" },
// { name: "Assignments", path: "/teacher/assignments" },
// { name: "Marks", path: "/teacher/marks" },
],
parent: [
{ name: "Dashboard", path: "/parent" },
{ name: "Performance", path: "/parent/performance" },
{ name: "Assignments", path: "/parent/assignments" },
{ name: "Attendance", path: "/parent/attendance" },
{ name: "Fees", path: "/parent/fees" },
],
};


const Sidebar = ({ open, role }) => {
return (
<aside
className={`bg-indigo-700 text-white transition-all duration-300 ${
open ? "w-64" : "w-16"
}`}
>
<div className="flex items-center justify-center h-16 border-b border-indigo-600">
<SchoolIcon />
{open && <span className="ml-2 font-bold">Siksha Kendra</span>}
</div>


<ul className="mt-4">
{menus[role]?.map((item) => (
<li key={item.name}>
<Link
to={item.path}
className="block px-4 py-3 hover:bg-indigo-600"
>
{open ? item.name : item.name[0]}
</Link>
</li>
))}
</ul>
</aside>
);
};


export default Sidebar;