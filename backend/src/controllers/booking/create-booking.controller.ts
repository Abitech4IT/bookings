import catchAsync from "@helpers/catchAsync";
import { getUserAuthItems } from "@helpers/userAuthItems";
import bookingService from "@services/bookings";
import userService from "@services/users";
import { NextFunction, Request, Response } from "express";

export const create = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userAuthItems = getUserAuthItems(req);
    const authenticatedUserId = userAuthItems.userId!;

    const [validatedData, validationErrors] =
      bookingService.dataValidation.validateAddBookingRequest(req);

    if (validationErrors) {
      res.status(400).json({
        status: 400,
        message: "Bad request",
        errors: validationErrors,
      });
      return;
    }

    const body = validatedData.body;

    // check for authenticated user
    const authenticatedUser = await userService.repo.getUserById(
      userAuthItems.userId!
    );

    const booking = await bookingService.repo.createBooking(
      body.title,
      authenticatedUserId
    );

    // Transform the response to plain object to handle circular references
    const bookingResponse = booking.get({ plain: true });
    const data =
      await bookingService.dataValidation.transformGetBookingResponse(
        bookingResponse
      );

    // Send transaction email
    await bookingService.sendBookingEmail({
      firstName: authenticatedUser?.firstName,
      lastName: authenticatedUser?.lastName,
      email: authenticatedUser?.email,
      title: booking.title,
      bookingDate: booking.createdAt,
    });

    res.status(201).json({
      success: true,
      message: "Created",
      data,
    });
  }
);
