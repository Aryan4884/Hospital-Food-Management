import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BASE_URL = "https://hospital-food-management-backend-my25.onrender.com"; // Directly set the base URL here

const PatientDetails = () => {
  const [patients, setPatients] = useState([]); // State to store all patients

  // Fetch all patients when the component mounts
  useEffect(() => {
    fetch(`${BASE_URL}/patients`)
      .then((res) => res.json())
      .then((data) => setPatients(data))
      .catch((error) => console.error("Error fetching patients:", error));
  }, []);

  // Function to handle deleting a patient
  const handleDelete = (id) => {
    fetch(`${BASE_URL}/patients/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Patient deleted successfully!");
        // Optionally, update the patient list after deletion
        setPatients(patients.filter((patient) => patient._id !== id));
      })
      .catch((error) => console.error("Error deleting patient:", error));
  };

  return (
    <div className="px-6 my-12 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="mb-8 text-4xl font-bold text-center text-blue-600">
        Manage Patients
      </h2>

      {/* Header Section */}
      <div className="grid grid-cols-6 gap-4 py-4 bg-blue-600 text-white font-semibold">
        <div className="text-center">No</div>
        <div className="text-center">Patient Name</div>
        <div className="text-center">Age</div>
        <div className="text-center">Gender</div>
        <div className="text-center">Disease</div>
        <div className="text-center">Actions</div>
      </div>

      {/* Patient Data */}
      {patients.map((patient, index) => (
        <div
          key={patient._id}
          className="grid grid-cols-6 gap-4 p-4 bg-white hover:bg-gray-100 transition-all duration-300 border-b"
        >
          <div className="text-center">{index + 1}</div>
          <div className="text-center">{patient.name}</div>
          <div className="text-center">{patient.age}</div>
          <div className="text-center">{patient.gender}</div>
          <div className="text-center">{patient.disease}</div>
          <div className="flex justify-center gap-2">
            <Link
              to={{
                pathname: `/food-manager/dashboard/edit-patient/${patient._id}`,
                state: { patient: patient }, // Pass the patient object here
              }}
              className="px-4 py-2 text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition-all duration-300"
            >
              Edit
            </Link>

            <button
              onClick={() => handleDelete(patient._id)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PatientDetails;
