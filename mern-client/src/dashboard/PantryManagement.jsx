import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PantryManagement = () => {
  const [staffList, setStaffList] = useState([]);
  const [patientList, setPatientList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");
  const [foodItem, setFoodItem] = useState("");
  const [taskDetails, setTaskDetails] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  // Fetch the list of pantry staff
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await fetch("http://localhost:5000/pantryStaff");
        if (response.ok) {
          const data = await response.json();
          setStaffList(data);
        } else {
          console.error("Failed to fetch staff data");
        }
      } catch (err) {
        console.error("Error fetching staff:", err);
      }
    };

    fetchStaff();
  }, []);

  // Fetch the list of patients
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch("http://localhost:5000/patients");
        if (response.ok) {
          const data = await response.json();
          setPatientList(data);
        } else {
          console.error("Failed to fetch patient data");
        }
      } catch (err) {
        console.error("Error fetching patients:", err);
      }
    };

    fetchPatients();
  }, []);

  const handleTaskAssignment = async (e) => {
    e.preventDefault();

    if (!selectedStaff || !selectedPatient || !foodItem || !taskDetails) {
      setError("All fields are required");
      return;
    }

    const selectedPatientData = patientList.find(
      (patient) => patient._id === selectedPatient
    );

    const taskData = {
      staffId: selectedStaff,
      patientId: selectedPatient,
      foodItem,
      taskDetails,
      patientDetails: {
        name: selectedPatientData.name,
        age: selectedPatientData.age,
        roomNumber: selectedPatientData.roomNumber,
        allergies: selectedPatientData.allergies,
      },
    };

    try {
      const response = await fetch("http://localhost:5000/meals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(data.message || "Task assigned successfully");
        setError("");
        setSelectedStaff("");
        setSelectedPatient("");
        setFoodItem("");
        setTaskDetails("");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to assign task");
      }
    } catch (err) {
      console.error("Error assigning task:", err);
      setError("Error connecting to the server");
    }
  };

  const handleAddStaffClick = () => {
    navigate("/food-manager/dashboard/add-staff");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-6">
        Pantry Management
      </h1>
      <form
        onSubmit={handleTaskAssignment}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
      >
        {/* Select Staff */}
        <div className="mb-6">
          <label
            htmlFor="staff"
            className="block text-gray-700 font-medium mb-2"
          >
            Select Staff:
          </label>
          <select
            id="staff"
            value={selectedStaff}
            onChange={(e) => setSelectedStaff(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
            required
          >
            <option value="">-- Select Staff --</option>
            {staffList.map((staff) => (
              <option key={staff._id} value={staff._id}>
                {staff.name} ({staff.location})
              </option>
            ))}
          </select>
        </div>

        {/* Select Patient */}
        <div className="mb-6">
          <label
            htmlFor="patient"
            className="block text-gray-700 font-medium mb-2"
          >
            Select Patient:
          </label>
          <select
            id="patient"
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
            required
          >
            <option value="">-- Select Patient --</option>
            {patientList.map((patient) => (
              <option key={patient._id} value={patient._id}>
                {patient.name} - Room {patient.roomNumber}
              </option>
            ))}
          </select>
        </div>

        {/* Show Patient Details */}
        {selectedPatient && (
          <div className="mb-6 p-4 bg-gray-100 border border-gray-300 rounded-md">
            {(() => {
              const patient = patientList.find(
                (p) => p._id === selectedPatient
              );
              return patient ? (
                <>
                  <p>
                    <strong>Age:</strong> {patient.age}
                  </p>
                  <p>
                    <strong>Room Number:</strong> {patient.roomNumber}
                  </p>
                  <p>
                    <strong>Allergies:</strong> {patient.allergies || "None"}
                  </p>
                </>
              ) : null;
            })()}
          </div>
        )}

        {/* Food Item */}
        <div className="mb-6">
          <label
            htmlFor="foodItem"
            className="block text-gray-700 font-medium mb-2"
          >
            Food Item to be Made:
          </label>
          <input
            type="text"
            id="foodItem"
            value={foodItem}
            onChange={(e) => setFoodItem(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="Enter food item name"
            required
          />
        </div>

        {/* Task Details */}
        <div className="mb-6">
          <label
            htmlFor="taskDetails"
            className="block text-gray-700 font-medium mb-2"
          >
            Task Details:
          </label>
          <textarea
            id="taskDetails"
            value={taskDetails}
            onChange={(e) => setTaskDetails(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="Enter task details"
            required
          ></textarea>
        </div>

        {/* Error and Success Messages */}
        {error && (
          <div className="mb-6 text-red-600 text-sm">
            <p>{error}</p>
          </div>
        )}
        {success && (
          <div className="mb-6 text-green-600 text-sm">
            <p>{success}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition"
        >
          Assign Task
        </button>
      </form>

      {/* Add Staff Button */}
      <button
        onClick={handleAddStaffClick}
        className="fixed bottom-6 right-6 bg-green-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-green-700 transition"
      >
        Add Staff
      </button>
    </div>
  );
};

export default PantryManagement;
