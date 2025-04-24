import { Router } from "express";
import userRoutes from "./userRoutes";
import ticketRoutes from "./ticketRoutes";
import pointRoutes from "./pointRoutes";
import rewardRoutes from "./rewardRoutes";
import stockRoutes from "./stockRoutes";
import redemptionRoutes from "./redemptionRoutes";

const router = Router();

// Registrar todas las rutas en este router
router.use("/users", userRoutes);
router.use("/tickets", ticketRoutes);
router.use("/points", pointRoutes);
router.use("/rewards", rewardRoutes);
router.use("/stock", stockRoutes);
router.use("/redemptions", redemptionRoutes);

export default router;