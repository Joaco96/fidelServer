import { Router } from "express";
import { validateSchema } from "../../../infrastructure/middlewares/validateSchema";
import { asyncHandler } from "../../../utils/asyncHandler";
import { authMiddleware } from "../../../infrastructure/middlewares/authMiddleware";
import { RewardController } from "../../controllers/RewardController";
import { CreateRewardSchema } from "../../../infrastructure/validators/rewardsValidators";

const router = Router();

router.post("/", authMiddleware, validateSchema(CreateRewardSchema), asyncHandler(RewardController.create));

export default router;
