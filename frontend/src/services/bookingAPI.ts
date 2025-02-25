import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BookingResponse } from "../types";

export const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const bookingAPI = createApi({
  reducerPath: "bookingAPI",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("content-type", "application/json");
      headers.set("Authorization", "Bearer " + localStorage.getItem("token"));
      return headers;
    },
  }),
  tagTypes: ["Bookings"],
  endpoints: (builder) => ({
    getBookings: builder.query<BookingResponse, undefined>({
      query: () => "/booking/getAllBookings",
      providesTags: ["Bookings"],
    }),
    getUserBookings: builder.query<BookingResponse, undefined>({
      query: () => "/booking/getUserBookings",
      providesTags: ["Bookings"],
    }),
    createBooking: builder.mutation({
      query: (data) => ({
        url: "/booking/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Bookings"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetBookingsQuery,
  useGetUserBookingsQuery,
} = bookingAPI;
