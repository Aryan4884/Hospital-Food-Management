import React, { useState } from "react";

const AddPatients = ({ onPatientAdded }) => {
  const initialFormData = {
    name: "",
    disease: "",
    allergies: "",
    roomNumber: "",
    bedNumber: "",
    floorNumber: "",
    age: "",
    gender: "",
    contactInformation: "",
    emergencyContact: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior

    try {
      const response = await fetch("http://localhost:5000/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json(); // Parse the JSON response

      console.log("Server Response:", result); // Log the server response

      if (response.ok) {
        alert("Patient added successfully!");
        setFormData(initialFormData); // Reset the form
      } else {
        alert(
          `Error: ${
            result.message || "Failed to add patient. Please try again."
          }`
        );
      }
    } catch (error) {
      console.error("Fetch Error:", error); // Log fetch-related errors
      alert(
        "An error occurred while adding the patient. Please check your connection and try again."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white rounded-lg shadow-lg w-full max-w-md"
      >
        <h1 className="mb-6 text-2xl font-bold text-gray-800">Add Patient</h1>
        {Object.keys(initialFormData).map((field) => (
          <div key={field} className="mb-4">
            <label className="block mb-2 text-gray-600" htmlFor={field}>
              {field
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
            </label>
            <input
              type={
                field.includes("Number") || field === "age" ? "number" : "text"
              }
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required={field !== "allergies"}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
        >
          Add Patient
        </button>
      </form>
    </div>
  );
};

export default AddPatients;
