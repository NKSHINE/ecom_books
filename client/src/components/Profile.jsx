import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

function Profile() {
  const [user, setUser] = useState({});
  const [originalUser, setOriginalUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editField, setEditField] = useState("");

  // Password popup state
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/api/profile", { withCredentials: true })
      .then(res => {
        setUser(res.data);
        setOriginalUser(res.data);
      })
      .catch(err => {
        console.error("Failed to fetch profile:", err);
      });
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setUser(originalUser);
    setIsEditing(false);
    setEditField("");
  };

  const handleSave = () => {
    const updateData = {
      full_name: user.full_name,
      email: user.email,
    };

    axios.put("http://localhost:5000/api/profile", updateData, { withCredentials: true })
      .then(() => {
        alert("Profile updated!");
        setOriginalUser(user);
        setIsEditing(false);
        setEditField("");
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to update profile");
      });
  };

  const renderEditableInput = (label, name) => (
    <div className="mb-3 d-flex align-items-center">
      <div style={{ flex: 1 }}>
        <label>{label}</label>
        <input
          type="text"
          className="form-control"
          name={name}
          value={user[name] || ""}
          readOnly={editField !== name}
          onChange={handleChange}
        />
      </div>
      <img
        src="/icons/pen.png"
        alt="edit"
        style={{ cursor: "pointer", marginLeft: "10px", width: "20px", height: "20px" }}
        onClick={() => {
          setEditField(name);
          setIsEditing(true);
        }}
      />
    </div>
  );

  const handleVerifyPassword = () => {
    axios.post("http://localhost:5000/api/auth/verify-password", {
      password: currentPassword
    }, { withCredentials: true }).then(() => {
      setIsVerified(true);
    }).catch(() => {
      alert("Incorrect password");
    });
  };

  const handlePasswordChange = () => {
    axios.put("http://localhost:5000/api/profile", {
      password: newPassword
    }, { withCredentials: true }).then(() => {
      alert("Password updated!");
      setShowPasswordPopup(false);
      setIsVerified(false);
      setCurrentPassword("");
      setNewPassword("");
    }).catch(() => {
      alert("Failed to update password");
    });
  };

  return (
    <div className="d-flex">
      <Sidebar user={user} />
      <div className="container mt-4" style={{ marginLeft: "220px" }}>
        <h2>User Profile</h2>

        {renderEditableInput("Name:", "full_name")}
        {renderEditableInput("Email:", "email")}

        <div className="mb-3">
          <label>Role:</label>
          <input className="form-control" value={user.role || ""} readOnly />
        </div>

        <div className="mb-3">
          <label>Status:</label>
          <input className="form-control" value={user.status || ""} readOnly />
        </div>

        <div className="mb-3">
          <label>Premium:</label>
          <input className="form-control" value={user.is_premium ? "Yes" : "No"} readOnly />
        </div>

        <div className="mb-3">
          <button className="btn btn-link" onClick={() => setShowPasswordPopup(true)}>
            🔒 Edit Password
          </button>
        </div>

        {isEditing && (
          <>
            <button className="btn btn-success me-2" onClick={handleSave}>
              Save
            </button>
            <button className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          </>
        )}

        {/* 🔐 Password Popup */}
        {showPasswordPopup && (
          <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-sm">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Change Password</h5>
                  <button className="btn-close" onClick={() => {
                    setShowPasswordPopup(false);
                    setIsVerified(false);
                    setCurrentPassword("");
                    setNewPassword("");
                  }}></button>
                </div>
                <div className="modal-body">
                  {!isVerified ? (
                    <>
                      <label>Enter Current Password</label>
                      <input
                        type="password"
                        className="form-control"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                      <button className="btn btn-primary mt-2" onClick={handleVerifyPassword}>
                        Verify
                      </button>
                    </>
                  ) : (
                    <>
                      <label>Enter New Password</label>
                      <input
                        type="password"
                        className="form-control"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <button className="btn btn-success mt-2" onClick={handlePasswordChange}>
                        Save New Password
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
