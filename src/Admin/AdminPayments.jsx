import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "./components/AdminHeader";
import "./styles/AdminPayments.css";
import { useNavigate } from "react-router-dom";

export default function AdminPayments() {

  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const navigate=useNavigate();

  const fetchPayments = async () => {
    try {

      const token = sessionStorage.getItem("token");

      const response = await axios.get(
        "https://fixmyride-backend-7jfl.onrender.com/api/payments",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setPayments(response.data);
      setFilteredPayments(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const username = sessionStorage.getItem("username");

    if (!token || !username) {
      navigate("/login-admin");
      return;
    }

    fetchPayments();
  }, []);

  useEffect(() => {

    const filtered = payments.filter((payment) => {

      const matchesSearch =
        String(payment.payment_id).includes(searchTerm) ||
        String(payment.requestId).includes(searchTerm) ||
        payment.transaction_id
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" ||
        payment.payment_status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    setFilteredPayments(filtered);

  }, [payments, searchTerm, statusFilter]);

  const totalPayments = payments.length;

  const paidCount =
    payments.filter(
      (payment) =>
        payment.payment_status === "Paid"
    ).length;

  const pendingCount =
    payments.filter(
      (payment) =>
        payment.payment_status === "Pending"
    ).length;

  const failedCount =
    payments.filter(
      (payment) =>
        payment.payment_status === "Failed"
    ).length;

  const totalRevenue =
    payments
      .filter(
        (payment) =>
          payment.payment_status === "Paid"
      )
      .reduce(
        (sum, payment) =>
          sum + payment.amount,
        0
      );

  return (
    <>
      <AdminHeader />

      <div className="admin-payments-page">

        <div className="admin-payments-header">

          <h1>Payment Management</h1>

          <p>
            Track and monitor all payment
            transactions across the platform.
          </p>

        </div>

        {/* Stats */}

        <div className="admin-payments-stats">

          <div className="payment-stat-card">
            <h2>{totalPayments}</h2>
            <p>Total Payments</p>
          </div>

          <div className="payment-stat-card paid">
            <h2>{paidCount}</h2>
            <p>Paid</p>
          </div>

          <div className="payment-stat-card pending">
            <h2>{pendingCount}</h2>
            <p>Pending</p>
          </div>

          <div className="payment-stat-card failed">
            <h2>{failedCount}</h2>
            <p>Failed</p>
          </div>

          <div className="payment-stat-card revenue">
            <h2>₹{totalRevenue}</h2>
            <p>Total Revenue</p>
          </div>

        </div>

        {/* Search */}

        <div className="admin-payments-filters">

          <input
            type="text"
            placeholder="Search Payment ID, Request ID, Transaction ID"
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >

            <option value="ALL">
              All Status
            </option>

            <option value="Paid">
              Paid
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Failed">
              Failed
            </option>

          </select>

        </div>

        {/* Table */}

        <div className="admin-payments-table-card">

          <div className="admin-payments-table-header">

            <h3>
              Payment Transactions (
              {filteredPayments.length}
              )
            </h3>

          </div>

          <div className="admin-payments-table-responsive">

            <table>

              <thead>
                <tr>
                  <th>Payment ID</th>
                  <th>Request ID</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Transaction ID</th>
                  <th>Status</th>
                  <th>Timestamp</th>
                </tr>
              </thead>

              <tbody>

                {filteredPayments.map(
                  (payment) => (
                    <tr
                      key={
                        payment.payment_id
                      }
                    >

                      <td>
                        #
                        {
                          payment.payment_id
                        }
                      </td>

                      <td>
                        #
                        {
                          payment.requestId
                        }
                      </td>

                      <td>
                        ₹
                        {payment.amount}
                      </td>

                      <td>
                        {
                          payment.payment_method
                        }
                      </td>

                      <td>
                        {
                          payment.transaction_id
                        }
                      </td>

                      <td>
                        {
                          payment.payment_status
                        }
                      </td>

                      <td>
                        {
                          payment.timestamp
                        }
                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </>
  );
}
