const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema(
  {
    foodItem: String,
    staffId: String,
    status: {
      type: String,
      enum: ["Not Started", "In Progress", "Prepared"],
      default: "Not Started",
    },
  },
  { collection: "mealCollection" } // Explicitly specify the collection name
);

const Meal = mongoose.model("Meal", mealSchema);

module.exports = Meal;
