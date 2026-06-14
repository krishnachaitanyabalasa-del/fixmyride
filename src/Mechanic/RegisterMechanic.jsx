import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../pages/Login.css";
import LogoImg from "../assets/logo.png";
import { FaEye, FaEyeSlash, FaMapMarkerAlt } from "react-icons/fa";
import mechanicImg from "../assets/mechanic-registration.png";
import "./RegisterMechanic.css";

export default function RegisterMechanic() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [locationCaptured, setLocationCaptured] = useState(false);

  const [mechanic, setMechanic] = useState({
    username: "",
    email: "",
    phone_number: "",
    skills: "",
    password: "",
    confirmPassword: "",
    experience_years: "",
    service_radius_km: 10,
    availability_status: true,
    address:"",
    base_location_lat: 0,
    base_location_long: 0,

    rating: 0,
    role: "MECHANIC",
    status: "PENDING",
  });


  const showMessage = (message, type) => {

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    if (type === "error") {

      setShowSuccess(false);

      setErrorMessage(message);

      setShowError(true);

    } else {

      setShowError(false);

      setSuccessMessage(message);

      setShowSuccess(true);

    }

  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      setShowError(true);
      setErrorMessage("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setMechanic((prev) => ({
          ...prev,
          base_location_lat: position.coords.latitude,
          base_location_long: position.coords.longitude,
        }));

        setLocationCaptured(true);
      },
      () => {
        setShowError(true);
        setErrorMessage("Location permission denied");
      }
    );
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setShowError(false);
    setShowSuccess(false);

    

    if (!mechanic.username.trim()) {

      showMessage(
        "Please enter a username.",
        "error"
      );

      return;
    }

    if (!mechanic.email.trim()) {

      showMessage(
        "Please enter your email address.",
        "error"
      );

      return;
    }
    if (!mechanic.phone_number.trim()) {

      showMessage(
        "Please enter your phone number.",
        "error"
      );

      return;
    }

    if (!/^[0-9]{10}$/.test(mechanic.phone_number)) {

      showMessage(
        "Please enter a valid 10-digit phone number.",
        "error"
      );

      return;
    }

    

    if (!mechanic.address.trim()) {

      showMessage(
        "Please enter your Garage Base address.",
        "error"
      );

      return;
    }

    if (
      mechanic.base_location_lat === 0 ||
      mechanic.base_location_long === 0
    ) {

      showMessage(
        "Please capture your current location.",
        "error"
      );

      return;
    }

    if (!mechanic.password.trim()) {

      showMessage(
        "Please enter a password.",
        "error"
      );

      return;
    }

    if (mechanic.password.length < 6) {

      showMessage(
        "Password must contain at least 6 characters.",
        "error"
      );

      return;
    }

    if (!mechanic.confirmPassword.trim()) {

      showMessage(
        "Please confirm your password.",
        "error"
      );

      return;
    }

    if (
      mechanic.password !== mechanic.confirmPassword
    ) {

      showMessage(
        "Password and Confirm Password do not match.",
        "error"
      );

      return;
    }

    try {

      setLoading(true);

      const payload = {
        username: mechanic.username,
        phone_number: mechanic.phone_number,
        email: mechanic.email,
        address: mechanic.address,
        password: mechanic.password,
        skills: mechanic.skills,

        experience_years: Number(mechanic.experience_years),
        service_radius_km: Number(mechanic.service_radius_km),

        availabilityStatus: mechanic.availability_status,

        base_location_lat: Number(mechanic.base_location_lat),
        base_location_long: Number(mechanic.base_location_long),

        rating: 0,
        role: "MECHANIC",
        status: "Pending",
      };

      console.log("Payload:", payload);

      await axios.post(
        "https://fixmyride-backend-7jfl.onrender.com/api/mechanic",
        payload
      );

      showMessage(
        "Registration successful! Redirecting to login...",
        "success"
      );

      setTimeout(() => {

        navigate("/login-mechanic");

      }, 2000);

    } catch (error) {

      console.error(error);

      let message =
        "Registration failed.";

      if (error.response) {

        if (
          typeof error.response.data === "string"
        ) {

          message =
            error.response.data;

        } else {

          message =
            "User already exists.";

        }

      }

      showMessage(
        message,
        "error"
      );

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="login-page login-page--mechanic">

      {/* LEFT SIDE */}

      <div className="mechanic-register-left">

        <div
          className="mechanic-brand"
          onClick={() => navigate("/")}
        >
          <img src={LogoImg} alt="FixMyRide" />

          <span>
            <span className="brand-fix">Fix</span>
            <span className="brand-my">My</span>
            <span className="brand-ride" style={{ color: "#facc15" }}>
              Ride
            </span>
          </span>
        </div>

        <div className="mechanic-left-content">


          

          <h2>Join Our Mechanic Network</h2>

          <p>
            Register as a mechanic with FixMyRide and get
            access to verified jobs, fair earnings and a
            growing community of professionals.
          </p>

          <div className="mechanic-features">
            <div className="mechanic-feature">
            
            <div className="feature-icon">🛡️</div>

            <div>
              <h4>Verified Jobs</h4>

              <span>
                Get access to genuine service requests
                from real customers.
              </span>
            </div>
          </div>

          <div className="mechanic-feature">
            <div className="feature-icon">📅</div>

            <div>
              <h4>Flexible Schedule</h4>

              <span>
                Work on your own time and choose jobs
                that fit your availability.
              </span>
            </div>
          </div>

          <div className="mechanic-feature">
            <div className="feature-icon">📊</div>

            <div>
              <h4>Earnings Tracking</h4>

              <span>
                Track your earnings, job history and
                performance in one place.
              </span>
            </div>
          </div>


          </div>
          
        </div>
      </div>

      {/* RIGHT SIDE */}

      <div className="mechanic-register-right">

        <div className="mechanic-register-card">

          <div className="mechanic-badge">
            🔧 Mechanic Registration
          </div>

          <h1 className="login-card__title">
            Apply as Mechanic
          </h1>

          <p className="login-card__sub">
            Join the FixMyRide mechanic network
          </p>

          {showError && (
            <div className="error-box">
              <span className="error-icon">✖</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {showSuccess && (
            <div
              className="success-box"
              style={{
                background: "#dcfce7",
                color: "#166534",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "16px",
              }}
            >
              ✔ {successMessage}
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
                value={mechanic.username}
                onChange={(e) =>
                  setMechanic({
                    ...mechanic,
                    username: e.target.value,
                  })
                }
                
              />
            </div>

            <div className="field-group">
              <label>Email</label>
              <input
                type="email"
                value={mechanic.email}
                onChange={(e) =>
                  setMechanic({
                    ...mechanic,
                    email: e.target.value,
                  })
                }
                
              />
            </div>

            <div className="field-group">
              <label>Phone Number</label>
              <input
                type="text"
                value={mechanic.phone_number}
                onChange={(e) =>
                  setMechanic({
                    ...mechanic,
                    phone_number: e.target.value,
                  })
                }
                
              />
            </div>

            <div className="field-group">
              <label>Skills</label>
              <input
                type="text"
                placeholder="Engine Repair, Electrical..."
                value={mechanic.skills}
                onChange={(e) =>
                  setMechanic({
                    ...mechanic,
                    skills: e.target.value,
                  })
                }
                
              />
            </div>

            <div className="field-group">
              <label>Experience (Years)</label>
              <input
                type="number"
                value={mechanic.experience_years}
                onChange={(e) =>
                  setMechanic({
                    ...mechanic,
                    experience_years: e.target.value,
                  })
                }
               
              />
            </div>

            <div className="field-group">
              <label>Service Radius (KM)</label>
              <input
                type="number"
                value={mechanic.service_radius_km}
                onChange={(e) =>
                  setMechanic({
                    ...mechanic,
                    service_radius_km: e.target.value,
                  })
                }
                
              />
            </div>

            <div className="field-group">
              <label>Address</label>
              <input
                type="text"
                value={mechanic.address}
                onChange={(e) =>
                  setMechanic({
                    ...mechanic,
                    address: e.target.value,
                  })
                }
                
              />
            </div>

            <div className="field-group">
              <label>Availability Status</label>

              <select
                value={mechanic.availability_status}
                onChange={(e) =>
                  setMechanic({
                    ...mechanic,
                    availability_status:
                      e.target.value === "true",
                  })
                }
              >
                <option value="true">Available</option>
                <option value="false">Unavailable</option>
              </select>
            </div>

            <div className="field-group">
              <label>Password</label>

              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  value={mechanic.password}
                  onChange={(e) =>
                    setMechanic({
                      ...mechanic,
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
                  {showPassword ? (
                    <FaEye />
                  ) : (
                    <FaEyeSlash />
                  )}
                </button>
              </div>
            </div>

            <div className="field-group">
              <label>Confirm Password</label>

              <div className="password-wrapper">
                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={mechanic.confirmPassword}
                  onChange={(e) =>
                    setMechanic({
                      ...mechanic,
                      confirmPassword: e.target.value,
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
              type="button"
              className="location-btn"
              onClick={getLocation}
            >
              <FaMapMarkerAlt />
              &nbsp;
              {locationCaptured
                ? "Location Captured ✓"
                : "Get Garage Base Location"}
            </button>

            <button
              type="submit"
              className="mechanic-register-btn"
              disabled={loading}
            >
              {loading
                ? "Submitting..."
                : "Create Mechanic Account"}
            </button>

          </form>

          <p className="login-card__footer">
            Already have an account?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/login-mechanic");
              }}
            >
              Login as Mechanic
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
