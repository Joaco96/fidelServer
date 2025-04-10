import { Router } from "express";
import userRoutes from "./userRoutes";
// import { authMiddleware } from "../../../infrastructure/middleware/authMiddleware";

const router = Router();

// Registrar todas las rutas en este router
router.use("/users", userRoutes);
// router.use("/users", authMiddleware, userRoutes);

export default router;