import { Router } from "express";
import { authMiddleware } from "../../../infrastructure/middlewares/authMiddleware";
import { validateSchema } from "../../../infrastructure/middlewares/validateSchema";
import { asyncHandler } from "../../../utils/asyncHandler";
import { PointController } from "../../controllers/PointController";
import { GetPointHistoryFiltersSchema } from "../../../infrastructure/validators/pointsValidators";
import { authorizedRole } from "../../../infrastructure/middlewares/authorizedRole";
import { RoleIds } from "../../../domain/entities/Role";

const router = Router();

router.get(
  "/", 
  authMiddleware, 
  authorizedRole(RoleIds.ADMIN),
  validateSchema(GetPointHistoryFiltersSchema, "query"),
  asyncHandler(PointController.getPointsHistory)
);

export default router;