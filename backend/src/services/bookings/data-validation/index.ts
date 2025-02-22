import { transformGetBookingResponse } from "./transform-get-booking-response.service";
import { validateAddBookingRequest } from "./validate-add-booking-request.service";
import { validateGetUserBookingsRequest } from "./validate-get-user-bookings-request.service";

const dataValidation = {
  transformGetBookingResponse,
  validateAddBookingRequest,
  validateGetUserBookingsRequest,
};

export default dataValidation;
