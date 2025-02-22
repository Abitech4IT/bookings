import { Router } from "express";
import authRoutes from "./auth.routes";
import bookingRoutes from "./booking.routes";

const userRoutes = Router();

userRoutes.use("/auth", authRoutes);
userRoutes.use("/booking", bookingRoutes);

export default userRoutes;
