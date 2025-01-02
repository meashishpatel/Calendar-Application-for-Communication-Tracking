import React, { useEffect, useState } from "react";
import axios from "axios";
import CommunicationModal from "./CommunicationModal";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Dashboard.css";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [overrides, setOverrides] = useState({});
  const [selectedDateLogs, setSelectedDateLogs] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get("/api/user/dashboard");
        setDashboardData(res.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to fetch dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const openModal = (companyId) => setSelectedCompanyId(companyId);
  const closeModal = () => setSelectedCompanyId(null);

  const toggleOverride = (id) => {
    setOverrides((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getCommunicationClass = (communicationDate, id) => {
    if (overrides[id]) return ""; // Disable highlight
    const today = new Date();
    const targetDate = new Date(communicationDate);

    if (targetDate < today) return "overdue";
    if (targetDate.toDateString() === today.toDateString()) return "due-today";
    return "upcoming";
  };

  const handleDateClick = (date) => {
    const clickedDateLogs = dashboardData
      .flatMap((data) =>
        data.lastCommunications.map((comm) => ({
          ...comm,
          companyName: data.companyName,
        }))
      )
      .filter(
        (comm) =>
          new Date(comm.communicationDate).toDateString() ===
          date.toDateString()
      );
    setSelectedDateLogs(clickedDateLogs);
  };

  const LastCommunications = ({ communications, companyName }) => (
    <>
      {communications.length > 0 ? (
        communications.map((log, index) => (
          <div
            key={index}
            className={getCommunicationClass(log.communicationDate, log.id)}
            title={log.description || "No additional description"} // Tooltip with description
          >
            {log.communicationType
              ? `${log.communicationType} on ${new Date(
                  log.communicationDate
                ).toLocaleDateString()}`
              : "No Communication Type"}
            <button
              onClick={() => toggleOverride(log.id)}
              className="override-btn"
            >
              Override Highlight
            </button>
          </div>
        ))
      ) : (
        <div>No Communications Found</div>
      )}
    </>
  );

  const NextCommunication = ({ nextCommunication }) =>
    nextCommunication ? (
      <div
        className={getCommunicationClass(
          nextCommunication.communicationDate,
          nextCommunication.id
        )}
      >
        {nextCommunication.communicationType
          ? `${nextCommunication.communicationType} on ${new Date(
              nextCommunication.communicationDate
            ).toLocaleDateString()}`
          : "No Communication Type"}
      </div>
    ) : (
      "None"
    );

  return (
    <div className="dashboard">
      <h1>User Dashboard</h1>

      <div className="notifications">
        <span className="notification-badge overdue">
          Overdue:{" "}
          {
            dashboardData.filter((data) =>
              data.lastCommunications.some(
                (comm) => new Date(comm.communicationDate) < new Date()
              )
            ).length
          }
        </span>
        <span className="notification-badge due-today">
          Due Today:{" "}
          {
            dashboardData.filter((data) =>
              data.lastCommunications.some(
                (comm) =>
                  new Date(comm.communicationDate).toDateString() ===
                  new Date().toDateString()
              )
            ).length
          }
        </span>
      </div>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Last Five Communications</th>
                <th>Next Scheduled Communication</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.length > 0 ? (
                dashboardData.map((data) => (
                  <tr key={data.companyId}>
                    <td>{data.companyName}</td>
                    <td>
                      <LastCommunications
                        communications={data.lastCommunications}
                        companyName={data.companyName}
                      />
                    </td>
                    <td>
                      <NextCommunication
                        nextCommunication={data.nextCommunication}
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => openModal(data.companyId)}
                        aria-label={`Log communication for ${data.companyName}`}
                      >
                        Log Communication
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="no-data">
                    No data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="calendar-container">
            <h2 className="calendar-title">Communication Calendar</h2>
            <Calendar
              onClickDay={handleDateClick}
              tileContent={({ date }) =>
                dashboardData.some((data) =>
                  data.lastCommunications.some(
                    (comm) =>
                      new Date(comm.communicationDate).toDateString() ===
                      date.toDateString()
                  )
                ) && <div className="calendar-dot"></div>
              }
            />
            <div className="selected-date-logs">
              <h3 className="section-title">Logs for Selected Date</h3>
              {selectedDateLogs.length > 0 ? (
                <div className="log-cards-container">
                  {selectedDateLogs.map((log, index) => (
                    <div className="log-card" key={index}>
                      <h4 className="log-title">{log.communicationType}</h4>
                      <p className="log-company">
                        <strong>Company:</strong> {log.companyName}
                      </p>
                      <p className="log-date">
                        <strong>Date:</strong>{" "}
                        {new Date(log.communicationDate).toLocaleDateString()}
                      </p>
                      {log.notes && (
                        <p className="log-notes">
                          <strong>Notes:</strong> {log.notes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-logs">No logs available for this date.</p>
              )}
            </div>
          </div>
        </>
      )}

      {selectedCompanyId && (
        <CommunicationModal
          companyId={selectedCompanyId}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Dashboard;
