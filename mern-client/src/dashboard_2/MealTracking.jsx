import { useEffect, useState } from "react";

const MealTracking = () => {
  const [deliveries, setDeliveries] = useState([]);

  // Fetch deliveries data from the backend
  const fetchDeliveries = async () => {
    try {
      const response = await fetch(
        "https://hospital-food-management-backend-my25.onrender.com/deliveries"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch deliveries");
      }
      const data = await response.json();
      console.log("Fetched deliveries:", data); // Debugging
      setDeliveries(data);
    } catch (error) {
      console.error("Error fetching deliveries:", error.message);
    }
  };

  // Poll every 3 seconds to fetch updated delivery data
  useEffect(() => {
    const interval = setInterval(fetchDeliveries, 3000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Meal Tracking Dashboard</h2>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">#</th>
            <th className="border border-gray-300 p-2">Personnel</th>
            <th className="border border-gray-300 p-2">Food Item</th>
            <th className="border border-gray-300 p-2">Task Details</th>
            <th className="border border-gray-300 p-2">Delivery Address</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Timestamp</th>
            <th className="border border-gray-300 p-2">Patient Name</th>
            <th className="border border-gray-300 p-2">Notes</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.length === 0 ? (
            <tr>
              <td colSpan="9" className="text-center p-4">
                No deliveries available
              </td>
            </tr>
          ) : (
            deliveries.map((delivery, index) => (
              <tr key={delivery._id} className="text-center">
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">
                  {delivery.personnelName}
                </td>
                <td className="border border-gray-300 p-2">
                  {delivery.foodItem || "N/A"}
                </td>
                <td className="border border-gray-300 p-2">
                  {delivery.taskDetails || "N/A"}
                </td>
                <td className="border border-gray-300 p-2">
                  {delivery.deliveryAddress}
                </td>
                <td
                  className={`border border-gray-300 p-2 ${
                    delivery.status === "Delivered"
                      ? "text-green-600 font-bold"
                      : delivery.status === "Picked Up"
                      ? "text-yellow-600 font-bold"
                      : "text-gray-600 font-bold"
                  }`}
                >
                  {delivery.status || "Not Started"}
                </td>

                <td className="border border-gray-300 p-2">
                  {delivery.patientDetails.name || "N/A"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MealTracking;
