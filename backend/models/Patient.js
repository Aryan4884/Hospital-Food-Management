// models/Patient.js
const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  disease: { type: String, required: true },
  allergies: { type: String },
  roomNumber: { type: Number, required: true },
  bedNumber: { type: Number, required: true },
  floorNumber: { type: Number, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  contactInformation: { type: String, required: true },
  emergencyContact: { type: String, required: true },
});

const PatientModel = mongoose.model("Patient", PatientSchema);
module.exports = PatientModel;
