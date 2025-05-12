import dotenv from "dotenv";
dotenv.config();

const serverConfig = {
  port: process.env.PORT,
  frontend_url: process.env.FRONTEND_URL,
  frontend_control_route: process.env.FRONTEND_CONTROL_ROUTE,
  cors: {
    origin: process.env.FRONTEND_URL, // Permitir solo solicitudes desde el frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
  }
};

export default serverConfig;
