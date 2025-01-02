import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For navigation
import "./CompanyManagement.css"; // Include for custom styles

const CompanyManagement = () => {
  const [companies, setCompanies] = useState([]);
  const [newCompany, setNewCompany] = useState({
    name: "",
    location: "",
    linkedin: "",
    emails: "",
    phones: "",
    comments: "",
    communicationPeriodicity: "2 weeks",
  });
  const [editingCompany, setEditingCompany] = useState(null); // State for editing
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    axios
      .get("/api/admin/companies")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setCompanies(res.data);
        }
      })
      .catch((err) => console.error("Error fetching companies:", err));
  }, []);

  const addCompany = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/admin/companies", newCompany);
      setCompanies([...companies, response.data]);
      setNewCompany({
        name: "",
        location: "",
        linkedin: "",
        emails: "",
        phones: "",
        comments: "",
        communicationPeriodicity: "2 weeks",
      }); // Reset form
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCompany = async (id) => {
    try {
      await axios.delete(`/api/admin/companies/${id}`);
      setCompanies(companies.filter((company) => company._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const startEditingCompany = (company) => {
    setEditingCompany(company);
  };

  const updateCompany = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `/api/admin/companies/${editingCompany._id}`,
        editingCompany
      );
      setCompanies(
        companies.map((company) =>
          company._id === editingCompany._id ? response.data : company
        )
      );
      setEditingCompany(null); // Close the editing form
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="company-management">
      <h1 className="management-title">Company Management Dashboard</h1>
      <button
        className="method-management-button"
        onClick={() => navigate("/method-management")}
      >
        Manage Communication Methods
      </button>
      <h2>Add a New Company</h2>
      <form onSubmit={addCompany} className="company-form">
        <input
          placeholder="Name"
          value={newCompany.name}
          onChange={(e) =>
            setNewCompany({ ...newCompany, name: e.target.value })
          }
        />
        <input
          placeholder="Location"
          value={newCompany.location}
          onChange={(e) =>
            setNewCompany({ ...newCompany, location: e.target.value })
          }
        />
        <input
          placeholder="LinkedIn"
          value={newCompany.linkedin}
          onChange={(e) =>
            setNewCompany({ ...newCompany, linkedin: e.target.value })
          }
        />
        <input
          placeholder="Emails"
          value={newCompany.emails}
          onChange={(e) =>
            setNewCompany({ ...newCompany, emails: e.target.value.split(",") })
          }
        />
        <input
          placeholder="Phones"
          value={newCompany.phones}
          onChange={(e) =>
            setNewCompany({ ...newCompany, phones: e.target.value.split(",") })
          }
        />
        <input
          placeholder="Communication Periodicity (e.g., '2 weeks')"
          value={newCompany.communicationPeriodicity}
          onChange={(e) =>
            setNewCompany({
              ...newCompany,
              communicationPeriodicity: e.target.value,
            })
          }
        />
        <textarea
          placeholder="Comments"
          value={newCompany.comments}
          onChange={(e) =>
            setNewCompany({ ...newCompany, comments: e.target.value })
          }
        ></textarea>

        <button type="submit">Add Company</button>
      </form>
      <h2>Existing Companies</h2>
      <ul className="company-list">
        {companies.map((company) => (
          <li key={company._id} className="company-item">
            {editingCompany && editingCompany._id === company._id ? (
              <form onSubmit={updateCompany} className="edit-form">
                <input
                  value={editingCompany.name}
                  onChange={(e) =>
                    setEditingCompany({
                      ...editingCompany,
                      name: e.target.value,
                    })
                  }
                  placeholder="Name"
                />
                <input
                  value={editingCompany.location}
                  onChange={(e) =>
                    setEditingCompany({
                      ...editingCompany,
                      location: e.target.value,
                    })
                  }
                  placeholder="Location"
                />
                <input
                  value={editingCompany.linkedin}
                  onChange={(e) =>
                    setEditingCompany({
                      ...editingCompany,
                      linkedin: e.target.value,
                    })
                  }
                  placeholder="LinkedIn"
                />
                <input
                  value={editingCompany.emails.join(",")}
                  onChange={(e) =>
                    setEditingCompany({
                      ...editingCompany,
                      emails: e.target.value.split(","),
                    })
                  }
                  placeholder="Emails (comma-separated)"
                />
                <input
                  value={editingCompany.phones.join(",")}
                  onChange={(e) =>
                    setEditingCompany({
                      ...editingCompany,
                      phones: e.target.value.split(","),
                    })
                  }
                  placeholder="Phones (comma-separated)"
                />
                <input
                  value={editingCompany.communicationPeriodicity}
                  onChange={(e) =>
                    setEditingCompany({
                      ...editingCompany,
                      communicationPeriodicity: e.target.value,
                    })
                  }
                  placeholder="Communication Periodicity"
                />
                <textarea
                  value={editingCompany.comments}
                  onChange={(e) =>
                    setEditingCompany({
                      ...editingCompany,
                      comments: e.target.value,
                    })
                  }
                  placeholder="Comments"
                ></textarea>
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditingCompany(null)}>
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <span className="company-name">{company.name}</span>
                <button
                  className="edit-button"
                  onClick={() => startEditingCompany(company)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => deleteCompany(company._id)}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyManagement;
