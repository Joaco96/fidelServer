import { Router } from "express";
import { validateSchema } from "../../../infrastructure/middlewares/validateSchema";
import { asyncHandler } from "../../../utils/asyncHandler";
import { TicketController } from "../../controllers/TicketController";
import { CreateTicketSchema } from "../../../infrastructure/validators/ticketsValidators";
import { authMiddleware } from "../../../infrastructure/middlewares/authMiddleware";

const router = Router();

router.post(
  "/", 
  authMiddleware, 
  validateSchema(CreateTicketSchema), 
  asyncHandler(TicketController.create)
);

export default router;
