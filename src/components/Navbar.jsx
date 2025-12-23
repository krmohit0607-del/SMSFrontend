import MenuIcon from "@mui/icons-material/Menu";


const Navbar = ({ toggle }) => {
return (
<header className="h-16 bg-white shadow flex items-center px-4 justify-between">
<button onClick={toggle} className="text-gray-600">
<MenuIcon />
</button>


<div className="flex items-center gap-4">
<span className="text-sm font-medium">Welcome {localStorage.getItem("Name") ? localStorage.getItem("Name"): "Admin"}</span>
<button className="text-red-500 text-sm">Logout</button>
</div>
</header>
);
};


export default Navbar;