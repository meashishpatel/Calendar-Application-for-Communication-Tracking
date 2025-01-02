import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      const { token, role } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ email, role }));

      if (role === "superadmin" || role === "admin") {
        navigate("/admin");
      } else if (role === "user") {
        navigate("/user/dashboard");
      } else {
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="home-container">
      <h1>Welcome to Communication Tracker</h1>
      <form onSubmit={handleLogin} className="login-form">
        <div className="input-group">
          <i className="fas fa-envelope"></i>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <i className="fas fa-lock"></i>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading} className="home-btn">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <button
        onClick={handleNavigateToRegister}
        className="home-btn register-btn"
      >
        New User? Register
      </button>
    </div>
  );
};

export default Home;
