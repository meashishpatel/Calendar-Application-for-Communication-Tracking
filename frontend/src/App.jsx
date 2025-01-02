import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CompanyManagement from "./components/Admin/CompanyManagement";
import MethodManagement from "./components/Admin/MethodManagement";
import Dashboard from "./components/User/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home"; // New Home Page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home page */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<CompanyManagement />} />
        <Route path="/method-management" element={<MethodManagement />} />
        <Route path="/user/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
