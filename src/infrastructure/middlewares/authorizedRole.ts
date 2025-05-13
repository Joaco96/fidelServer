import { Request, Response, NextFunction } from "express";
import { RoleIds } from "../../domain/entities/Role";
import { RequestWithUser } from "./authMiddleware";

export function authorizedRole(requiredRole: RoleIds) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (
      !(req as RequestWithUser).user?.role ||
      ((req as RequestWithUser).user?.role &&
        (req as RequestWithUser).user?.role! < requiredRole)
    ) {
      res.status(403).sendResponse({ message: "Acceso denegado" });
    } else {
      next();
    }
  };
}
