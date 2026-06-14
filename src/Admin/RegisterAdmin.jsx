import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./RegisterAdmin.css";
import LogoImg from "../assets/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function AdminRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    setShowError(false);

    if (form.password !== form.confirmPassword) {
      setShowError(true);
      setErrorMessage("Passwords do not match");
      return;
    }

   try {
      setLoading(true);
      setShowError(false);
      setShowSuccess(false);

      if (!form.username.trim()) {
        setErrorMessage("Please enter Username");
        setShowError(true);
        return;
      }

      if (!form.email.trim()) {
        setErrorMessage("Please enter Email Address");
        setShowError(true);
        return;
      }

      if (!form.password.trim()) {
        setErrorMessage("Please enter Password");
        setShowError(true);
        return;
      }

      if (!form.confirmPassword.trim()) {
        setErrorMessage("Please enter Confirm Password");
        setShowError(true);
        return;
      }

      if (form.password !== form.confirmPassword) {
        setErrorMessage("Passwords do not match");
        setShowError(true);
        return;
      }

      const payload = {
        username: form.username,
        email: form.email,
        password: form.password,
      };


      const response = await axios.post(
        "https://fixmyride-backend-7jfl.onrender.com/api/admin",
        payload
      );

      setErrorMessage("Admin Registered Successfully!");
      setShowSuccess(true);

      setTimeout(() => {
        navigate("/login-admin");
      }, 2000);

    } catch (error) {
      console.error(error);

      let message = "Registration Failed";

      if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (typeof error.response?.data === "string") {
        message = error.response.data;
      } else if (error.response?.status === 409) {
        message = "Email already exists";
      } else if (error.response?.status === 400) {
        message = "Invalid registration details";
      }

      setErrorMessage(message);
      setShowError(true);
      setShowSuccess(false);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-register-page">

      {/* LEFT SECTION */}

      <div className="admin-register-left">

        <div
          className="admin-brand"
          onClick={() => navigate("/")}
        >
          <img src={LogoImg} alt="FixMyRide" />

          <div className="admin-brand-text">
            <span className="brand-fix">Fix</span>
            <span className="brand-my" style={{ color: "white" }}>My</span>
            <span className="brand-ride">Ride</span>
          </div>
        </div>

        <div className="admin-left-content">

          <svg
            viewBox="0 0 600 450"
            width="100%"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="shieldGrad"
                x1="0"
                y1="0"
                x2="1"
                y2="1"
              >
                <stop offset="0%" stopColor="#7C83FF" />
                <stop offset="100%" stopColor="#4F46E5" />
              </linearGradient>

              <linearGradient
                id="sideGrad"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#6D72FF" />
                <stop offset="100%" stopColor="#4F46E5" />
              </linearGradient>

              <filter id="shadow">
                <feDropShadow
                  dx="0"
                  dy="8"
                  stdDeviation="12"
                  floodOpacity="0.15"
                />
              </filter>
            </defs>

            <circle
              cx="250"
              cy="180"
              r="150"
              fill="#EEF2FF"
            />

            <rect
              x="120"
              y="150"
              width="330"
              height="180"
              rx="20"
              fill="#FFFFFF"
              filter="url(#shadow)"
            />

            <rect
              x="120"
              y="150"
              width="55"
              height="180"
              rx="20"
              fill="url(#sideGrad)"
            />

            <circle cx="148" cy="190" r="15" fill="#FFFFFF" opacity="0.9"/>
            <circle cx="148" cy="240" r="15" fill="#FFFFFF" opacity="0.8"/>
            <circle cx="148" cy="290" r="15" fill="#FFFFFF" opacity="0.7"/>

            <polyline
              points="210,250 250,215 290,235 330,200 370,220 410,185"
              fill="none"
              stroke="#6366F1"
              strokeWidth="4"
            />

            <circle cx="210" cy="250" r="5" fill="#6366F1"/>
            <circle cx="250" cy="215" r="5" fill="#6366F1"/>
            <circle cx="290" cy="235" r="5" fill="#6366F1"/>
            <circle cx="330" cy="200" r="5" fill="#6366F1"/>
            <circle cx="370" cy="220" r="5" fill="#6366F1"/>
            <circle cx="410" cy="185" r="5" fill="#6366F1"/>

            <rect x="220" y="280" width="18" height="25" fill="#A5B4FC"/>
            <rect x="250" y="265" width="18" height="40" fill="#818CF8"/>
            <rect x="280" y="255" width="18" height="50" fill="#6366F1"/>
            <rect x="310" y="245" width="18" height="60" fill="#4F46E5"/>

            <circle
              cx="390"
              cy="275"
              r="35"
              fill="#E0E7FF"
            />

            <path
              d="M390 275 L390 240
              A35 35 0 0 1 420 290 Z"
              fill="#F59E0B"
            />

            <path
              d="M390 275 L420 290
              A35 35 0 0 1 365 305 Z"
              fill="#6366F1"
            />

            <path
              d="
                M285 40
                L355 70
                V135
                C355 180 325 215 285 235
                C245 215 215 180 215 135
                V70
                Z
              "
              fill="url(#shieldGrad)"
              filter="url(#shadow)"
            />

            <circle
              cx="285"
              cy="115"
              r="22"
              fill="white"
            />

            <path
              d="M250 170
              C250 140 320 140 320 170"
              fill="white"
            />

            <circle
              cx="375"
              cy="175"
              r="30"
              fill="#FBBF24"
              stroke="#FFFFFF"
              strokeWidth="8"
            />

            <path
              d="M362 175
              L373 186
              L390 166"
              stroke="#FFFFFF"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <h2>Create Admin Account</h2>

          <p>
            Gain secure access to manage users,
            mechanics, service requests and
            platform operations.
          </p>

          <div className="admin-features">

            <div className="admin-feature">
              <span>🛡️</span>
              <div>
                <strong>Secure Access</strong>
                <p>Advanced security for sensitive operations</p>
              </div>
            </div>

            <div className="admin-feature">
              <span>👥</span>
              <div>
                <strong>User Management</strong>
                <p>Manage users, mechanics and requests</p>
              </div>
            </div>

            <div className="admin-feature">
              <span>📊</span>
              <div>
                <strong>Platform Analytics</strong>
                <p>Track performance and platform insights</p>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* RIGHT SECTION */}

      <div className="admin-register-right">

        <div className="admin-register-card">

          <div className="admin-badge">
            🛡️ Admin Registration
          </div>

          <h1>Create Administrator Account</h1>

          <p className="sub">
            Register a new administrator for FixMyRide.
          </p>

          {showError && (
            <div className="error-box">
              <span className="error-icon">✖</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {showSuccess && (
            <div className="success-box">
              <span className="success-icon">✔</span>
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div>
              <label>Username</label>

              <input
                type="text"
                placeholder="Enter username"
                value={form.username}
                onChange={(e) =>
                  setForm({
                    ...form,
                    username: e.target.value,
                  })
                }
                
              />
            </div>

            <div>
              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter email address"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                
              />
            </div>

            <div>
              <label>Password</label>

              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      password: e.target.value,
                    })
                  }
                  
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>

            <div>
              <label>Confirm Password</label>

              <div className="password-wrapper">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm password"
                  value={form.confirmPassword}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      confirmPassword: e.target.value,
                    })
                  }
                 
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirm(!showConfirm)
                  }
                >
                  {showConfirm ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="admin-register-btn"
              disabled={loading}
            >
              {loading
                ? "Creating Account..."
                : "Create Admin Account"}
            </button>

          </form>

          <p className="admin-footer">
            Already have an account?{" "}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate("/login-admin");
              }}
            >
              Sign In
            </a>
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
