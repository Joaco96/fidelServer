import { Router } from "express";
import { validateSchema } from "../../../infrastructure/middlewares/validateSchema";
import { asyncHandler } from "../../../utils/asyncHandler";
import { authMiddleware } from "../../../infrastructure/middlewares/authMiddleware";
import { StockController } from "../../controllers/StockController";
import { CreateStockSchema } from "../../../infrastructure/validators/stockValidators";

const router = Router();

router.post(
  "/", 
  authMiddleware, 
  validateSchema(CreateStockSchema), 
  asyncHandler(StockController.create)
);

export default router;
