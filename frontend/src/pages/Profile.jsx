import React, { useState } from "react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    username: "Paramasivan",
    email: "paramasivan@gmail.com",
    avatar: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    console.log(formData);

    // API call here

    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6">
        
        <div className="flex flex-col items-center">
          <img
            src={
              formData.avatar ||
              "https://ui-avatars.com/api/?name=Paramasivan"
            }
            alt="avatar"
            className="w-28 h-28 rounded-full object-cover border"
          />

          {isEditing && (
            <input
              type="text"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              placeholder="Avatar URL"
              className="mt-3 border rounded-lg p-2 w-full"
            />
          )}
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <label className="font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full border rounded-lg p-3 mt-1 ${
                !isEditing
                  ? "bg-gray-100 cursor-not-allowed"
                  : "bg-white"
              }`}
            />
          </div>

          <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full border rounded-lg p-3 mt-1 ${
                !isEditing
                  ? "bg-gray-100 cursor-not-allowed"
                  : "bg-white"
              }`}
            />
          </div>

          <div>
            <label className="font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="********"
              className={`w-full border rounded-lg p-3 mt-1 ${
                !isEditing
                  ? "bg-gray-100 cursor-not-allowed"
                  : "bg-white"
              }`}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-400 text-white px-5 py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-5 py-2 rounded-lg"
              >
                Save Changes
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;