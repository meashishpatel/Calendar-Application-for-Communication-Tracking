import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = ({ role }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token
    navigate("/login");
  };

  return (
    <nav>
      <ul>
        {/* Shared Links */}
        <li>
          <Link to="/">Home</Link>
        </li>

        {/* User-Specific Links */}
        {role === "user" && (
          <li>
            <Link to="/user-dashboard">User Dashboard</Link>
          </li>
        )}

        {/* Admin-Specific Links */}
        {role === "admin" && (
          <li>
            <Link to="/admin-dashboard">Admin Dashboard</Link>
          </li>
        )}

        {/* Super Admin-Specific Links */}
        {role === "superadmin" && (
          <>
            <li>
              <Link to="/superadmin-dashboard">Super Admin Dashboard</Link>
            </li>
            <li>
              <Link to="/create-admin">Create Admin</Link>
            </li>
          </>
        )}

        {/* Auth Links */}
        {!role ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        ) : (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
