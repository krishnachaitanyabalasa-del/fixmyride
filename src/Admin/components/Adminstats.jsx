import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUsers,
  FaTools,
  FaClipboardList,
  FaRupeeSign,
} from "react-icons/fa";

import "../styles/AdminStats.css";

export default function AdminStats() {
  const token = sessionStorage.getItem("token");

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalMechanics: 0,
    totalRequests: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const [
        usersRes,
        mechanicsRes,
        requestsRes,
        paymentsRes,
      ] = await Promise.all([
        axios.get("https://fixmyride-backend-7jfl.onrender.com/api/users", config),
        axios.get("https://fixmyride-backend-7jfl.onrender.com/api/mechanics/active", config),
        axios.get("https://fixmyride-backend-7jfl.onrender.com/api/requests", config),
        axios.get("https://fixmyride-backend-7jfl.onrender.com/api/payments", config),
      ]);

      const users = usersRes.data || [];
      const mechanics = mechanicsRes.data || [];
      const requests = requestsRes.data || [];
      const payments = paymentsRes.data || [];

      const revenue = payments.reduce(
        (sum, payment) =>
          sum + Number(payment.amount || 0),
        0
      );

      setStats({
        totalUsers: users.length,
        totalMechanics: mechanics.length,
        totalRequests: requests.length,
        totalRevenue: revenue,
      });
    } catch (error) {
      console.error(
        "Failed to fetch dashboard stats",
        error
      );
    }
  };

  return (
    <>
      <div className="dashboard-section-header">
        <h2>Platform Overview</h2>
        <p>Quick insights into users, mechanics, requests and revenue.</p>
      </div>
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="stat-icon users-icon">
            <FaUsers />
          </div>

          <div>
            <h4>Total Users</h4>
            <h2>{stats.totalUsers}</h2>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-icon mechanics-icon">
            <FaTools />
          </div>

          <div>
            <h4>Total Mechanics</h4>
            <h2>{stats.totalMechanics}</h2>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-icon requests-icon">
            <FaClipboardList />
          </div>

          <div>
            <h4>Total Requests</h4>
            <h2>{stats.totalRequests}</h2>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-icon revenue-icon">
            <FaRupeeSign />
          </div>

          <div>
            <h4>Total Revenue</h4>
            <h2>₹{stats.totalRevenue}</h2>
          </div>
        </div>
      </div>
    </>
  );
}
