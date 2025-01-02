import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CompanyManagement from "./components/Admin/CompanyManagement";
import MethodManagement from "./components/Admin/MethodManagement";
import Dashboard from "./components/User/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css"; // Include for global styles

// Function to get the user role from the JWT token
const getUserRole = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
    return payload.role; // Return role from the token
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

// Higher-order function for protected routes
const ProtectedRoute = ({ element, requiredRole }) => {
  const role = getUserRole();

  if (!role) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/login" />;
  }

  return element;
};

function App() {
  const role = getUserRole();

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Routes */}
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute element={<Dashboard />} requiredRole="user" />
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              element={<CompanyManagement />}
              requiredRole="admin"
            />
          }
        />
        <Route
          path="/method-management"
          element={
            <ProtectedRoute
              element={<MethodManagement />}
              requiredRole="admin"
            />
          }
        />

        {/* Super Admin Routes */}
        <Route
          path="/superadmin"
          element={
            <ProtectedRoute
              element={<CompanyManagement />}
              requiredRole="superadmin"
            />
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
