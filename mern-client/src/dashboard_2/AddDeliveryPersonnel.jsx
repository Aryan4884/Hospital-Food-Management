import { useState } from "react";

const AddDeliveryPersonnel = () => {
  const [personnelName, setPersonnelName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const handleAddPersonnel = async (e) => {
    e.preventDefault();
    const newPersonnel = { personnelName, contactInfo, location };

    try {
      const response = await fetch("http://localhost:5000/deliveryPersonnel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPersonnel),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);

        // Reset the form
        setPersonnelName("");
        setContactInfo("");
        setLocation("");
        setError(""); // Clear any existing error
      } else {
        const errorData = await response.json();
        setError(errorData.error || "An error occurred");
      }
    } catch (err) {
      console.error("Error adding personnel:", err);
      setError("An error occurred while adding personnel.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Add Delivery Personnel
      </h1>
      <form
        onSubmit={handleAddPersonnel}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
      >
        <div className="mb-6">
          <label
            htmlFor="personnelName"
            className="block text-gray-700 font-medium mb-2"
          >
            Personnel Name:
          </label>
          <input
            type="text"
            id="personnelName"
            value={personnelName}
            onChange={(e) => setPersonnelName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter personnel name"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="contactInfo"
            className="block text-gray-700 font-medium mb-2"
          >
            Contact Info:
          </label>
          <input
            type="text"
            id="contactInfo"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter contact info"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="location"
            className="block text-gray-700 font-medium mb-2"
          >
            Location:
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter location"
            required
          />
        </div>

        {error && (
          <div className="mb-6 text-red-600 text-sm">
            <p>{error}</p>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
        >
          Add Personnel
        </button>
      </form>
    </div>
  );
};

export default AddDeliveryPersonnel;
