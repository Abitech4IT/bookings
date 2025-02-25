export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Booking {
  id: string;
  title: string;
  user: {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  createdAt: string;
}

export interface BookingResponse {
  data: Booking[];
  createdAt: string;
}
