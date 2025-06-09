import express from 'express';
import Patient from '../models/patient.js';

const router = express.Router();

/**
 * @swagger
 * /api/patients/{id}/file:
 *   post:
 *     summary: Asocia un archivo subido a un paciente
 *     tags: [Pacientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del paciente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Archivo asociado correctamente
 */
router.post('/:id/file', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL de archivo requerida' });

    // Usar findByIdAndUpdate con $push para evitar validación de campos requeridos
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