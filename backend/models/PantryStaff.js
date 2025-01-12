const mongoose = require("mongoose");

const pantryStaffSchema = new mongoose.Schema({
  staffName: {
    type: String,
    required: [true, "Staff name is required"],
  },
  contactInfo: {
    type: String,
    required: [true, "Contact information is required"],
  },
  location: {
    type: String,
    required: [true, "Location is required"],
  },
});

const PantryStaff = mongoose.model("PantryStaff", pantryStaffSchema);

module.exports = PantryStaff;
