import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../Api";
import "./Login.css";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    if (!password) {
      toast.error("Please enter your password.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await login({ email, password });
      if (response.code === 200) {
        toast.success(response.message);
        localStorage.setItem("token", response.data.token);
        navigate("/BlogManager");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Login failed", error);
      toast.error("An error occurred during login.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Email:</label>
          <input
            type="text"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password:</label>
          <input
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="form-button">
          Login
        </button>
      </form>

      <div className="login-link">
        <p>Don't have an account?</p>
        <button className="link-button" onClick={() => navigate("/")}>
          Signup
        </button>
      </div>
    </div>
  );
};

export default Login;
