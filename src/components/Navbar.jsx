import { LogIn, LogOut, Menu, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import { useState } from "react";

const Navbar = ({ user }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      {/* Logo with Link */}
      <NavLink to="/" className="flex items-center">
        <img src="src/public/daa-logo.webp" alt="CU Logo" className="h-12" />
      </NavLink>

      {/* Hamburger Button for Mobile */}
      <button
        className="lg:hidden text-gray-700"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Right-Side Buttons */}
      <div className="hidden lg:flex items-center gap-4">
        <NavLink
          to="/student-status"
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition"
        >
          Student Status
        </NavLink>

        {user ? (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        ) : (
          <NavLink
            to="/login"
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
          >
            <LogIn size={20} />
            <span>Login</span>
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;