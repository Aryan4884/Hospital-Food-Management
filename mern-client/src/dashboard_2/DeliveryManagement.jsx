import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DeliveryManagement = () => {
  const [deliveryPersonnelList, setDeliveryPersonnelList] = useState([]);
  const [preparedOrders, setPreparedOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState("");
  const [selectedPersonnel, setSelectedPersonnel] = useState("");
  const [deliveryDetails, setDeliveryDetails] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  // Fetch delivery personnel
  useEffect(() => {
    const fetchDeliveryPersonnel = async () => {
      try {
        const response = await fetch(
          "https://hospital-food-management-backend-my25.onrender.com/deliveryPersonnel"
        );
        if (response.ok) {
          const data = await response.json();
          setDeliveryPersonnelList(data);
        } else {
          console.error("Failed to fetch delivery personnel");
        }
      } catch (err) {
        console.error("Error fetching personnel:", err);
      }
    };

    fetchDeliveryPersonnel();
  }, []);

  // Fetch prepared orders
  useEffect(() => {
    const fetchPreparedOrders = async () => {
      try {
        const response = await fetch(
          "https://hospital-food-management-backend-my25.onrender.com/meals"
        );
        if (response.ok) {
          const data = await response.json();
          const preparedOrders = data.filter(
            (order) => order.status === "Prepared"
          );
          console.log("Filtered Prepared Orders:", preparedOrders); // Debugging log
          setPreparedOrders(preparedOrders);
        } else {
          console.error("Failed to fetch prepared orders");
        }
      } catch (err) {
        console.error("Error fetching prepared orders:", err);
      }
    };

    fetchPreparedOrders();
  }, []);

  const handleTaskAssignment = async (e) => {
    e.preventDefault();

    // Find the selected order object
    const mealDetails = preparedOrders.find(
      (meal) => meal._id === selectedOrder
    );

    // Find the selected personnel object
    const selectedPersonnelObj = deliveryPersonnelList.find(
      (personnel) => personnel._id === selectedPersonnel
    );

    // Validate data
    if (!mealDetails || !selectedPersonnelObj) {
      setError("Invalid order or personnel selection. Please try again.");
      return;
    }

    // Ensure patientDetails exists and contains all required properties
    const patientDetails = mealDetails.patientDetails || {};
    const { name, age, roomNumber, allergies } = patientDetails;

    if (!name || !age || !roomNumber || !allergies) {
      setError("Incomplete patient details in the selected meal.");
      return;
    }

    // Create delivery task payload
    const deliveryData = {
      personnelId: selectedPersonnelObj._id,
      personnelName: selectedPersonnelObj.personnelName,
      mealId: mealDetails._id,
      foodItem: mealDetails.foodItem,
      taskDetails: mealDetails.taskDetails,
      patientDetails: {
        name,
        age,
        roomNumber,
        allergies,
      },
      deliveryDetails,
      deliveryAddress,
    };

    try {
      const response = await fetch(
        "https://hospital-food-management-backend-my25.onrender.com/deliveries",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(deliveryData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSuccess(data.message || "Delivery task assigned successfully.");
        setError(""); // Clear any previous errors
        setSelectedPersonnel("");
        setSelectedOrder("");
        setDeliveryDetails("");
        setDeliveryAddress("");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to assign delivery task.");
      }
    } catch (err) {
      console.error("Error assigning delivery task:", err);
      setError("Error connecting to the server.");
    }
  };

  const handleAddPersonnelClick = () => {
    navigate("/inner-pantry/dashboard/add-delivery-personnel");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Delivery Management
      </h1>
      <form onSubmit={handleTaskAssignment}>
        {/* Select Prepared Order */}
        <div className="mb-6">
          <label
            htmlFor="preparedOrder"
            className="block text-gray-700 font-medium mb-2"
          >
            Select Prepared Order:
          </label>
          <select
            id="preparedOrder"
            value={selectedOrder}
            onChange={(e) => setSelectedOrder(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          >
            <option value="">-- Select Prepared Order --</option>
            {preparedOrders.map((order) => (
              <option key={order._id} value={order._id}>
                {order.foodItem} - {order.patientDetails?.name || "No Name"} -{" "}
                Allergy: {order.patientDetails?.allergies || "None"}
              </option>
            ))}
          </select>
        </div>

        {/* Select Delivery Personnel */}
        <div className="mb-6">
          <label
            htmlFor="deliveryPersonnel"
            className="block text-gray-700 font-medium mb-2"
          >
            Select Delivery Personnel:
          </label>
          <select
            id="deliveryPersonnel"
            value={selectedPersonnel}
            onChange={(e) => setSelectedPersonnel(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          >
            <option value="">-- Select Personnel Name --</option>
            {deliveryPersonnelList.map((personnel) => (
              <option key={personnel._id} value={personnel._id}>
                {personnel.personnelName}
              </option>
            ))}
          </select>
        </div>

        {/* Delivery Details */}
        <div className="mb-6">
          <label
            htmlFor="deliveryDetails"
            className="block text-gray-700 font-medium mb-2"
          >
            Delivery Details:
          </label>
          <textarea
            id="deliveryDetails"
            value={deliveryDetails}
            onChange={(e) => setDeliveryDetails(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter delivery details"
            required
          ></textarea>
        </div>

        {/* Delivery Address */}
        <div className="mb-6">
          <label
            htmlFor="deliveryAddress"
            className="block text-gray-700 font-medium mb-2"
          >
            Delivery Address:
          </label>
          <input
            type="text"
            id="deliveryAddress"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter delivery address"
            required
          />
        </div>

        {/* Error and Success Messages */}
        {error && (
          <div className="mb-4 text-red-600 text-sm">
            <p>{error}</p>
          </div>
        )}
        {success && (
          <div className="mb-4 text-green-600 text-sm">
            <p>{success}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
        >
          Assign Delivery Task
        </button>
      </form>

      {/* Floating Button to Add Personnel */}
      <button
        onClick={handleAddPersonnelClick}
        className="fixed bottom-6 right-6 bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        Add Personnel
      </button>
    </div>
  );
};

export default DeliveryManagement;
