import React from "react";
import {
  FaUsers,
  FaTools,
  FaClipboardList,
  FaMoneyBillWave,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import "../styles/QuickActions.css";

export default function AdminQuickActions() {
  const navigate = useNavigate();
  return (
    <>
      <div className="dashboard-section-header">
        <h2>Quick Actions</h2>
        <p>Frequently used administrative operations.</p>
      </div>
      <div className="admin-quick-actions">
        <div className="quick-action-card">
          <div className="quick-action-icon users">          
            <FaUsers />
          </div>

          <h3>Manage Users</h3>

          <p>
            View and manage all registered users.
          </p>

          <button
            onClick={() =>{
              navigate("/admin-users")
            }}
          >Open</button>
        </div>

        <div className="quick-action-card">
          <div className="quick-action-icon mechanics">
            <FaTools />
          </div>

          <h3>Manage Mechanics</h3>

          <p>
            Review and manage mechanic accounts.
          </p>

          <button
            onClick={() =>{
              navigate("/admin-mechanics")
            }}
          >Open</button>
        </div>

        <div className="quick-action-card">
          <div className="quick-action-icon requests">
            <FaClipboardList />
          </div>

          <h3>View Requests</h3>

          <p>
            Monitor all service requests instantly.
          </p>

          <button
            onClick={() =>{
              navigate("/admin-requests")
            }}
          >Open</button>
        </div>

        <div className="quick-action-card">
          <div className="quick-action-icon payments">
            <FaMoneyBillWave />
          </div>

          <h3>Payment Reports</h3>

          <p>
            Track revenue and payment history.
          </p>

          <button
            onClick={() =>{
              navigate("/admin-payments")
            }}
          >Open</button>
        </div>
      </div>
    </>
  );
}
