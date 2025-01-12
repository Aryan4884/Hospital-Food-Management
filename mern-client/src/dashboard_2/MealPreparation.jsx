import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const MealPreparation = () => {
  const [meals, setMeals] = useState([]);
  const [patients, setPatients] = useState([]); // Store patient data
  const [error, setError] = useState(""); // Error handling
  const { state } = useLocation(); // Get the state passed via navigate
  const taskData = state?.taskData; // Retrieve forwarded task data

  useEffect(() => {
    // Fetch meals and patients data from the backend
    const fetchMealsAndPatients = async () => {
      try {
        const [mealsResponse, patientsResponse] = await Promise.all([
          fetch("http://localhost:5000/meals"),
          fetch("http://localhost:5000/patients"),
        ]);

        if (!mealsResponse.ok || !patientsResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const mealsData = await mealsResponse.json();
        const patientsData = await patientsResponse.json();

        console.log("Fetched meals:", mealsData);
        console.log("Fetched patients:", patientsData);

        setMeals(mealsData);
        setPatients(patientsData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setError("Failed to load data. Please try again.");
      }
    };

    fetchMealsAndPatients();
  }, []);

  const handleStatusChange = async (id, status) => {
    const updatedMeals = meals.map((meal) =>
      meal._id === id ? { ...meal, status } : meal
    );
    setMeals(updatedMeals);
    setError(""); // Reset error before trying to update

    try {
      const response = await fetch(`http://localhost:5000/meals/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Failed to update meal status");
        throw new Error(errorData.error || "Failed to update meal status");
      }

      const updatedMeal = await response.json();
      console.log("Meal status updated", updatedMeal);
      setMeals((prevMeals) =>
        prevMeals.map((meal) =>
          meal._id === updatedMeal._id ? updatedMeal : meal
        )
      );

      // Pass the patient's details and meal ID to the deliveries database
      const correspondingPatient = patients.find(
        (patient) => patient._id === updatedMeal.patientId
      );
      if (correspondingPatient) {
        await fetch("http://localhost:5000/deliveries", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mealId: id,
            patientDetails: correspondingPatient,
          }),
        });
        console.log(
          "Patient details passed to deliveries:",
          correspondingPatient
        );
      }
    } catch (error) {
      console.error("Error updating meal status:", error.message);
    }
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Meal Preparation Tasks</h2>
      {taskData && (
        <div className="mb-6 p-4 bg-gray-100 border border-gray-300 rounded-md">
          <h3 className="font-semibold">New Task Assigned:</h3>
          <p>
            <strong>Food Item:</strong> {taskData.foodItem}
          </p>
          <p>
            <strong>Assigned To:</strong> {taskData.staffId}
          </p>
          <p>
            <strong>Task Details:</strong> {taskData.taskDetails}
          </p>
        </div>
      )}

      {/* Error message */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Food Item</th>
            <th className="border border-gray-300 p-2">Assigned To</th>
            <th className="border border-gray-300 p-2">Patient Allergy</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {meals.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center p-4">
                No meals available
              </td>
            </tr>
          ) : (
            meals.map((meal) => {
              const correspondingPatient = patients.find(
                (patient) => patient._id === meal.patientId
              );
              return (
                <tr key={meal._id} className="text-center">
                  <td className="border border-gray-300 p-2">
                    {meal.foodItem}
                  </td>
                  <td className="border border-gray-300 p-2">{meal.staffId}</td>
                  <td className="border border-gray-300 p-2">
                    {correspondingPatient?.allergies || "N/A"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {meal.status || "Not Started"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <select
                      value={meal.status || "Not Started"}
                      onChange={(e) =>
                        handleStatusChange(meal._id, e.target.value)
                      }
                      className="border border-gray-300 rounded-md p-1"
                    >
                      <option value="Not Started">Not Started</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Prepared">Prepared</option>
                    </select>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MealPreparation;
