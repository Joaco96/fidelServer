import { Router } from "express";
import { UserController } from "../../controllers/UserController";
import { validateSchema } from "../../../infrastructure/middlewares/validateSchema";
import { CreateUserSchema, LoginUserSchema } from "../../../infrastructure/validators/userValidators";

const router = Router();
// @ts-ignore
router.post("/", validateSchema(CreateUserSchema), UserController.create);
// @ts-ignore
router.post("/login", validateSchema(LoginUserSchema), UserController.login);

export default router;
