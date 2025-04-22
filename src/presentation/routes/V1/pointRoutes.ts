import { Router } from "express";
import { authMiddleware } from "../../../infrastructure/middlewares/authMiddleware";
import { validateSchema } from "../../../infrastructure/middlewares/validateSchema";
import { asyncHandler } from "../../../utils/asyncHandler";
import { PointController } from "../../controllers/PointController";
import { GetPointHistoryFiltersSchema } from "../../../infrastructure/validators/pointsValidators";

const router = Router();

router.get(
  "/", 
  authMiddleware, 
  validateSchema(GetPointHistoryFiltersSchema, "query"),
  asyncHandler(PointController.getHistoryByUser)
);

export default router;