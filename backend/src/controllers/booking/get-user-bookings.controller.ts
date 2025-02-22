import catchAsync from "@helpers/catchAsync";
import { getUserAuthItems } from "@helpers/userAuthItems";
import bookingService from "@services/bookings";
import { NextFunction, Request, Response } from "express";

export const getUserBookings = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userAuthItems = getUserAuthItems(req);
    const authenticatedUserId = userAuthItems.userId!;

    const bookings = await bookingService.repo.getUserBookings(
      authenticatedUserId
    );

    // Transform the response to plain object to handle circular references
    const bookingResponse = bookings.map((booking) =>
      booking.get({ plain: true })
    );
    const data = await Promise.all(
      bookingResponse.map((booking) =>
        bookingService.dataValidation.transformGetBookingResponse(booking)
      )
    );

    res.status(200).json({
      success: true,
      message: "Ok",
      data,
    });
  }
);
