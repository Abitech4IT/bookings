import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography,
} from "@mui/material";
import BookingModal from "./BookingModal";
import {
  useGetBookingsQuery,
  useGetUserBookingsQuery,
} from "../services/bookingAPI";
import { Booking } from "../types";
import { useAuth } from "../context/AuthContext";

function BookingList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  // Fetch bookings based on user role
  const { data: adminBookingsResponse, isLoading: isAdminLoading } =
    useGetBookingsQuery(undefined);
  const { data: userBookingsResponse, isLoading: isUserLoading } =
    useGetUserBookingsQuery(undefined);

  const isLoading = user?.role === "admin" ? isAdminLoading : isUserLoading;
  const bookings: Booking[] =
    user?.role === "admin"
      ? adminBookingsResponse?.data ?? []
      : userBookingsResponse?.data ?? [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 3,
          alignItems: "center",
        }}
      >
        <Typography variant="h5" component="h2">
          Your Bookings
        </Typography>
        <Button variant="contained" onClick={() => setIsModalOpen(true)}>
          New Booking
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Booking Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings &&
              bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.title}</TableCell>
                  <TableCell>{booking.user.firstName}</TableCell>
                  <TableCell>{booking.user.lastName}</TableCell>
                  <TableCell>{booking.user.email}</TableCell>
                  <TableCell>{booking.createdAt}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <BookingModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Box>
  );
}

export default BookingList;
