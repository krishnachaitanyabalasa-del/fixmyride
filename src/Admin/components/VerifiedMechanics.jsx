import React from "react";
import { FaEye } from "react-icons/fa";

import "../styles/VerifiedMechanics.css";
export default function VerifiedMechanics({
  verifiedMechanics,
  handleView,
}) {
  return (
    <div className="mechanics-table-card">
      <div className="mechanics-table-header">
        <h3>
          Verified Mechanics (
          {verifiedMechanics.length})
        </h3>
      </div>

      <div className="mechanics-table-responsive">
        <table>
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Username</th>
              <th>Phone Number</th>
              <th>Skills</th>
              <th>Experience</th>
              <th>Service Radius</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {verifiedMechanics.length > 0 ? (
              verifiedMechanics.map(
                (mechanic) => (
                  <tr key={mechanic.username}>
                    <td>
                      <div className="verified-mechanic-avatar">
                        {mechanic.username
                          ?.charAt(0)
                          ?.toUpperCase()}
                      </div>
                    </td>

                    <td>{mechanic.username}</td>

                    <td>
                      {mechanic.phone_number}
                    </td>

                    <td>{mechanic.skills}</td>

                    <td>
                      {
                        mechanic.experience_years
                      }{" "}
                      Years
                    </td>

                    <td>
                      {
                        mechanic.service_radius_km
                      }{" "}
                      KM
                    </td>

                    <td>
                      <button
                        className="mechanic-view-btn"
                        onClick={() =>
                          handleView(mechanic)
                        }
                      >
                        <FaEye />
                        View
                      </button>
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="no-mechanics"
                >
                  No verified mechanics found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
