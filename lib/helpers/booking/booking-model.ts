export type Booking = {
  bookingid: number;
  roomid: number;
  firstname: string;
  lastname: string;
  depositpaid: boolean;
  email: string;
  phone: string;
  bookingdates: BookingDates;
};

export type BookingDates = {
  checkin: string;
  checkout: string;
};

export type CreatedBooking = {
  bookingid: number;
  booking: Booking;
};

export type BookingSummary = {
  bookingDates: BookingDates;
};

export type Summary = {
  bookings: BookingSummary[];
};
