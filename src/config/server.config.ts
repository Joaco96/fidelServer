import dotenv from "dotenv";
dotenv.config();

const serverConfig = {
  port: process.env.PORT,
  frontend_url: process.env.FRONTEND_URL,
  frontend_control_route: process.env.FRONTEND_CONTROL_ROUTE,
};

export default serverConfig;
