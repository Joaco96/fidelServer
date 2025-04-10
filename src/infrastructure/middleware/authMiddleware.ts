import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../../domain/services/jwtService";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token no proporcionado" });

  try {
    const payload = verifyToken(token);
    req.user = payload; // extender interfaz Request para tipar esto
    next();
  } catch (err) {
    res.status(401).json({ error: "Token inválido" });
  }
}
