import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

const EditPatient = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams(); // Access the 'id' from the URL
  const [patient, setPatient] = useState(state?.patient || null);
  const [error, setError] = useState(""); // To store any error message

  // Fetch patient data if not passed via state
  useEffect(() => {
    if (!state?.patient) {
      const fetchPatient = async () => {
        const response = await fetch(`http://localhost:5000/patients/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPatient(data);
        } else {
          alert("Patient not found");
        }
      };
      fetchPatient();
    }
  }, [id, state?.patient]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/patients/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patient),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Failed to update patient details");
        throw new Error(errorData.error || "Failed to update patient details");
      }

      const updatedPatient = await response.json();
      console.log("Patient details updated:", updatedPatient);

      // Redirect to the food manager dashboard
      navigate(`/food-manager/dashboard`, { replace: true });
    } catch (error) {
      console.error("Error updating patient details:", error.message);
      setError("An error occurred while updating the patient.");
    }
  };

  // Ensure that patient is not null before rendering form
  if (!patient) return <div>Loading...</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">
        Edit Patient
      </h1>
      <form
        onSubmit={handleSubmit} // Use handleSubmit to handle form submission
        className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg"
      >
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={patient.name}
            onChange={(e) =>
              setPatient((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Disease
          </label>
          <input
            type="text"
            name="disease"
            value={patient.disease}
            onChange={(e) =>
              setPatient((prev) => ({ ...prev, disease: e.target.value }))
            }
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Room Number
          </label>
          <input
            type="text"
            name="roomNumber"
            value={patient.roomNumber}
            onChange={(e) =>
              setPatient((prev) => ({ ...prev, roomNumber: e.target.value }))
            }
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Floor Number
          </label>
          <input
            type="number"
            name="floorNumber"
            value={patient.floorNumber}
            onChange={(e) =>
              setPatient((prev) => ({ ...prev, floorNumber: e.target.value }))
            }
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Allergies
          </label>
          <textarea
            name="allergies"
            value={patient.allergies}
            onChange={(e) =>
              setPatient((prev) => ({ ...prev, allergies: e.target.value }))
            }
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            rows="3"
            placeholder="Enter any allergies (if applicable)"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditPatient;
