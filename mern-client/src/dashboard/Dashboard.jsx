import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PatientDetails from "./PatientDetails";

const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch("http://localhost:5000/patients");
        if (!response.ok) {
          throw new Error("Failed to fetch patients.");
        }
        const data = await response.json();
        setPatients(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="relative min-h-screen bg-gray-100 p-6">
      <PatientDetails patients={patients} />
      <Link
        to="/food-manager/dashboard/add-patients"
        className="fixed bottom-5 right-5 flex items-center justify-center w-14 h-14 bg-blue-500 text-white rounded-full text-2xl shadow-lg hover:bg-blue-600"
      >
        +
      </Link>
    </div>
  );
};

export default Dashboard;
