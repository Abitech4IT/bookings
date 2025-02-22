import dataValidation from "./data-validation";
import repo from "./repo-helper.service";
import sendBookingEmail from "./send-booking-details.service";

const bookingService = {
  dataValidation,
  repo,
  sendBookingEmail,
};

export default bookingService;
