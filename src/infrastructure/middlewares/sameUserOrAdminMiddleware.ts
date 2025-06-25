import { RequestHandler } from "express";
import { RequestWithUser } from "./authMiddleware";
import { RoleIds } from "../../domain/entities/Role";

export const sameUserOrAdminMiddleware: RequestHandler = (req, _res, next) => {
  const { id } = req.params;
  const isAdmin = (req as RequestWithUser).user?.role === RoleIds.ADMIN;
  const isSameUser = (req as RequestWithUser).user?.userId === id;
  if (!isAdmin && !isSameUser) {
    throw new Error("No puedes realizar esta operación");
  }
  next();
};
