import { Router } from "express";
import userRoutes from "./userRoutes";

const router = Router();

// Registrar todas las rutas en este router
router.use("/users", userRoutes);

export default router;