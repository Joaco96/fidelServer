import { Router } from "express";
import { UserController } from "../../controllers/UserController";
import { validateSchema } from "../../../infrastructure/middlewares/validateSchema";
import { CreateUserSchema, LoginUserSchema } from "../../../infrastructure/validators/userValidators";
import { asyncHandler } from "../../../utils/asyncHandler";

const router = Router();

router.post("/", validateSchema(CreateUserSchema), asyncHandler(UserController.create));
router.post("/login", validateSchema(LoginUserSchema), asyncHandler(UserController.login));

export default router;
