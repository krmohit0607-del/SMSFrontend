import { useState } from "react";
import { login } from "../../api/auth";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import SchoolIcon from "@mui/icons-material/School";


const Login = () => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);


const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await login(email, password);

    // Save token
    localStorage.setItem("token", res.token);
    localStorage.setItem("role", res.role);

    // Redirect based on role
    switch (res.role) {
      case "SuperAdmin":
        window.location.href = "/superadmin";
        break;
      case "SchoolAdmin":
        window.location.href = "/schooladmin";
        break;
      case "Teacher":
        window.location.href = "/teacher";
        break;
      default:
        window.location.href = "/parent";
        break;
    }
  } catch (err) {
    alert("Invalid email or password");
  }
};


return (
<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-700">
{/* <div className="min-h-screen flex items-center justify-center 
bg-gradient-to-br from-sky-100 via-blue-100 to-cyan-100"> */}

<div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">


{/* Left Section */}
<div className="hidden md:flex flex-col items-center justify-center bg-indigo-600 text-white p-8">
<SchoolIcon sx={{ fontSize: 80 }} />
<h2 className="text-3xl font-bold mt-4">Siksha Kendra</h2>
<p className="text-center mt-3 opacity-90">
Manage schools, teachers, students and performance in one platform
</p>
</div>


{/* Right Section */}
<form onSubmit={handleLogin} className="p-8">
<h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Login</h2>


<div className="mb-4">
<label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
<input
type="email"
required
className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
placeholder="Enter email"
value={email}
onChange={(e) => setEmail(e.target.value)}
/>
</div>


<div className="mb-6">
<label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
<div className="relative">
<input
type={showPassword ? "text" : "password"}
required
className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
placeholder="Enter password"
value={password}
onChange={(e) => setPassword(e.target.value)}
/>
<span
className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
onClick={() => setShowPassword(!showPassword)}
>
{showPassword ? <VisibilityOff /> : <Visibility />}
</span>
</div>
</div>


<button
type="submit"
className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
>
Login
</button>


<p className="text-sm text-center text-gray-500 mt-4">
© 2025 Siksha Kendra
</p>
</form>
</div>
</div>
);
};


export default Login;