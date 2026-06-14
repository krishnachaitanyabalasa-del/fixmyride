import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import LogoImg from "../assets/logo.png";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginMechanic() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
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
        role: "MECHANIC",
      };

      const response = await axios.post(
        "https://fixmyride-backend-7jfl.onrender.com/api/mechanic/login",
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
      sessionStorage.setItem("role", "MECHANIC");
      sessionStorage.setItem("username", form.username);

      setLoading(false);

      navigate("/mechanic-home");

    } catch (error) {

      console.error("Login Error:", error);

      let message = "Wrong username or password";

      if (error.response) {

        const backendMessage =
          String(error.response.data);

        if (
          backendMessage
            .toLowerCase()
            .includes("incorrect password")
        ) {

          message = "Incorrect password";

        } else if (
          backendMessage
            .toLowerCase()
            .includes("username not found")
        ) {

          message = "Username not found";

        } else if (
          backendMessage
            .toLowerCase()
            .includes("awaiting admin approval")
        ) {

          message =
            "Your account is awaiting admin approval.";

        } else if (
          backendMessage
            .toLowerCase()
            .includes("registration was rejected")
        ) {

          message =
            "Your account registration was rejected.";

        } else {

          message = backendMessage;
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
    <div className="login-page login-page--mechanic">
      <div className="login-page__left login-page__left--orange">
        <div className="login-page__brand login-page__brand--white" onClick={() => navigate("/")}>
          <img src={LogoImg} alt="FixMyRide" />
          <span>
            <span className="brand-fix">Fix</span>
            <span className="brand-my" style={{ color: "black" }}>My</span>
            <span className="brand-ride" style={{ color: "white" }}>Ride</span>
          </span>
        </div>
        <div className="login-page__illus login-page__illus--white">
          <svg viewBox="0 0 320 280" width="100%" fill="none" xmlns="http://www.w3.org/2000/svg">

            {/* Background circle */}
            <circle cx="160" cy="140" r="120" fill="#FFF7ED" opacity="0.15"/>

            {/* Body / torso */}
            <rect x="118" y="128" width="84" height="75" rx="18" fill="#EA580C"/>
            <rect x="143" y="128" width="34" height="20" rx="6" fill="#C2410C"/>

            {/* Head */}
            <circle cx="160" cy="100" r="32" fill="#FED7AA"/>
            <circle cx="160" cy="105" r="22" fill="#FDBA74"/>
            <circle cx="151" cy="97" r="3" fill="#78350F"/>
            <circle cx="169" cy="97" r="3" fill="#78350F"/>
            <path d="M152 108 Q160 115 168 108" stroke="#78350F" strokeWidth="2" strokeLinecap="round" fill="none"/>

            {/* Hair */}
            <path d="M130 95 Q132 68 160 68 Q188 68 190 95 Q180 80 160 79 Q140 80 130 95Z" fill="#92400E"/>

            {/* Arms */}
            <rect x="96" y="132" width="26" height="16" rx="8" fill="#EA580C" transform="rotate(30 109 140)"/>
            <circle cx="90" cy="158" r="10" fill="#FED7AA"/>
            <rect x="198" y="132" width="26" height="16" rx="8" fill="#EA580C" transform="rotate(-30 211 140)"/>
            <circle cx="230" cy="158" r="10" fill="#FED7AA"/>

            {/* Wrench */}
            <rect x="224" y="130" width="12" height="55" rx="6" fill="#D4D4D4" transform="rotate(15 230 158)"/>
            <path d="M228 126 Q222 118 238 112 Q248 118 242 126Z" fill="#A3A3A3"/>
            <path d="M231 120 L239 120" stroke="#D4D4D4" strokeWidth="3" strokeLinecap="round"/>

            {/* Toolbox */}
            <rect x="60" y="195" width="55" height="40" rx="6" fill="#C2410C"/>
            <rect x="60" y="195" width="55" height="12" rx="6" fill="#9A3412"/>
            <rect x="79" y="190" width="18" height="8" rx="3" fill="#9A3412"/>

            {/* Gear */}
            <circle cx="75" cy="158" r="14" fill="none" stroke="#FFF7ED" strokeWidth="3"/>
            <circle cx="75" cy="158" r="6" fill="none" stroke="#FFF7ED" strokeWidth="3"/>

            {/* Stars */}
            <text x="198" y="82" fill="#FBBF24" fontSize="22">★</text>
            <text x="216" y="100" fill="#FBBF24" fontSize="15" opacity="0.8">★</text>
            <text x="185" y="60" fill="#FBBF24" fontSize="12" opacity="0.7">★</text>

            {/* Legs & boots */}
            <rect x="130" y="196" width="24" height="48" rx="10" fill="#1E3A5F"/>
            <rect x="166" y="196" width="24" height="48" rx="10" fill="#1E3A5F"/>
            <rect x="126" y="234" width="32" height="14" rx="7" fill="#111827"/>
            <rect x="162" y="234" width="32" height="14" rx="7" fill="#111827"/>
          </svg>

          <h2>Grow Your Mechanic Business</h2>
          <p>Accept jobs, track earnings, and build your reputation on FixMyRide.</p>
        </div>
      </div>

      <div className="login-page__right">
        <div className="login-card">
          <div className="login-card__badge login-card__badge--orange">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
            </svg>
            Mechanic Account
          </div>
          <h1 className="login-card__title">Mechanic Login</h1>
          <p className="login-card__sub">Sign in to manage your jobs and earnings</p>

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
              className="submit-btn submit-btn--orange"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login as Mechanic"}
            </button>
          </form>

          <p className="login-card__footer">
            Not registered yet?{" "}
            <a href="#" className="register-link"
            onClick={(e) => {
              e.preventDefault();
              navigate("/register-mechanic");
            }}>Apply as Mechanic</a>
          </p>
          <button className="back-link" onClick={() => navigate("/")}>
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

