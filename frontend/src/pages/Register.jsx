import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [superAdminEmail, setSuperAdminEmail] = useState("");
  const [superAdminPassword, setSuperAdminPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const payload = { username, email, password, role };

    if (role === "admin") {
      payload.superAdminEmail = superAdminEmail;
      payload.superAdminPassword = superAdminPassword;
    }

    try {
      await axios.post("/api/auth/register", payload);
      setSuccess("Registration successful. Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.error || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        {role === "admin" && (
          <>
            <input
              type="email"
              placeholder="Super Admin Email"
              value={superAdminEmail}
              onChange={(e) => setSuperAdminEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Super Admin Password"
              value={superAdminPassword}
              onChange={(e) => setSuperAdminPassword(e.target.value)}
              required
            />
          </>
        )}
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
