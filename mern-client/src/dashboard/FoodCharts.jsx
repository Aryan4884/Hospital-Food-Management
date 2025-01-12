import { useState, useEffect } from "react";

const FoodCharts = () => {
  const [patients, setPatients] = useState([]); // List of registered patients
  const [selectedPatient, setSelectedPatient] = useState("");
  const [mealPlan, setMealPlan] = useState({
    morning: { meal: "", ingredients: "", instructions: "" },
    evening: { meal: "", ingredients: "", instructions: "" },
    night: { meal: "", ingredients: "", instructions: "" },
  });

  // Fetch patients from the database
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(
          "https://hospital-food-management-backend-my25.onrender.com/patients"
        ); // Replace with your API endpoint
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  // Handle input changes for meal plan
  const handleChange = (e, mealTime, field) => {
    setMealPlan({
      ...mealPlan,
      [mealTime]: {
        ...mealPlan[mealTime],
        [field]: e.target.value,
      },
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPatient) {
      alert("Please select a patient.");
      return;
    }

    const payload = {
      patientId: selectedPatient,
      mealPlan,
    };

    try {
      const response = await fetch(
        "https://hospital-food-management-backend-my25.onrender.com/dietCharts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        alert("Meal plan saved successfully!");
        setMealPlan({
          morning: { meal: "", ingredients: "", instructions: "" },
          evening: { meal: "", ingredients: "", instructions: "" },
          night: { meal: "", ingredients: "", instructions: "" },
        });
      } else {
        alert("Failed to save the meal plan. Please try again.");
      }
    } catch (error) {
      console.error("Error saving meal plan:", error);
      alert("An error occurred while saving the meal plan. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Food/Diet Charts
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-md"
      >
        {/* Patient Dropdown */}
        <div className="mb-4">
          <label
            htmlFor="patient"
            className="block text-sm font-medium text-gray-700"
          >
            Select Patient:
          </label>
          <select
            id="patient"
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">-- Select a Patient --</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name}
              </option>
            ))}
          </select>
        </div>

        {/* Meal Plans */}
        {["morning", "evening", "night"].map((mealTime) => (
          <div key={mealTime} className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 capitalize">
              {mealTime} Meal:
            </h2>
            <input
              type="text"
              placeholder="Meal"
              value={mealPlan[mealTime].meal}
              onChange={(e) => handleChange(e, mealTime, "meal")}
              className="mt-1 mb-2 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <textarea
              placeholder="Ingredients"
              value={mealPlan[mealTime].ingredients}
              onChange={(e) => handleChange(e, mealTime, "ingredients")}
              className="mt-1 mb-2 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <textarea
              placeholder="Instructions (e.g., no salt, low sugar)"
              value={mealPlan[mealTime].instructions}
              onChange={(e) => handleChange(e, mealTime, "instructions")}
              className="mt-1 mb-2 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        ))}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Save Meal Plan
        </button>
      </form>
    </div>
  );
};

export default FoodCharts;
