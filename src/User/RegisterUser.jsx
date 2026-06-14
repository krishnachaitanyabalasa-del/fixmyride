import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import LogoImg from "../assets/logo.png";


import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";


import "./styles/RegisterUser.css";

export default function RegisterUser() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [showError, setShowError] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const [user, setUser] = useState({
    username: "",
    full_name: "",
    phoneNumber: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",

    role: "USER",

    location_lat: 0,
    location_long: 0,
  });

  const showErrorMessage = (message) => {

    setShowSuccess(false);

    setErrorMessage(message);

    setShowError(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const showSuccessMessage = (message) => {

    setShowError(false);

    setSuccessMessage(message);

    setShowSuccess(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setShowError(false);
    setShowSuccess(false);

    if (!user.full_name.trim()) {

      showErrorMessage(
        "Please enter your full name."
      );

      return;
    }

    if (!user.username.trim()) {

      showErrorMessage(
        "Please enter a username."
      );

      return;
    }

    if (!user.phoneNumber.trim()) {

      showErrorMessage(
        "Please enter your phone number."
      );

      return;
    }

    if (!/^[0-9]{10}$/.test(user.phoneNumber)) {

      showErrorMessage(
        "Please enter a valid 10-digit phone number."
      );

      return;
    }

    if (!user.email.trim()) {

      showErrorMessage(
        "Please enter your email address."
      );

      return;
    }

    if (!user.address.trim()) {

      showErrorMessage(
        "Please enter your permanent address."
      );

      return;
    }

    if (
      user.location_lat === 0 ||
      user.location_long === 0
    ) {

      showErrorMessage(
        "Please capture your current location."
      );

      return;
    }

    if (!user.password.trim()) {

      showErrorMessage(
        "Please enter a password."
      );

      return;
    }

    if (user.password.length < 6) {

      showErrorMessage(
        "Password must contain at least 6 characters."
      );

      return;
    }

    if (!user.confirmPassword.trim()) {

      showErrorMessage(
        "Please confirm your password."
      );

      return;
    }

    if (
      user.password !==
      user.confirmPassword
    ) {

      showErrorMessage(
        "Password and Confirm Password do not match."
      );

      return;
    }

    try {

      setLoading(true);

      const payload = {
        username: user.username,
        full_name: user.full_name,
        phoneNumber: user.phoneNumber,
        email: user.email,
        address: user.address,
        password: user.password,
        role: "USER",
        location_lat: user.location_lat,
        location_long: user.location_long,
      };

      await axios.post(
        "https://fixmyride-backend-7jfl.onrender.com/api/user",
        payload
      );

      showSuccessMessage(
        "Registration successful! Redirecting to login..."
      );

      setTimeout(() => {

        navigate("/login-user");

      }, 2000);

    } catch (error) {

      console.error(error);

      let message =
        "Registration failed.";

      if (error.response) {

        message =
          error.response.data ||
          "User already exists.";

      }

      showErrorMessage(message);

    } finally {

      setLoading(false);

    }

  };
    const getCurrentLocation = () => {

      if (!navigator.geolocation) {

        setErrorMessage(
          "Geolocation is not supported by your browser."
        );

        setShowError(true);

        return;
      }

      navigator.geolocation.getCurrentPosition(

        (position) => {

          setUser((prev) => ({
            ...prev,
            location_lat:
              position.coords.latitude,

            location_long:
              position.coords.longitude,
          }));

        },

        () => {

          setErrorMessage(
            "Unable to fetch your location."
          );

          setShowError(true);

        }

      );

    };
    



  return (
    <div className="user-register-page">
      {/* LEFT SIDE */}

      <div className="user-register-left">
        <div
          className="user-brand"
          onClick={() => navigate("/")}
        >
          <img
            src={LogoImg}
            alt="FixMyRide"
          />

          <span className="user-brand-text">
            <span className="fix">Fix</span>
            <span className="my">My</span>
            <span className="ride">Ride</span>
          </span>
        </div>

        <div className="user-left-content">
          

          <h2>Create Your Account</h2>

          <p>
            Join FixMyRide and get quick access to
            trusted mechanics, real-time service
            tracking and reliable roadside assistance.
          </p>

          <div className="user-features">

            <div className="user-feature">
              <span className="feature-svg">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 16L7 10H17L19 16"
                    stroke="#2563EB"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <rect
                    x="3"
                    y="12"
                    width="18"
                    height="5"
                    rx="2"
                    stroke="#2563EB"
                    strokeWidth="2"
                  />
                  <circle cx="7" cy="18" r="2" fill="#2563EB"/>
                  <circle cx="17" cy="18" r="2" fill="#2563EB"/>
                </svg>
              </span>

              <div>
                <strong>
                  Roadside Assistance
                </strong>

                <p>
                  Request immediate vehicle
                  assistance whenever you need
                  help.
                </p>
              </div>
            </div>

            <div className="user-feature">
              <span className="feature-svg">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 21C12 21 18 15.5 18 10
                      A6 6 0 1 0 6 10
                      C6 15.5 12 21 12 21Z"
                    stroke="#2563EB"
                    strokeWidth="2"
                    fill="#DBEAFE"
                  />
                  <circle
                    cx="12"
                    cy="10"
                    r="2.5"
                    fill="#2563EB"
                  />
                </svg>
              </span>

              <div>
                <strong>
                  Live Service Tracking
                </strong>

                <p>
                  Track assigned mechanics and
                  service progress in real time.
                </p>
              </div>
            </div>

            <div className="user-feature">
              <span className="feature-svg">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L14.9 8.2L22 9.2
                    L17 14L18.2 21L12 17.5
                    L5.8 21L7 14L2 9.2
                    L9.1 8.2L12 2Z"
                    fill="#2563EB"
                  />
                </svg>
              </span>

              <div>
                <strong>
                  Trusted Mechanics
                </strong>

                <p>
                  Connect with verified and
                  experienced mechanics near you.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}

      <div className="user-register-right">

        <div className="user-register-card">

          <div className="user-badge">
            <FaUser />
            User Registration
          </div>

          <h1>Create User Account</h1>

          <p className="sub">
            Register to request vehicle assistance
            and track services.
          </p>

          {showError && (
            <div className="error-box">
              ✖ {errorMessage}
            </div>
          )}

          {showSuccess && (
            <div className="success-box">
              ✔ {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div>
              <label>Full Name</label>

              <input
                type="text"
                value={user.full_name}
                onChange={(e) =>
                  setUser({
                    ...user,
                    full_name: e.target.value,
                  })
                }
                required
              />
            </div>

            <div>
              <label>Username</label>

              <input
                type="text"
                value={user.username}
                onChange={(e) =>
                  setUser({
                    ...user,
                    username: e.target.value,
                  })
                }
                
              />
            </div>

            <div>
              <label>Phone Number</label>

              <input
                type="text"
                value={user.phoneNumber}
                onChange={(e) =>
                  setUser({
                    ...user,
                    phoneNumber: e.target.value,
                  })
                }
                
              />
            </div>

            <div>
              <label>Email Address</label>

              <input
                type="email"
                value={user.email}
                onChange={(e) =>
                  setUser({
                    ...user,
                    email: e.target.value,
                  })
                }
                
              />
            </div>

            <div>
              <label>Address</label>

              <input
                type="text"
                value={user.address}
                onChange={(e) =>
                  setUser({
                    ...user,
                    address: e.target.value,
                  })
                }
                
              />
            </div>

            <div className="location-section">

              <button
                type="button"
                className="location-btn"
                onClick={getCurrentLocation}
              >
                Get Current Location
              </button>

              {
                user.location_lat !== 0 &&
                user.location_long !== 0 && (
                  <div className="location-success">
                    ✓ Location Captured Successfully
                  </div>
                )
              }

              

            </div>

            <div>
              <label>Password</label>

              <div className="password-wrapper">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={user.password}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      password: e.target.value,
                    })
                  }
                  
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >
                  {showPassword ? (
                    <FaEye />
                  ) : (
                    <FaEyeSlash />
                  )}
                </button>

              </div>
            </div>

            <div>
              <label>Confirm Password</label>

              <div className="password-wrapper">

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={
                    user.confirmPassword
                  }
                  onChange={(e) =>
                    setUser({
                      ...user,
                      confirmPassword:
                        e.target.value,
                    })
                  }
                  
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >
                  {showConfirmPassword ? (
                    <FaEye />
                  ) : (
                    <FaEyeSlash />
                  )}
                </button>

              </div>
            </div>

            <button
              type="submit"
              className="user-register-btn"
              disabled={loading}
            >
              {loading
                ? "Creating Account..."
                : "Create User Account"}
            </button>

          </form>

          <p className="user-footer">
            Already have an account?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/login-user");
              }}
            >
              Login as User
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
