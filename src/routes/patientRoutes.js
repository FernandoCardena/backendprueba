import express from 'express';
import Patient from '../models/patient.js';
import { patientSchema, patientEditSchema } from '../validators/patientValidator.js';

const router = express.Router();

// ---- Listar todos los pacientes ----
router.get('/', async (req, res) => {
  try {
    const pacientes = await Patient.find({ user: req.userId });
    res.json(pacientes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---- Obtener un paciente por ID ----
router.get('/:id', async (req, res) => {
  try {
    const patient = await Patient.findOne({ _id: req.params.id, user: req.userId });
    if (!patient) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: 'ID inválido o error del servidor' });
  }
});

// ---- Actualizar un paciente (flexible) ----
router.put('/:id', async (req, res) => {
  // Validar datos usando el esquema flexible
  const { error } = patientEditSchema.validate(req.body);
  if (error) return res.status(400).json({ error: 'Datos inválidos para editar' });

  try {
    const updatedPatient = await Patient.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!updatedPatient) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }
    res.json({ msg: 'Paciente actualizado correctamente', patient: updatedPatient });
  } catch (err) {
    res.status(500).json({ error: 'ID inválido o error del servidor' });
  }
});

// ---- Eliminar un paciente ----
router.delete('/:id', async (req, res) => {
  try {
    const deletedPatient = await Patient.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!deletedPatient) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }
    res.json({ msg: 'Paciente eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'ID inválido o error del servidor' });
  }
});

// ---- RUTA PARA CREAR PACIENTE ----
router.post('/', async (req, res) => {
  const { error } = patientSchema.validate(req.body);
  if (error) return res.status(400).json({ error: 'Faltan campos requeridos' });

  try {
    const paciente = new Patient({
      ...req.body,
      user: req.userId
    });
    await paciente.save();

    res.status(201).json({ msg: 'Paciente creado correctamente', patient: paciente });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---- Ruta para asociar archivo a paciente ----
router.post('/:id/file', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL de archivo requerida' });

    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      { $push: { archivos: url } },
      { new: true }
    );

    if (!patient) return res.status(404).json({ error: 'Paciente no encontrado' });

    res.json({ message: 'Archivo asociado correctamente', archivos: patient.archivos });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;