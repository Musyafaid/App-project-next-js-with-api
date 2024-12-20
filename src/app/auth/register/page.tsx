"use client";

import React, { useRef, useState } from "react";
import Notification from "../../components/ui/Notification";
import ImageUploader from "../../components/ui/UploadImage";

export default function Page() {
  const [file, setFile] = useState<File>();
  const ref = useRef<HTMLInputElement>(null);

  const [isNotificationVisible, setNotificationVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");

  const handleShowNotification = () => {
    setNotificationVisible(true);
  };

  const handleCloseNotification = () => {
    setNotificationVisible(false);
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setMessageError("");

    if (!file) {
      setMessageError("Profile picture is required.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", role);
      formData.append("description", description);
      formData.append("profile_picture", file.name);
;
      const res = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        handleShowNotification();
        setMessage(
          `${data.message || "Registration successful,Please Login !"}`
        );

        if (ref.current) {
          ref.current.value = ""; // Reset the file input
        }

        // Reload the page to reset everything, but show the message
        setTimeout(() => {
          window.location.reload(); // Reload the page after 2 seconds
        }, 5000);
      } else {
        const errorData = await res.json();
        if (errorData.errors) {
          const errorMessages = Object.values(errorData.errors)
            .flat()
            .join(", ");
          setMessageError(`Errors: ${errorMessages}`);
        } else {
          setMessageError(`Error: ${errorData || "Something went wrong"}`);
        }
        handleShowNotification();
      }
    } catch (error) {
      setMessageError("Network error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white px-8 py-4 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb- text-center">Register</h2>

        {/* Notification */}
        {isNotificationVisible && (
          <div
            className={`mb-4 h-[65px] p-4 rounded ${
              message
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message || messageError}
            <button
              onClick={handleCloseNotification}
              className="float-right font-bold"
            >
              X
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="flex justify-between gap-4">
            <div>
              <div className="mb-4 h-[65px]">
                <label className="block mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>

              <div className="mb-4 h-[65px]">
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>

              <div className="mb-4 h-[65px]">
                <label className="block mb-2">Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                />
              </div>
            </div>

            <div>
              <div className="mb-4 h-[65px]">
                <label className="block mb-2">Role</label>
                <select
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Select Role</option>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="mb-4 h-[70px]">
                <label className="block mb-2">Description</label>
                <textarea
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Optional description"
                  rows={3}
                />
              </div>

              {/* ImageUploader component */}
            </div>
          </div>

          <ImageUploader setFile={setFile} />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>

      {message && (
        <Notification
          message={message}
          icon="✔️"
          isVisible={isNotificationVisible}
          onClose={handleCloseNotification}
        />
      )}
      {messageError && (
        <Notification
          message={messageError}
          icon="❌"
          isVisible={isNotificationVisible}
          onClose={handleCloseNotification}
        />
      )}
    </div>
  );
}
