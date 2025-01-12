import MealPreparation from "./MealPreparation";
import AddDeliveryPersonnel from "./AddDeliveryPersonnel";
import MealTracking from "./MealTracking";

const InnerPantryDashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Inner Pantry Dashboard
      </h1>
      <MealPreparation />
    </div>
  );
};

export default InnerPantryDashboard;
