export type BookingModel = {
  bookingid: number;
  booking: Booking;
};

export type Booking = {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: BookingDates;
  additionalneeds: string;
};

export type BookingDates = {
  checkin: string;
  checkout: string;
};
