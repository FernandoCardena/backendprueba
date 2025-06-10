import Patient from "../models/patient.js";
import { patientSchema } from "../validators/patientValidator.js";

// Crear paciente
export const createPatient = async (req, res) => {
  // Validar datos usando Joi
  const { error } = patientSchema.validate(req.body);
  if (error) return res.status(400).json({ error: "Faltan campos requeridos" });

  try {
    // Asignar el usuario autenticado desde req.userId (token JWT)
    const paciente = new Patient({
      ...req.body,
      user: req.userId
    });
    await paciente.save();
    res.status(201).json({ msg: "Paciente creado correctamente", patient: paciente });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
