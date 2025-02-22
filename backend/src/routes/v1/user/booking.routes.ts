import bookingController from "@controllers/booking";
import { restrictTo } from "@middlewares/isAdmin.middleware";
import { authenticate } from "@middlewares/user-auth.middleware";
import { Router } from "express";

const bookingRoutes = Router();

bookingRoutes.post("/create", authenticate, bookingController.create);
bookingRoutes.get(
  "/getUserBookings",
  authenticate,
  bookingController.getUserBookings
);
bookingRoutes.get(
  "/getAllBookings",
  authenticate,
  restrictTo("admin"),
  bookingController.getAllBookings
);

export default bookingRoutes;
