import jwt, { JwtPayload } from "jsonwebtoken";
import authConfig from "../../config/auth.config";

const SECRET = authConfig.jwt_secret!;

export interface CustomJwtPayload extends JwtPayload {
  id: string;
  role: number;
  name: string;
  email: string;
  dni: string;
  createdAt: Date;
}

export const generateToken = (payload: any) =>
  jwt.sign(payload, SECRET, { expiresIn: "7d" });

export const verifyToken = (token: string) =>
  jwt.verify(token, SECRET) as CustomJwtPayload;
