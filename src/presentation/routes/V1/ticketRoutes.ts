import { Router } from "express";
import { validateSchema } from "../../../infrastructure/middlewares/validateSchema";
import { asyncHandler } from "../../../utils/asyncHandler";
import { TicketController } from "../../controllers/TicketController";
import { CreateTicketSchema, GetFilteredTicketsSchema } from "../../../infrastructure/validators/ticketsValidators";
import { authMiddleware } from "../../../infrastructure/middlewares/authMiddleware";
import { authorizedRole } from "../../../infrastructure/middlewares/authorizedRole";
import { RoleIds } from "../../../domain/entities/Role";

const router = Router();

router.post(
  "/", 
  authMiddleware, 
  authorizedRole(RoleIds.EMPLOYEE),
  validateSchema(CreateTicketSchema), 
  asyncHandler(TicketController.create)
);

router.get(
  "/", 
  authMiddleware, 
  validateSchema(GetFilteredTicketsSchema, "query"), 
  asyncHandler(TicketController.getTickets)
);

export default router;
