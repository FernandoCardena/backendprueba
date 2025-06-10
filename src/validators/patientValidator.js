import Joi from "joi";

// Para crear (campos requeridos)
export const patientSchema = Joi.object({
  nombres: Joi.string().min(2).max(50).required(),
  apellidos: Joi.string().min(2).max(50).required(),
  dni: Joi.string().pattern(/^[0-9]+$/).min(6).max(15).required(),
  telefono: Joi.string().pattern(/^[0-9]+$/).min(7).max(15).required(),
  email: Joi.string().email().required(),
});

// Para editar (todos opcionales, pero si se envían deben ser válidos)
export const patientEditSchema = Joi.object({
  nombres: Joi.string().min(2).max(50),
  apellidos: Joi.string().min(2).max(50),
  dni: Joi.string().pattern(/^[0-9]+$/).min(6).max(15),
  telefono: Joi.string().pattern(/^[0-9]+$/).min(7).max(15),
  email: Joi.string().email()
});