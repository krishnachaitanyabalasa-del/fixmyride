import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import LogoImg from "../assets/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

export default function LoginUser() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setShowError(false);
    setErrorMessage("");
    setLoading(true);

    try {
      const payload = {
        username: form.username,
        password: form.password,
        role: "USER",
      };

      const response = await axios.post(
        "https://fixmyride-backend-7jfl.onrender.com/api/user/login",
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
      sessionStorage.setItem("role", "USER");
      sessionStorage.setItem("username", form.username);

      setLoading(false);

      // Redirect
      navigate("/user-home");

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
    <div className="login-page login-page--user">
      <div className="login-page__left">
        <div
          className="login-page__brand"
          onClick={() => navigate("/")}
        >
          <img src={LogoImg} alt="FixMyRide" />
          <span>
            <span className="brand-fix">Fix</span>
            <span className="brand-my" style={{ color: "black" }}>My</span>
            <span className="brand-ride">Ride</span>
          </span>
        </div>

        <div className="login-page__illus">
          <svg
            viewBox="0 0 320 260"
            width="100%"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="160" cy="130" r="110" fill="#EFF6FF" />
            <rect
              x="60"
              y="110"
              width="200"
              height="80"
              rx="16"
              fill="#2563EB"
              opacity="0.9"
            />
            <rect
              x="80"
              y="88"
              width="140"
              height="36"
              rx="10"
              fill="#1E3A8A"
            />
            <rect
              x="90"
              y="93"
              width="52"
              height="24"
              rx="5"
              fill="#60A5FA"
            />
            <rect
              x="150"
              y="93"
              width="52"
              height="24"
              rx="5"
              fill="#93C5FD"
            />
            <circle cx="96" cy="192" r="22" fill="#1E3A8A" />
            <circle cx="96" cy="192" r="11" fill="#6B7280" />
            <circle cx="224" cy="192" r="22" fill="#1E3A8A" />
            <circle cx="224" cy="192" r="11" fill="#6B7280" />
            <path
              d="M50 145 Q30 135 25 125"
              stroke="#F97316"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M50 155 Q22 150 18 145"
              stroke="#F97316"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M260 140 Q282 130 286 122"
              stroke="#3B82F6"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="5,3"
            />
            <circle cx="210" cy="78" r="5" fill="#F97316" />
            <circle cx="240" cy="100" r="3.5" fill="#3B82F6" />
            <circle cx="95" cy="70" r="4" fill="#3B82F6" />
          </svg>

          <h2>
            Get On-Demand
            <br />
            Vehicle Assistance
          </h2>

          <p>
            Track mechanics in real-time and get back on the road fast.
          </p>
        </div>
      </div>

      <div className="login-page__right">
        <div className="login-card">

          <div className="login-card__badge login-card__badge--blue">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
            User Account
          </div>

          <h1 className="login-card__title">
            Welcome Back
          </h1>

          <p className="login-card__sub">
            Sign in to request vehicle assistance
          </p>

          {showError && (
            <div className="error-box">
              <span className="error-icon">✖</span>
              <span>{errorMessage}</span>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="login-form-fields"
          >
            <div className="field-group">
              <label>Username</label>

              <input
                type="text"
                placeholder="Enter your username"
                value={form.username}
                onChange={(e) =>
                  setForm({
                    ...form,
                    username: e.target.value,
                  })
                }
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
              className="submit-btn submit-btn--blue"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login as User"}
            </button>
          </form>

          <p className="login-card__footer">
            Don't have an account?{" "}
            <a href="#" className="register-link"
            onClick={(e) => {
              e.preventDefault();
              navigate("/register-user");
            }}>Create Account</a>
          </p>

          <button
            className="back-link"
            onClick={() => navigate("/")}
          >
            ← Back to Home
          </button>

        </div>
      </div>
    </div>
  );
}
