import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigateToLogin = () => {
    navigate("/login");
  };

  const handleNavigateToRegister = () => {
    navigate("/register");
  };

  return (
    <div style={styles.container}>
      <h1>Welcome to Communication Tracker</h1>
      <div style={styles.buttonContainer}>
        <button onClick={handleNavigateToLogin} style={styles.button}>
          Login
        </button>
        <button onClick={handleNavigateToRegister} style={styles.button}>
          Register
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
  },
  buttonContainer: {
    marginTop: "20px",
  },
  button: {
    margin: "10px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
  },
};

export default Home;
