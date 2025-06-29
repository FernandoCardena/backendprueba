import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API de Usuarios y Pacientes",
    version: "1.0.0",
    description: "Documentación de la API para gestión de usuarios y pacientes.",
  },
  servers: [
    {
      url: "http://localhost:3001",
      description: "Servidor local",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"], 
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;