const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  personnelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Personnel",
    required: true,
  },
  personnelName: { type: String, required: true },
  mealId: { type: mongoose.Schema.Types.ObjectId, ref: "Meal", required: true },
  foodItem: { type: String, required: true },
  taskDetails: { type: String, required: true },
  patientDetails: {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    roomNumber: { type: String, required: true },
    allergies: { type: String, required: true },
  },
  deliveryDetails: { type: String },
  deliveryAddress: { type: String },
});

const Delivery = mongoose.model("Delivery", deliverySchema);

module.exports = Delivery;
