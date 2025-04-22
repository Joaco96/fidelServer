import { Router } from "express";
import { validateSchema } from "../../../infrastructure/middlewares/validateSchema";
import { asyncHandler } from "../../../utils/asyncHandler";
import { authMiddleware } from "../../../infrastructure/middlewares/authMiddleware";
import { RewardController } from "../../controllers/RewardController";
import { CreateRewardSchema, RewardFiltersSchema, UpdateRewardParamsSchema, UpdateRewardSchema } from "../../../infrastructure/validators/rewardsValidators";

const router = Router();

router.get(
  "/", 
  authMiddleware, 
  validateSchema(RewardFiltersSchema, "query"), 
  asyncHandler(RewardController.getAll)
);

router.post(
  "/", 
  authMiddleware, 
  validateSchema(CreateRewardSchema), 
  asyncHandler(RewardController.create)
);

router.patch(
  "/:id", 
  authMiddleware, 
  validateSchema(UpdateRewardParamsSchema, "params"), 
  validateSchema(UpdateRewardSchema), 
  asyncHandler(RewardController.update)
);

export default router;
