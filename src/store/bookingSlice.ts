import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Booking {
  userId: string;
  roomId: string;
  seatNumbers: number[];
  fromDate: string;
  toDate: string;
}

interface BookingsState {
  // bookings[roomId][date][seatNumber] = userId
  bookings: {
    [roomId: string]: {
      [date: string]: {
        [seatNumber: number]: string; // userId
      }
    }
  };
  userBookings: {
    [userId: string]: Booking[];
  };
}

const initialState: BookingsState = {
  bookings: {},
  userBookings: {},
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    bookSeats: (state, action: PayloadAction<Booking>) => {
      const { userId, roomId, seatNumbers, fromDate, toDate } = action.payload;
      // Book each seat for each date in the range
      let current = new Date(fromDate);
      const end = new Date(toDate);
      while (current <= end) {
        const dateStr = current.toISOString().split('T')[0];
        if (!state.bookings[roomId]) state.bookings[roomId] = {};
        if (!state.bookings[roomId][dateStr]) state.bookings[roomId][dateStr] = {};
        seatNumbers.forEach(seat => {
          state.bookings[roomId][dateStr][seat] = userId;
        });
        current.setDate(current.getDate() + 1);
      }
      // Save to userBookings
      if (!state.userBookings[userId]) state.userBookings[userId] = [];
      state.userBookings[userId].push({ userId, roomId, seatNumbers, fromDate, toDate });
    },
    loadBookings: (state, action: PayloadAction<BookingsState['bookings']>) => {
      state.bookings = action.payload;
    },
    resetBookings: (state) => {
      state.bookings = {};
      state.userBookings = {};
    },
  },
});

export const { bookSeats, loadBookings, resetBookings } = bookingSlice.actions;
export default bookingSlice.reducer; 