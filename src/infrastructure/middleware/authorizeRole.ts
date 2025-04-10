import { Request, Response, NextFunction } from "express";
import { RoleIds } from "../../domain/entities/Role";
import { RequestWithUser } from "./authMiddleware";

export function authorizeRole(requiredRole: RoleIds) {
  return (req: Request, res: Response, next: NextFunction) => {
    if ((req as RequestWithUser).user?.role_id !== requiredRole) {
      return res.status(403).json({ error: "Acceso denegado" });
    }
    next();
  };
}
