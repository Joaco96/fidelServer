import dotenv from "dotenv";
dotenv.config();

const authConfig = {
  jwt_secret: process.env.JWT_SECRET,
};

export default authConfig;
