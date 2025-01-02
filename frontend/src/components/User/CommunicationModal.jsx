import React, { useState } from "react";
import axios from "axios";
import "./CommunicationModal.css";

const CommunicationModal = ({ companyId, onClose }) => {
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure required fields are filled
    if (!type || !date || !companyId) {
      console.error("Missing required fields");
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const payload = {
        companyId, // ID of the company being communicated with
        communicationType: type, // Communication type (LinkedIn Post, Email, etc.)
        communicationDate: date, // Date of communication
        notes, // Optional notes
      };

      console.log("Payload being sent:", payload);

      const response = await axios.post("/api/user/communication", payload);

      console.log("Communication logged successfully:", response.data);

      // Close the modal on success
      onClose();
    } catch (err) {
      console.error("Error logging communication:", err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Log Communication</h2>
        <form onSubmit={handleSubmit}>
          <label>Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">Select</option>
            <option value="LinkedIn Post">LinkedIn Post</option>
            <option value="Email">Email</option>
            <option value="Phone Call">Phone Call</option>
            <option value="Other">Other</option>
          </select>

          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <label>Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any relevant notes (optional)"
          />

          <div className="button-group">
            <button type="submit" className="submit-btn">
              Log Communication
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommunicationModal;
