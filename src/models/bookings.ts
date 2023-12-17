export interface Booking {
  id: string;
  trainingCenter: string;
  courseName: string;
  startDateTime: string;
  endDateTime: string;
  price: number;
  currency: "USD" | "EUR" | "GBP" | "BGN";
  bookedSlots: number;
  totalSlots: number;
}
