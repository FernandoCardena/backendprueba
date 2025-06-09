import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import authRoutes from './routes/auth.routes.js';
import patientRoutes from './routes/patientRoutes.js';
import verifyToken from './middlewares/verifyToken.js';

const app = express();
app.use(express.json());
app.use(cors());

// Rutas públicas
app.use('/api/auth', authRoutes);

// Rutas protegidas (todas las de pacientes requieren autenticación)
app.use('/api/patients', verifyToken, patientRoutes);

app.get('/', (req, res) => {
  res.send('API de Medisur funcionando ✅');
});

// Conexión a MongoDB
const uri = process.env.MONGO_URI;
if (!uri) {
  console.error('❌ URI de MongoDB no encontrada. Revisa tu archivo .env');
  process.exit(1);
}

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado a MongoDB Atlas'))
.catch((err) => {
  console.error('❌ Error al conectar a MongoDB:', err.message);
  process.exit(1);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});