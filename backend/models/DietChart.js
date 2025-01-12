const mongoose = require("mongoose");

const dietChartSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  dietName: { type: String, required: true },
  description: String,
  meals: [
    {
      time: String,
      items: [String],
    },
  ],
});

module.exports = mongoose.model("DietChart", dietChartSchema);
