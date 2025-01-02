import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MethodManagement.css";

const MethodManagement = () => {
  const [methods, setMethods] = useState([]);
  const [newMethod, setNewMethod] = useState({
    type: "",
    description: "",
    sequence: "",
    mandatory: false,
  });
  const [editingMethod, setEditingMethod] = useState(null);

  useEffect(() => {
    axios
      .get("/api/admin/communication-methods")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setMethods(res.data);
        }
      })
      .catch((err) => console.error("Error fetching methods:", err));
  }, []);

  // const addMethod = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       "/api/admin/communication-methods",
  //       newMethod
  //     );
  //     setMethods([...methods, response.data]);
  //     setNewMethod({
  //       type: "",
  //       description: "",
  //       sequence: "",
  //       mandatory: false,
  //     });
  //   } catch (err) {
  //     console.error("Error adding method:", err);
  //   }
  // };

  const addMethod = async (e) => {
    e.preventDefault();
    try {
      // Log the payload for debugging
      // console.log("New Method Payload:", newMethod);

      const response = await axios.post(
        "/api/admin/communication-methods",
        newMethod
      );
      setMethods([...methods, response.data]);
      setNewMethod({
        type: "",
        description: "",
        sequence: "",
        mandatory: false,
      }); // Reset form
    } catch (err) {
      console.error("Error adding method:", err);
    }
  };

  const deleteMethod = async (id) => {
    try {
      await axios.delete(`/api/admin/communication-methods/${id}`);
      setMethods(methods.filter((method) => method._id !== id));
    } catch (err) {
      console.error("Error deleting method:", err);
    }
  };

  const updateMethod = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `/api/admin/communication-methods/${editingMethod._id}`,
        editingMethod
      );
      setMethods(
        methods.map((method) =>
          method._id === editingMethod._id ? response.data : method
        )
      );
      setEditingMethod(null);
    } catch (err) {
      console.error("Error updating method:", err);
    }
  };

  return (
    <div className="method-management">
      <h1>Communication Method Management</h1>

      <h2>Add a New Method</h2>
      <form onSubmit={addMethod} className="method-form">
        <input
          type="text"
          placeholder="Method Type (e.g., Email, Phone)"
          value={newMethod.type}
          onChange={(e) => setNewMethod({ ...newMethod, type: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={newMethod.description}
          onChange={(e) =>
            setNewMethod({ ...newMethod, description: e.target.value })
          }
          required
        />
        <input
          type="number"
          placeholder="Sequence (e.g., 1, 2, 3)"
          value={newMethod.sequence}
          onChange={(e) =>
            setNewMethod({ ...newMethod, sequence: e.target.value })
          }
          required
        />
        <label>
          Mandatory:
          <input
            type="checkbox"
            checked={newMethod.mandatory}
            onChange={(e) =>
              setNewMethod({ ...newMethod, mandatory: e.target.checked })
            }
          />
        </label>
        <button type="submit">Add Method</button>
      </form>

      <h2>Existing Methods</h2>
      <ul className="method-list">
        {methods.map((method) => (
          <li key={method._id} className="method-item">
            {editingMethod && editingMethod._id === method._id ? (
              <form onSubmit={updateMethod} className="edit-form">
                <input
                  type="text"
                  value={editingMethod.type}
                  onChange={(e) =>
                    setEditingMethod({
                      ...editingMethod,
                      type: e.target.value,
                    })
                  }
                  required
                />
                <textarea
                  value={editingMethod.description}
                  onChange={(e) =>
                    setEditingMethod({
                      ...editingMethod,
                      description: e.target.value,
                    })
                  }
                  required
                />
                <input
                  type="number"
                  value={editingMethod.sequence}
                  onChange={(e) =>
                    setEditingMethod({
                      ...editingMethod,
                      sequence: e.target.value,
                    })
                  }
                  required
                />
                <label>
                  Mandatory:
                  <input
                    type="checkbox"
                    checked={editingMethod.mandatory}
                    onChange={(e) =>
                      setEditingMethod({
                        ...editingMethod,
                        mandatory: e.target.checked,
                      })
                    }
                  />
                </label>
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditingMethod(null)}>
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <span className="method-type">{method.type}</span>
                <p className="method-description">{method.description}</p>
                <p className="method-sequence">Sequence: {method.sequence}</p>
                <p className="method-mandatory">
                  Mandatory: {method.mandatory ? "Yes" : "No"}
                </p>
                <button
                  className="edit-button"
                  onClick={() => setEditingMethod(method)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => deleteMethod(method._id)}
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

export default MethodManagement;
