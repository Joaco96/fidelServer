import { Request, Response, NextFunction } from "express";
import { RoleIds } from "../../domain/entities/Role";

export function authorizeRole(requiredRole: RoleIds) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role_id !== requiredRole) {
      return res.status(403).json({ error: "Acceso denegado" });
    }
    next();
  };
}
