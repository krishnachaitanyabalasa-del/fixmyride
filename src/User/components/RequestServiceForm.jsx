import React, { useState } from "react";
import "../styles/RequestServiceForm.css";
import axios from "axios";

const RequestServiceForm = () => {

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [locationCaptured, setLocationCaptured] =useState(false);
  const [formData, setFormData] = useState({
    username: sessionStorage.getItem("username") || "User",
    assigned_mechanic_id:"",
    vehicleType: "Car",
    vehicleNumber: "",
    service_category: "Battery Issue",
    problem_description: "",
    status:"Pending",
    amount:0,
    payment_status:"Unpaid",
    location: "",
    current_location_lat: 0,
    current_location_long: 0,
  });

  const [loadingLocation, setLoadingLocation] =
    useState(false);

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const getLocation = () => {
    if (!navigator.geolocation) {
      setMessage(
        "Geolocation is not supported by your browser."
      );
      setMessageType("error");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((prev) => ({
          ...prev,
          current_location_lat: position.coords.latitude,
          current_location_long: position.coords.longitude,
        }));

        setLocationCaptured(true);
        setLoadingLocation(false);
      },
      () => {
        setMessage("Unable to fetch location.");
        setMessageType("error");
        setLoadingLocation(false);
      }
    );
  };

  const showMessage = (text, type) => {

    setMessage(text);
    setMessageType(type);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const token =
        sessionStorage.getItem("token");

      if (!formData.vehicleNumber.trim()) {

        showMessage(
          "Please enter your vehicle number.",
          "error"
        );

        return;
      }

      if (!formData.service_category) {

        

        showMessage(
          "Please select a service category.",
          "error"
        );

        return;
      }

      

      if (
        formData.current_location_lat === 0 ||
        formData.current_location_long === 0
      ) {

        showMessage(
          "Please capture your current location.",
          "error"
        ); 
        return;
      }

      const payload = {
        username: formData.username,
        assigned_mechanic_id:
          formData.assigned_mechanic_id,

        vehicle_type: formData.vehicleType,
        vehicle_number: formData.vehicleNumber,

        service_category:
          formData.service_category,

        problem_description:
          formData.problem_description,

        status: "Pending",

        amount: formData.amount,

        payment_status: "Unpaid",

        location: formData.location,

        current_location_lat: parseFloat(
          formData.current_location_lat
        ),

        current_location_long: parseFloat(
          formData.current_location_long
        ),
      };

      const response = await axios.post(
        "https://fixmyride-backend-7jfl.onrender.com/api/request",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":
              "application/json",
          },
        }
      );

      setMessage(
        "Request submitted successfully!"
      );

      setMessageType("success");
      setFormData({
        ...formData,
        vehicle_number: "",
        problem_description: "",
        location: "",
        current_location_lat: 0,
        current_location_long: 0,
        amount:0,
      });
      setLocationCaptured(false);

      

    } catch (error) {

      console.log(error);

      setMessage(
        "Failed to submit request."
      );

      setMessageType("error");
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="request-form-section">
      
      <div className="left-section">
        {message && (
          <div
            className={`message-box ${messageType}`}
          >
            {message}
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="request-form"
        >
          {/* VEHICLE INFO */}

          <div className="form-card">
            <div className="card-header">
              <h3>1. Vehicle Information</h3>
              <p>Enter your vehicle details</p>
            </div>

            <div className="form-grid">
              <div className="input-group">
                <label>Vehicle Type</label>

                <select
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                >
                  <option>Car</option>
                  <option>Bike</option>
                  <option>Truck</option>
                  <option>Auto</option>
                </select>
              </div>

              <div className="input-group">
                <label>Vehicle Number</label>

                <input
                  type="text"
                  name="vehicleNumber"
                  placeholder="TS09AB1234"
                  value={formData.vehicle_number}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* SERVICE DETAILS */}

          <div className="form-card">
            <div className="card-header">
              <h3>2. Service Details</h3>
              <p>
                Tell us what's wrong with your vehicle
              </p>
            </div>

            <div className="input-group">
              <label>Service Category</label>

              <select
                name="service_category"
                value={formData.service_category}
                onChange={handleChange}
              >
                <option>Battery Issue</option>
                <option>Flat Tyre</option>
                <option>Engine Problem</option>
                <option>Fuel Delivery</option>
                <option>General Service</option>
                <option>Emergency Breakdown</option>
              </select>
            </div>

            <div className="input-group">
              <label>Problem Description</label>

              <textarea
                rows="5"
                name="problem_description"
                value={formData.problem_description}
                onChange={handleChange}
                placeholder="Describe your issue..."
              />
            </div>
          </div>

          {/* LOCATION */}

          <div className="form-card">
            <div className="card-header">
              <h3>3. Location Information</h3>

              <p>
                We use your current location to find
                nearby mechanics
              </p>
            </div>

            <button
              type="button"
              className="location-btn"
              onClick={getLocation}
            >
              {loadingLocation
                ? "Fetching Location..."
                : "Get Current Location"}
            </button>

            <div className="form-grid">
              <div className="input-group">
                <label>Latitude</label>

                <input
                  type="text"
                  value={formData.current_location_lat}
                  readOnly
                />
              </div>

              <div className="input-group">
                <label>Longitude</label>

                <input
                  type="text"
                  value={formData.current_location_long}
                  readOnly
                />
              </div>
            </div>

            {locationCaptured && (
              <div className="location-success">
                ✓ Location captured successfully
              </div>
            )}

            <div className="input-group">
              <label>Location</label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter location if known"
              />
            </div>
          </div>

          <div className="form-card">
            <div className="card-header">
              <h3>Expected Amount</h3>
              <p>Expected Minimum Amount</p>
            </div>
            <div className="input-group">
              <label>Expected Amount</label>

              <input
                type="text"
                name="amount"
                placeholder="Enter expected amount"
                value={formData.amount}
                onChange={handleChange}
              />
            </div>

          </div>

          {/* SUBMIT */}

          

          {/* SUBMIT */}

          <button
            type="submit"
            className="submit-request-btn"
          >
            Request Assistance
          </button>
        </form>
      </div>
      <div className="right-sidebar">

        {/* NEED HELP CARD */}

        <div className="support-card">

          <h3>Need Help?</h3>

          <p>
            Our support team is available 24/7
            to assist you.
          </p>

          <button className="support-phone-btn">
            <span>📞</span>
            1800-123-4567
          </button>

          <div className="support-email">
            ✉ support@fixmyride.com
          </div>

        </div>

        {/* SAFETY CARD */}

        <div className="safety-card">

          <div className="safety-header">
            🛡️ <span>Safety First</span>
          </div>

          <ul>
            <li>✓ Share accurate location</li>
            <li>✓ Describe the issue clearly</li>
            <li>✓ Stay safe while waiting</li>
            <li>✓ Our mechanic is on the way</li>
          </ul>

        </div>

      </div>
    </div>
    
  );
};

export default RequestServiceForm;
