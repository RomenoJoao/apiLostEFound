import { Router } from "express";
import UserRoutes from "./user.routes";
import itemsRoutes from "./founded.routes";
import authRoutes from "./auth.routes";

const router = Router();

router.use("/user", UserRoutes);
router.use("/founded", itemsRoutes);

//Auth Routes

router.use("/login", authRoutes);

export default router;
