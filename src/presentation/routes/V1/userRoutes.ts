import { Router } from "express";
import { UserController } from "../../controllers/UserController";
import { validateSchema } from "../../../infrastructure/middlewares/validateSchema";
import { CreateUserSchema, DeleteUserParamsSchema, GetUserPointsParamsSchema, LoginUserSchema, UpdateUserParamsSchema, UpdateUserRoleSchema, UpdateUserSchema, UsersFiltersSchema } from "../../../infrastructure/validators/userValidators";
import { asyncHandler } from "../../../utils/asyncHandler";
import { authMiddleware } from "../../../infrastructure/middlewares/authMiddleware";
import { authorizedRole } from "../../../infrastructure/middlewares/authorizedRole";
import { RoleIds } from "../../../domain/entities/Role";
import { sameUserOrAdminMiddleware } from "../../../infrastructure/middlewares/sameUserOrAdminMiddleware";

const router = Router();

router.get(
  "/",
  authMiddleware,
  authorizedRole(RoleIds.EMPLOYEE),
  validateSchema(UsersFiltersSchema, "query"), 
  asyncHandler(UserController.getAllUsers)
);

router.get(
  "/points/:id",
  authMiddleware,
  validateSchema(GetUserPointsParamsSchema, "params"), 
  sameUserOrAdminMiddleware,
  asyncHandler(UserController.getUserPoints)
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
  sameUserOrAdminMiddleware,
  asyncHandler(UserController.delete)
);

router.patch(
  "/:id", 
  authMiddleware, 
  validateSchema(UpdateUserParamsSchema, "params"), 
  validateSchema(UpdateUserSchema),
  sameUserOrAdminMiddleware,
  asyncHandler(UserController.update)
);

router.patch(
  "/assign-role/:id", 
  authMiddleware, 
  authorizedRole(RoleIds.ADMIN),
  validateSchema(UpdateUserParamsSchema, "params"), 
  validateSchema(UpdateUserRoleSchema), 
  asyncHandler(UserController.updateRole)
);


export default router;
