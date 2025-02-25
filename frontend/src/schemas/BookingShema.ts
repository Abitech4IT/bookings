import * as Yup from "yup";

export const BookingSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
  //   bookingDate: Yup.mixed()
  //     .required("Booking date is required")
  //     .test("is-date", "Invalid date", (value) => dayjs.isDayjs(value))
  //     .test("is-future", "Booking date must be in the future", (value) => {
  //       return value ? dayjs(value).isAfter(dayjs(), "day") : false;
  //     }),
});
