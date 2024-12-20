"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/app/api/auth/login";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setMessageError("");

    if (!email || !password) {
      setMessageError("Email and password are required.");
      return;
    }

    try {
      const data = await login({ email, password });
      setMessage(data.message || "Welcome!");
      router.push("/dashboard"); 
    } catch (error: any) {
      setMessageError(`Error: ${error.message}`);
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-100 flex items-center">
      <form
        onSubmit={handleSubmit}
        className="w-4/12 mx-auto p-6 bg-white shadow-lg rounded-lg"
      >
        <h1 className="text-xl font-semibold text-gray-700">Login</h1>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit
        </button>
        {message && <p className="mt-4 text-sm text-green-500">{message}</p>}
        {messageError && (
          <p className="mt-4 text-sm text-red-600">{messageError}</p>
        )}
      </form>
    </div>
  );
}
