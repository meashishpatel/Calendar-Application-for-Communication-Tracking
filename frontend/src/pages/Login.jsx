import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true); // Start loading
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      const { token, role } = response.data;

      console.log("Login response:", response.data); // Log response data

      // Save authentication data to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ email, role }));

      // Redirect based on role
      if (role === "superadmin" || role === "admin") {
        navigate("/admin");
      } else if (role === "user") {
        navigate("/user/dashboard");
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data); // Log error response
      setError(err.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
