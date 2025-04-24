import { Router } from "express";
import { validateSchema } from "../../../infrastructure/middlewares/validateSchema";
import { asyncHandler } from "../../../utils/asyncHandler";
import { authMiddleware } from "../../../infrastructure/middlewares/authMiddleware";
import { CreateRedemptionSchema } from "../../../infrastructure/validators/redemptionsValidators";
import { RedemptionController } from "../../controllers/RedemptionController";

const router = Router();

router.post(
  "/", 
  authMiddleware, 
  validateSchema(CreateRedemptionSchema), 
  asyncHandler(RedemptionController.create)
);

export default router;
