import Booking from "@models/booking.model";
import { z } from "zod";

const nString = z.string().nullable().catch(null);
const nDate = z.coerce.date().nullable().catch(null);

export const transformGetBookingResponse = async (value: Booking) => {
  const response = await responseSchema.safeParseAsync(value);

  const data = response.data;
  if (data) {
  }
  return data;
};

const userSchema = z
  .object({
    id: nString,
    firstName: nString,
    lastName: nString,
    email: nString,
  })
  .nullish()
  .promise()
  .transform(async (e) => await e);

const responseSchema = z.object({
  id: nString,
  title: nString,
  user: userSchema,
  createdAt: nDate,
  updatedAt: nDate,
});
