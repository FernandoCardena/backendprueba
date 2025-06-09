import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  nombres: { type: String, required: true },
  apellidos: { type: String, required: true },
  cedula: { type: String, required: true },
  telefono: { type: String, required: true },
  email: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

export default mongoose.model("Patient", patientSchema);