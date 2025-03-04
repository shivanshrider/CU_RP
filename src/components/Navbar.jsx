import { useState } from "react";
import { LogIn, LogOut, Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
  {/* Logo with Link */}
  <a href="/" className="flex items-center">
    <img src="src\public\daa-logo.webp" alt="CU Logo" className="h-12" />
  </a>

      {/* Hamburger Button for Mobile */}
      <button
        className="lg:hidden text-gray-700"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Navigation Links */}
      {/* <ul
        className={`absolute lg:static top-16 left-0 w-full bg-white lg:w-auto lg:flex items-center gap-6 text-gray-700 font-medium shadow-md lg:shadow-none transition-all duration-300 ${
          menuOpen ? "block" : "hidden lg:flex"
        }`}
      >
        {isLoggedIn && (
          <>
            <li className="px-6 py-2 lg:p-0 border-b lg:border-none">
              <NavLink
                to="/new-request"
                className="hover:text-red-600 transition cursor-pointer"
                onClick={() => setMenuOpen(false)}
              >
                New Request
              </NavLink>
            </li>
            <li className="px-6 py-2 lg:p-0 border-b lg:border-none">
              <NavLink
                to="/pending-request"
                className="hover:text-red-600 transition cursor-pointer"
                onClick={() => setMenuOpen(false)}
              >
                Pending Request
              </NavLink>
            </li>
            <li className="px-6 py-2 lg:p-0">
              <NavLink
                to="/completed-request"
                className="hover:text-red-600 transition cursor-pointer"
                onClick={() => setMenuOpen(false)}
              >
                Completed Request
              </NavLink>
            </li>
          </>
        )}
      </ul> */}

      {/* Right-Side Buttons */}
      <div className="hidden lg:flex items-center gap-4">
        {/* Student Status Button */}
        <NavLink
          to="/student-status"
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition"
        >
          Student Status
        </NavLink>

        {/* Login/Logout Button */}
        <button
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
          onClick={() => setIsLoggedIn(!isLoggedIn)}
        >
          {isLoggedIn ? <LogOut size={20} /> : <LogIn size={20} />}
          <span className="font-medium">{isLoggedIn ? "Logout" : "Login"}</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
