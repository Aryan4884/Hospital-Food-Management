import { useEffect, useState } from "react";

const FoodManagement = () => {
  const [meals, setMeals] = useState([]);

  // Fetch meals data
  const fetchMeals = async () => {
    try {
      const response = await fetch("http://localhost:5000/meals");
      if (!response.ok) {
        throw new Error("Failed to fetch meals");
      }
      const data = await response.json();
      console.log("Fetched meals in Food Management:", data); // Check the structure of data here
      setMeals(data);
    } catch (error) {
      console.error("Error fetching meals:", error.message);
    }
  };

  // Poll every 3 seconds to fetch updated meals data
  useEffect(() => {
    const interval = setInterval(fetchMeals, 3000); // Fetch every 3 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Food Management Dashboard</h2>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Food Item</th>
            <th className="border border-gray-300 p-2">Assigned To</th>
            <th className="border border-gray-300 p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {meals.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center p-4">
                No meals available
              </td>
            </tr>
          ) : (
            meals.map((meal) => (
              <tr key={meal._id} className="text-center">
                <td className="border border-gray-300 p-2">{meal.foodItem}</td>
                <td className="border border-gray-300 p-2">{meal.staffId}</td>
                <td className="border border-gray-300 p-2">
                  {meal.status || "Not Started"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FoodManagement;
