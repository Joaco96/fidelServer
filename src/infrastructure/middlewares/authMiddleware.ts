import { RequestHandler, Request } from "express";
import { CustomJwtPayload, verifyToken } from "../../domain/services/jwtService";

// Extender la interfaz Request
export interface RequestWithUser extends Request {
  user?: CustomJwtPayload;
}

export const authMiddleware: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "Token no proporcionado" });
    return;
  };

  try {
    const payload = verifyToken(token);
    (req as RequestWithUser).user = payload;
    next();
  } catch (err) {
    res.status(401).json({ error: "Token inválido" });
  }
}
