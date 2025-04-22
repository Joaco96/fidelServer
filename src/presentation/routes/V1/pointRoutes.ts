import { Router } from "express";
import { authMiddleware } from "../../../infrastructure/middlewares/authMiddleware";
import { validateSchema } from "../../../infrastructure/middlewares/validateSchema";
import { GetPointHistoryParamsSchema } from "../../../infrastructure/validators/pointsValidators";
import { asyncHandler } from "../../../utils/asyncHandler";
import { PointController } from "../../controllers/PointController";

const router = Router();

router.get(
  "/history/:user_id", 
  authMiddleware, 
  validateSchema(GetPointHistoryParamsSchema, "params"), 
  asyncHandler(PointController.getHistoryByUser)
);

export default router;