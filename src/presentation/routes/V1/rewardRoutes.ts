import { Router } from "express";
import { validateSchema } from "../../../infrastructure/middlewares/validateSchema";
import { asyncHandler } from "../../../utils/asyncHandler";
import { authMiddleware } from "../../../infrastructure/middlewares/authMiddleware";
import { RewardController } from "../../controllers/RewardController";
import { CreateRewardSchema, DeleteRewardParamsSchema, RewardFiltersSchema, UpdateRewardParamsSchema, UpdateRewardSchema } from "../../../infrastructure/validators/rewardsValidators";
import { authorizedRole } from "../../../infrastructure/middlewares/authorizedRole";
import { RoleIds } from "../../../domain/entities/Role";

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
  authorizedRole(RoleIds.ADMIN),
  validateSchema(CreateRewardSchema), 
  asyncHandler(RewardController.create)
);

router.patch(
  "/:id", 
  authMiddleware, 
  authorizedRole(RoleIds.ADMIN),
  validateSchema(UpdateRewardParamsSchema, "params"), 
  validateSchema(UpdateRewardSchema), 
  asyncHandler(RewardController.update)
);

router.delete(
  "/:id", 
  authMiddleware, 
  authorizedRole(RoleIds.ADMIN),
  validateSchema(DeleteRewardParamsSchema, "params"), 
  asyncHandler(RewardController.delete)
);

export default router;
