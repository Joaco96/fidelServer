import dotenv from "dotenv";
dotenv.config();

const dbConfig = {
  url: process.env.DB_URL,
  dialect: "postgres",
};

export default dbConfig;
