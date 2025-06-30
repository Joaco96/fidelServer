import { Router } from "express";
import { validateSchema } from "../../../infrastructure/middlewares/validateSchema";
import { asyncHandler } from "../../../utils/asyncHandler";
import { authMiddleware } from "../../../infrastructure/middlewares/authMiddleware";
import { CreateRedemptionSchema, RedemptionFiltersSchema, UpdateRedemptionParamsSchema, UpdateRedemptionSchema } from "../../../infrastructure/validators/redemptionsValidators";
import { RedemptionController } from "../../controllers/RedemptionController";
import { RoleIds } from "../../../domain/entities/Role";
import { authorizedRole } from "../../../infrastructure/middlewares/authorizedRole";

const router = Router();

router.post(
  "/", 
  authMiddleware, 
  validateSchema(CreateRedemptionSchema), 
  asyncHandler(RedemptionController.create)
);

router.get(
  "/", 
  authMiddleware, 
  validateSchema(RedemptionFiltersSchema, "query"), 
  asyncHandler(RedemptionController.getAll)
);

router.patch(
  "/:id", 
  authMiddleware, 
  authorizedRole(RoleIds.EMPLOYEE),
  validateSchema(UpdateRedemptionParamsSchema, "params"), 
  validateSchema(UpdateRedemptionSchema), 
  asyncHandler(RedemptionController.update)
);

export default router;
