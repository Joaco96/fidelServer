import { Router } from "express";
import { UserController } from "../../controllers/UserController";
import { validateSchema } from "../../../infrastructure/middlewares/validateSchema";
import { CreateUserSchema, DeleteUserParamsSchema, LoginUserSchema, UsersFiltersSchema } from "../../../infrastructure/validators/userValidators";
import { asyncHandler } from "../../../utils/asyncHandler";
import { authMiddleware } from "../../../infrastructure/middlewares/authMiddleware";

const router = Router();

router.get(
  "/",
  authMiddleware,
  validateSchema(UsersFiltersSchema, "query"), 
  asyncHandler(UserController.getAllUsers)
);

router.post(
  "/", 
  validateSchema(CreateUserSchema), 
  asyncHandler(UserController.create)
);

router.post(
  "/login", 
  validateSchema(LoginUserSchema), 
  asyncHandler(UserController.login)
);

router.delete(
  "/:id", 
  authMiddleware, 
  validateSchema(DeleteUserParamsSchema, "params"), 
  asyncHandler(UserController.delete)
);

export default router;
