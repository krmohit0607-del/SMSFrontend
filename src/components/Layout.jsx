import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";


const Layout = ({ children, role }) => {
const [open, setOpen] = useState(true);


return (
<div className="flex min-h-screen bg-gray-100">
<Sidebar open={open} role={role} />


<div className="flex-1">
<Navbar toggle={() => setOpen(!open)} />
<main className="p-6">{children}</main>
</div>
</div>
);
};


export default Layout;