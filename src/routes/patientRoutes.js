import express from "express";
import Patient from "../models/Patient.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

// Crear paciente
router.post("/", verifyToken, async (req, res) => {
  try {
    const { nombres, apellidos, cedula, telefono, email } = req.body;
    const user = req.userId;

    // Evitar duplicados para este usuario
    const pacienteExistente = await Patient.findOne({ cedula, user });
    if (pacienteExistente) {
      return res.status(400).json({ message: "Ese paciente ya existe para este usuario." });
    }

    const nuevoPaciente = new Patient({ nombres, apellidos, cedula, telefono, email, user });
    await nuevoPaciente.save();
    res.status(201).json(nuevoPaciente);
  } catch (error) {
    res.status(500).json({ message: "Error al crear paciente.", error: error.message });
  }
});

// Listar pacientes del usuario autenticado
router.get("/", verifyToken, async (req, res) => {
  try {
    const pacientes = await Patient.find({ user: req.userId });
    res.json(pacientes);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener pacientes.", error: error.message });
  }
});

// Editar paciente
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const paciente = await Patient.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!paciente) return res.status(404).json({ message: "Paciente no encontrado." });
    res.json(paciente);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar paciente.", error: error.message });
  }
});

// Borrar paciente
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deleted = await Patient.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!deleted) return res.status(404).json({ message: "Paciente no encontrado." });
    res.json({ message: "Paciente eliminado." });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar paciente.", error: error.message });
  }
});

export default router;