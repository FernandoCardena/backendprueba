import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configuración de Cloudinary con tus datos
cloudinary.config({
  cloud_name: 'dgafocrox',
  api_key: '228643344898855',
  api_secret: 'LUz8JsQaG6CezqMoWgqTUDhu0Qo'
});

// Storage de Multer usando Cloudinary
export const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'medisur_uploads',
    allowed_formats: ['jpg', 'png', 'jpeg', 'pdf'],
    transformation: [{ width: 800, height: 800, crop: 'limit' }],
  },
});