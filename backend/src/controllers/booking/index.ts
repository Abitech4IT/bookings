import { create } from "./create-booking.controller";
import { getAllBookings } from "./get-all-bookings.controller";
import { getUserBookings } from "./get-user-bookings.controller";

const bookingController = {
  create,
  getAllBookings,
  getUserBookings,
};

export default bookingController;
