import { useEffect, useState } from "react";

const MealTracking = () => {
  const [deliveries, setDeliveries] = useState([]);

  // Fetch deliveries data from the backend
  const fetchDeliveries = async () => {
    try {
      const response = await fetch("http://localhost:5000/deliveries");
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
            <th className="border border-gray-300 p-2">Patient Name</th>
            <th className="border border-gray-300 p-2">Food Item</th>
            <th className="border border-gray-300 p-2">Task Details</th>
            <th className="border border-gray-300 p-2">Delivery Address</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Timestamp</th>
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
                  {delivery.patientDetails?.name || "N/A"}
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

                {/* Separate Timestamp and Notes into their own columns */}
                <td className="border border-gray-300 p-2">
                  {delivery.notes && delivery.notes.length > 0 ? (
                    <div>
                      {/* Displaying Timestamp */}
                      <div>
                        Timestamp:{" "}
                        {new Date(
                          delivery.notes[0]?.timestamp
                        ).toLocaleString() || "N/A"}
                      </div>
                    </div>
                  ) : (
                    "No Timestamp Available"
                  )}
                </td>

                <td className="border border-gray-300 p-2">
                  {delivery.notes && delivery.notes.length > 0 ? (
                    <div>
                      {/* Displaying Notes */}
                      <div>Note: {delivery.notes[0]?.note || "N/A"}</div>
                    </div>
                  ) : (
                    "No Notes Available"
                  )}
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
