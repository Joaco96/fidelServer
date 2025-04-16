import { Router } from "express";
import userRoutes from "./userRoutes";
import ticketRoutes from "./ticketRoutes";
import pointRoutes from "./pointRoutes";

const router = Router();

// Registrar todas las rutas en este router
router.use("/users", userRoutes);
router.use("/tickets", ticketRoutes);
router.use("/points", pointRoutes);

export default router;