"use client";
import React, { useState } from "react";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";
import { createSubject } from "@/app/api/data/subjects/subjects";

interface FormSubjectProps {
  onSuccess: () => void; // Tambahkan props callback
}

export default function FormSubject({ onSuccess }: FormSubjectProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setMessageError("");

    if (!name || !description) {
      setMessageError("Name and description are required.");
      return;
    }

    try {
      await createSubject({ name, description });
      setMessage("Subject added successfully!");
      setName('');
      setDescription('');
      onSuccess(); // Panggil callback untuk refresh data
    } catch (error: any) {
      setMessageError(`Error: ${error.message || "Failed to add subject."}`);
    }
  };

  return (
    <div className="w-full relative p-4 bg-white shadow-lg rounded border">
      <h2 className="text-xl font-semibold mb-6">Add Subject</h2>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex flex-wrap justify-start items-start gap-5">
          <div className="mb-4 w-full sm:w-auto">
            <label htmlFor="name" className="block text-base font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter subject name"
            />
          </div>
          <div className="mb-4 w-full sm:w-auto">
            <label htmlFor="description" className="block text-base font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter subject description"
              rows={2}
            ></textarea>
          </div>
        </div>
        {message && <p className="mt-4 text-sm text-green-500">{message}</p>}
        {messageError && <p className="mt-4 text-sm text-red-600">{messageError}</p>}
        <div className="flex justify-center">
          <Button className="my-3" variant="primary" size="md" type="submit">
            Submit Data
          </Button>
        </div>
      </form>
    </div>
  );
}
