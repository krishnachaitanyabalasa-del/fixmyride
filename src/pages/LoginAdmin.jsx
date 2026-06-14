import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import LogoImg from "../assets/logo.png";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginAdmin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setShowError(false);
    setErrorMessage("");
    setLoading(true);

    try {
      const payload = {
        username: form.username,
        password: form.password,
        role: "ADMIN",
      };

      const response = await axios.post(
        "https://fixmyride-backend-7jfl.onrender.com/api/admin/login",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const token = response.data;

      if (!token) {
        throw new Error("No token received from server");
      }

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("role", "ADMIN");
      sessionStorage.setItem("username", form.username);

      setLoading(false);

      navigate("/admin-home");

    } catch (error) {
      console.error("Login Error:", error);

      let message = "Wrong username or password";

      if (error.response) {
        const backendMessage = String(error.response.data).toLowerCase();

        if (backendMessage.includes("incorrect password")) {
          message = "Incorrect password";
        } else if (backendMessage.includes("username not found")) {
          message = "Username not found";
        }
      } else if (error.request) {
        message = "Cannot connect to server";
      }

      setErrorMessage(message);
      setShowError(true);
      setLoading(false);
    }
  };

  return (
    <div className="login-page login-page--admin">
      <div className="login-page__left login-page__left--black">
        <div className="login-page__brand login-page__brand--white" onClick={() => navigate("/")}>
          <img src={LogoImg} alt="FixMyRide" />
          <span>
            <span className="brand-fix" style={{color:"#2563eb"}}>Fix</span>
            <span className="brand-my" style={{ color: "#cbd5e1" }}>My</span>
            <span className="brand-ride" style={{color:"#f59e0b"}}>Ride</span>
          </span>
        </div>
        <div className="login-page__illus login-page__illus--white">
          <svg viewBox="0 0 320 260" width="100%" fill="none" xmlns="http://www.w3.org/2000/svg">

            <circle
              cx="160"
              cy="130"
              r="110"
              fill="rgba(255,255,255,0.08)"
            />

            {/* Dashboard Card */}
            <rect
              x="90"
              y="70"
              width="140"
              height="120"
              rx="20"
              fill="#4F46E5"
            />

            {/* Top Bar */}
            <rect
              x="110"
              y="90"
              width="100"
              height="12"
              rx="6"
              fill="#C7D2FE"
            />

            {/* Stats */}
            <rect
              x="110"
              y="120"
              width="30"
              height="40"
              rx="5"
              fill="#A5B4FC"
            />

            <rect
              x="150"
              y="110"
              width="30"
              height="50"
              rx="5"
              fill="#818CF8"
            />

            <rect
              x="190"
              y="100"
              width="30"
              height="60"
              rx="5"
              fill="#6366F1"
            />

            {/* Shield */}
            <path
              d="M160 30
                L190 42
                V75
                C190 98 175 112 160 120
                C145 112 130 98 130 75
                V42
                Z"
              fill="#FBBF24"
            />

            {/* Check Mark */}
            <path
              d="M148 74 L158 84 L176 63"
              stroke="#111827"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Floating Dots */}
            <circle cx="240" cy="80" r="6" fill="#FBBF24"/>
            <circle cx="255" cy="100" r="4" fill="#A78BFA"/>
            <circle cx="75" cy="95" r="5" fill="#60A5FA"/>
            <circle cx="65" cy="120" r="3" fill="#FBBF24"/>

          </svg>
          <h2 style={{ color: "#ffffff" }}>Admin Control Center</h2>
          <p style={{ color: "rgba(255,255,255,0.85)" }}>Monitor users, mechanics, service requests,payments and platform analytics from one dashboard.</p>
        </div>
      </div>

      <div className="login-page__right">
        <div className="login-card">
          <div className="login-card__badge login-card__badge--dark">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
            Admin Account
          </div>
          <h1 className="login-card__title">Admin Login</h1>
          <p className="login-card__sub">Sign in to manage the platform</p>

          {showError && (
            <div className="error-box">
              <span className="error-icon">✖</span>
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form-fields">
            <div className="field-group">
              <label>Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
              />
            </div>
            <div className="field-group">
              <label>Password</label>

              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      password: e.target.value,
                    })
                  }
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>

              <a href="#" className="forgot-link">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="submit-btn submit-btn--black"
              disabled={loading}
              style={{backgroundColor: "#111827", color: "#fff"}}
            >
              {loading ? "Logging in..." : "Login as Admin"}
            </button>
          </form>

          <p className="login-card__footer">
            Not registered yet?{" "}
            <a href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/register-admin");
            }}>Apply as Admin</a>
          </p>
          <button className="back-link" onClick={() => navigate("/")}>
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

