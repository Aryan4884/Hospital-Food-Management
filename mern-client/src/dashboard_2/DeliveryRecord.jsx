import { useState, useEffect } from "react";

const DeliveryRecord = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [notes, setNotes] = useState({}); // Store notes for each delivery by ID

  // Fetch deliveries from the backend
  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const response = await fetch(
          "https://hospital-food-management-backend-my25.onrender.com/deliveries"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch deliveries");
        }
        const data = await response.json();
        setDeliveries(data);
      } catch (error) {
        console.error(error);
        showMessage("error", "Unable to load deliveries.");
      }
    };

    fetchDeliveries();
  }, []);

  // Update delivery status
  const updateDeliveryStatus = async (id, newStatus) => {
    try {
      const response = await fetch(
        `https://hospital-food-management-backend-my25.onrender.com/deliveries/${id}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: newStatus,
            note: newStatus === "Delivered" ? notes[id] : "", // Include note only when status is Delivered
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update delivery status");
      }

      // Update local state
      setDeliveries((prevDeliveries) =>
        prevDeliveries.map((delivery) =>
          delivery._id === id ? { ...delivery, status: newStatus } : delivery
        )
      );

      showMessage("success", `Delivery status updated to "${newStatus}".`);

      // Clear note field for that delivery after successful update
      if (newStatus === "Delivered") {
        setNotes((prevNotes) => {
          const newNotes = { ...prevNotes };
          delete newNotes[id]; // Remove the note for the specific delivery
          return newNotes;
        });
      }
    } catch (error) {
      console.error(error);
      showMessage("error", "Failed to update delivery status.");
    }
  };

  // Show a success or error message
  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  // Handle note change for specific delivery
  const handleNoteChange = (id, value) => {
    setNotes((prevNotes) => ({
      ...prevNotes,
      [id]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Delivery Personnel Dashboard
      </h1>

      {/* Display messages */}
      {message.text && (
        <p
          className={`mb-4 ${
            message.type === "error" ? "text-red-600" : "text-green-600"
          }`}
        >
          {message.text}
        </p>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Personnel</th>
              <th className="px-4 py-2 border">Room Number</th>
              <th className="px-4 py-2 border">Address</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.length > 0 ? (
              deliveries.map((delivery, index) => (
                <tr key={delivery._id} className="text-gray-700">
                  <td className="px-4 py-2 border text-center">{index + 1}</td>
                  <td className="px-4 py-2 border">{delivery.personnelName}</td>
                  <td className="px-4 py-2 border">
                    {delivery.patientDetails?.roomNumber || "N/A"}
                  </td>
                  <td className="px-4 py-2 border">
                    {delivery.deliveryAddress}
                  </td>
                  <td className="px-4 py-2 border">
                    <select
                      value={delivery.status}
                      onChange={(e) =>
                        updateDeliveryStatus(delivery._id, e.target.value)
                      }
                      className="bg-gray-200 text-gray-700 p-2 rounded-md"
                    >
                      <option value="Assigned">Assigned</option>
                      <option value="Picked Up">Picked Up</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {delivery.status !== "Delivered" && (
                      <>
                        <button
                          onClick={() =>
                            updateDeliveryStatus(delivery._id, "Picked Up")
                          }
                          className={`bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 mr-2 ${
                            delivery.status === "Picked Up" ? "opacity-50" : ""
                          }`}
                          disabled={delivery.status === "Picked Up"}
                        >
                          Mark as Picked Up
                        </button>
                        <button
                          onClick={() =>
                            updateDeliveryStatus(delivery._id, "Delivered")
                          }
                          className={`bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 ${
                            delivery.status === "Delivered" ? "opacity-50" : ""
                          }`}
                          disabled={delivery.status === "Delivered"}
                        >
                          Mark as Delivered
                        </button>
                      </>
                    )}

                    {delivery.status === "Delivered" && (
                      <>
                        <textarea
                          value={notes[delivery._id] || ""}
                          onChange={(e) =>
                            handleNoteChange(delivery._id, e.target.value)
                          }
                          placeholder="Enter a note"
                          rows="3"
                          className="w-full p-2 mt-2 border rounded-md"
                        />
                        <button
                          onClick={() =>
                            updateDeliveryStatus(delivery._id, "Delivered")
                          }
                          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                          Submit Note
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center px-4 py-2">
                  No deliveries available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeliveryRecord;
