import Booking from "@models/booking.model";
import User from "@models/user.model";

// Find all bookings for a specific user
const getUserBookings = async (userId: string) => {
  // Check if user exists
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return await Booking.findAll({
    where: { userId },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName", "email"],
      },
    ],
    // include: [User],
  });
};

// Find all user bookings
const getAllUsersBookings = async () => {
  return await Booking.findAll({
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName", "email"],
      },
    ],
  });
};

const createBooking = async (title: string, userId: string) => {
  // Check if user exists
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error("User not found");
  }
  const booking = await Booking.create({
    title,
    userId,
  });

  // Fetch the booking with user data
  const bookingWithUser = await Booking.findByPk(booking.id, {
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName", "email"],
      },
    ],
  });

  if (!bookingWithUser) {
    throw new Error("Failed to fetch created booking");
  }

  return bookingWithUser;
};

const repo = {
  createBooking,
  getAllUsersBookings,
  getUserBookings,
};

export default repo;
