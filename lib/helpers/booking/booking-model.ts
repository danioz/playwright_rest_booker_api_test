export type Booking = {
  bookingid?: number;
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
