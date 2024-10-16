import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../App";
import "./style.css";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const {
    token,
    setToken,
    setMsg,
    isLoading,
    setIsLoading,
    error,
    setError,
    userName,
    setUserName,
  } = useContext(AppContext);

  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    address: "",
    role: "",
    accountStatus: "",
    profilePicture: "",
    socialMedia: "",
    bio: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("You must be logged in to view this page.");
      setIsLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(res.data.user);
        console.log("User Data: ", res.data.user);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setMsg("Failed to load user data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [token, setMsg, setIsLoading, setError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log("Updated userData:", userData);
  };

  const handleSubmitProfile = async (e) => {
    e.preventDefault();
    try {
      console.log("Form Data Submitted: ", userData);
      const res = await axios.put(
        "http://localhost:5000/users/profile",
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMsg("Profile updated successfully");
      console.log("Response: ", res);
      setUserName(res.data.user.userName);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      setMsg("Failed to update profile");
    }
  };

  if (isLoading) {
    return <p>Loading user data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container profile-container mt-4">
      <h2 className="profile-title">User Profile</h2>
      {!isEditing ? (
        <div className="profile-details">
          <p>
            <strong>Username:</strong> {userData.userName}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Address:</strong> {userData.address || "Not provided"}
          </p>
          <p>
            <strong>Role:</strong>{" "}
            {userData.role.roleName === "ADMIN" ? "Admin" : "User"}
          </p>
          <p>
            <strong>Account Status:</strong>{" "}
            {userData.accountStatus || "Active"}
          </p>
          <p>
            <strong>Social Media Link:</strong>{" "}
            {userData.socialMedia || "Not provided"}
          </p>
          <p>
            <strong>Bio:</strong> {userData.bio || "Not provided"}
          </p>
          <img
            src={userData.profilePicture}
            alt="Profile"
            className="profile-picture"
          />
          <button
            className="btn btn-secondary edit-profile-btn"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <div className="container profile-edit-container mt-4">
          <form onSubmit={handleSubmitProfile} className="profile-edit-form">
            <div className="form-group mb-3">
              <label htmlFor="profilePicture">Profile Picture URL:</label>
              <input
                type="text"
                id="profilePicture"
                name="profilePicture"
                value={userData.profilePicture}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter image URL"
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="userName">Username:</label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={userData.userName}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={userData.address}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="socialMedia">Social Media Link:</label>
              <input
                type="url"
                id="socialMedia"
                name="socialMedia"
                value={userData.socialMedia}
                onChange={handleChange}
                className="form-control"
                placeholder="https://socialMedia.com/in/username"
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="bio">Bio:</label>
              <textarea
                id="bio"
                name="bio"
                value={userData.bio}
                onChange={handleChange}
                className="form-control"
                rows="3"
                placeholder="Tell us something about yourself..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-primary profile-submit-btn"
            >
              Save Profile Changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
