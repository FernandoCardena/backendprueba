import express from 'express';
import { upload } from '../utils/upload.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Sube un archivo multimedia a Cloudinary
 *     tags: [Archivos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: URL del archivo subido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 */
router.post('/', verifyToken, upload.single('file'), (req, res) => {
  res.json({ url: req.file.path });
});

export default router;