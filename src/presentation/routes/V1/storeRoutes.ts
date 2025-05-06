import { Router } from "express";
import { validateSchema } from "../../../infrastructure/middlewares/validateSchema";
import { asyncHandler } from "../../../utils/asyncHandler";
import { authMiddleware } from "../../../infrastructure/middlewares/authMiddleware";
import { CreateStoreSchema, StoreFiltersSchema, UpdateOrDeleteStoreParamsSchema, UpdateStoreSchema } from "../../../infrastructure/validators/storesValidators";
import { StoreController } from "../../controllers/StoreController";

const router = Router();

router.get(
  "/", 
  authMiddleware, 
  validateSchema(StoreFiltersSchema, "query"), 
  asyncHandler(StoreController.getAll)
);

router.post(
  "/", 
  authMiddleware, 
  validateSchema(CreateStoreSchema), 
  asyncHandler(StoreController.create)
);

router.patch(
  "/:id", 
  authMiddleware, 
  validateSchema(UpdateOrDeleteStoreParamsSchema, "params"), 
  validateSchema(UpdateStoreSchema), 
  asyncHandler(StoreController.update)
);

router.delete(
  "/:id", 
  authMiddleware, 
  validateSchema(UpdateOrDeleteStoreParamsSchema, "params"), 
  asyncHandler(StoreController.delete)
);

export default router;
