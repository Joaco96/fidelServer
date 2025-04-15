import { Router } from "express";
import userRoutes from "./userRoutes";
import ticketRoutes from "./ticketRoutes";

const router = Router();

// Registrar todas las rutas en este router
router.use("/users", userRoutes);
router.use("/tickets", ticketRoutes);

export default router;