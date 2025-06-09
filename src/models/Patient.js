import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  edad: { type: Number, required: true },
  dni: { type: String, required: true },
  direccion: String,
  telefono: String,
});

const Patient = mongoose.model('Patient', patientSchema);
export default Patient;
