import dotenv from "dotenv";
dotenv.config();

const dbConfig = {
  url: process.env.DB_URL,
  dialect: "postgres",
  sslRequire: true,
  sslRejectUnauthorized: false,
  logging: false,
};

export default dbConfig;
