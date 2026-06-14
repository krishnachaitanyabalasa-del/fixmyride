import React, { useState } from "react";
import axios from "axios";

import "../styles/ChangeRequestStatusModal.css";

export default function ChangeRequestStatusModal({
  job,
  onClose,
  onSuccess,
}) {
  const [status, setStatus] =useState(job.status);

  const [amount, setAmount] = useState(job.amount || "");

  const [loading, setLoading] =useState(false);

 const handleUpdate = async () => {

  try {

    if (
      status === "In Progress" &&
      (!amount || amount <= 0)
    ) {
      alert("Please enter a valid amount");
      return;
    }

    setLoading(true);

    const token =
      sessionStorage.getItem("token");

    const updatedRequest = {
      ...job,
      status,
    };
    
    // When moved to In Progress
    if (status === "In Progress") {

      updatedRequest.amount =
        parseFloat(amount);

    }

    // When moved to Completed
    if (status === "Completed") {

      updatedRequest.payment_status =
        "Paid";

    }

    // When moved back to Pending
    if (status === "Pending") {

      updatedRequest.assigned_mechanic_id =
        null;

    }

    await axios.put(
      `https://fixmyride-backend-7jfl.onrender.com/api/requests/${job.request_id}`,
      updatedRequest,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
          "Content-Type":
            "application/json",
        },
      }
    );

    onSuccess();

  } catch (error) {

    console.error(error);

  } finally {

    setLoading(false);

  }
};

  return (
    <div className="changeStatusModal-overlay">
      <div className="changeStatusModal-box">
        <button
          className="changeStatusModal-closeBtn"
          onClick={onClose}
        >
          ✕
        </button>

        <h2>
          Change Request Status
        </h2>

        <div className="changeStatusModal-field">
          <label>Status</label>

          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value
              )
            }
          >
            

            <option value="Assigned">
              Assigned
            </option>

            <option value="In Progress">
              In Progress
            </option>

            <option value="Completed">
              Completed
            </option>
            <option value="Pending">
              Cancel
            </option>

          
          </select>
        </div>

        {status === "In Progress" && (
          <div className="changeStatusModal-field">

            <label>
              Service Amount
            </label>

            <input
              type="number"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value)
              }
            />

          </div>
        )}

        <div className="changeStatusModal-actions">
          <button
            className="changeStatusModal-updateBtn"
            onClick={
              handleUpdate
            }
            disabled={loading}
          >
            {loading
              ? "Updating..."
              : "Update"}
          </button>

          <button
            className="changeStatusModal-cancelBtn"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
