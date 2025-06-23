import React, { useState } from "react";
import axios from "axios";

function ManageUsersSection({ users, setFetchTrigger }) {
  const [editUser, setEditUser] = useState(null);

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === "is_premium") newValue = value === "true";

    setEditUser((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleUserUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/users/${editUser._id}`, editUser);
      setEditUser(null);
      setFetchTrigger((p) => !p);
    } catch (err) {
      console.error(err);
      alert("Failed to update user");
    }
  };

  const handleUserDelete = async (id) => {
    if (window.confirm("Delete this user?")) {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      setFetchTrigger((p) => !p);
    }
  };

  return (
    <>
      {editUser && (
        <div className="card p-3 mb-4">
          <h5>Edit User</h5>
          <div className="row">
            <div className="col-md-3">
              <label className="form-label">Name: </label>
              <input
                type="text"
                name="full_name"
                className="form-control"
                value={editUser.full_name}
                onChange={handleUserChange}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={editUser.email}
                onChange={handleUserChange}
              />
            </div>
            <div className="col-md-2">
              <label className="form-label">Premium</label>
              <select
                name="is_premium"
                className="form-control"
                value={editUser.is_premium ? "true" : "false"}
                onChange={handleUserChange}
              >
                <option value="false">Not Premium</option>
                <option value="true">Premium</option>
              </select>
            </div>
            <div className="col-md-2">
              <label className="form-label">Role</label>
              <select
                name="role"
                className="form-control"
                value={editUser.role}
                onChange={handleUserChange}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="col-md-2">
              <label className="form-label">Status</label>
              <select
                name="status"
                className="form-control"
                value={editUser.status}
                onChange={handleUserChange}
              >
                <option value="active">Active</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>
            <div className="col-12 mt-2">
              <button className="btn btn-success" onClick={handleUserUpdate}>
                Update
              </button>
              <button className="btn btn-secondary ms-2" onClick={() => setEditUser(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <table className="table table-bordered mt-4">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Premium</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
         {users?.map((user) => (
            <tr key={user._id}>
              <td>{user.full_name}</td>
              <td>{user.email}</td>
              <td>{user.is_premium ? "Yes" : "No"}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => setEditUser(user)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleUserDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ManageUsersSection;
