import { configureStore } from "@reduxjs/toolkit";
import { authAPI } from "../services/authAPI";
import { bookingAPI } from "../services/bookingAPI";

export const store = configureStore({
  reducer: {
    [authAPI.reducerPath]: authAPI.reducer,
    [bookingAPI.reducerPath]: bookingAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authAPI.middleware, bookingAPI.middleware),
});
