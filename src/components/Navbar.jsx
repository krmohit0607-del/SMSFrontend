import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";


const Navbar = ({ toggle }) => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();       // remove token + all data
    localStorage.removeItem("token");
localStorage.removeItem("user");
localStorage.removeItem("name");
    navigate("/");         // redirect to login page
  };

return (
<header className="h-16 bg-white shadow flex items-center px-4 justify-between">
<button onClick={toggle} className="text-gray-600">
<MenuIcon />
</button>


<div className="flex items-center gap-4">
<span className="text-sm font-medium">Welcome {localStorage.getItem("name")}</span>
<button className="text-red-500 text-sm" onClick={handleLogout}>Logout</button>
</div>
</header>
);
};


export default Navbar;