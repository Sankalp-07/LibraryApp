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
    editBooking: (state, action: PayloadAction<Booking>) => {
      const { userId, roomId, seatNumbers, fromDate, toDate } = action.payload;
      // Remove previous booking for this user, room, and overlapping date range
      if (state.userBookings[userId]) {
        state.userBookings[userId] = state.userBookings[userId].filter(b => {
          // Remove only if same room and overlapping date range
          if (b.roomId !== roomId) return true;
          const oldFrom = new Date(b.fromDate);
          const oldTo = new Date(b.toDate);
          const newFrom = new Date(fromDate);
          const newTo = new Date(toDate);
          // If ranges overlap, remove
          return (oldTo < newFrom || oldFrom > newTo);
        });
      }
      // Remove old seat assignments for this user in this room and date range
      let current = new Date(fromDate);
      const end = new Date(toDate);
      while (current <= end) {
        const dateStr = current.toISOString().split('T')[0];
        if (state.bookings[roomId] && state.bookings[roomId][dateStr]) {
          Object.keys(state.bookings[roomId][dateStr]).forEach(seat => {
            if (state.bookings[roomId][dateStr][Number(seat)] === userId) {
              delete state.bookings[roomId][dateStr][Number(seat)];
            }
          });
        }
        current.setDate(current.getDate() + 1);
      }
      // Add new booking (reuse bookSeats logic)
      let addCurrent = new Date(fromDate);
      const addEnd = new Date(toDate);
      while (addCurrent <= addEnd) {
        const dateStr = addCurrent.toISOString().split('T')[0];
        if (!state.bookings[roomId]) state.bookings[roomId] = {};
        if (!state.bookings[roomId][dateStr]) state.bookings[roomId][dateStr] = {};
        seatNumbers.forEach(seat => {
          state.bookings[roomId][dateStr][seat] = userId;
        });
        addCurrent.setDate(addCurrent.getDate() + 1);
      }
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

export const { bookSeats, editBooking, loadBookings, resetBookings } = bookingSlice.actions;
export default bookingSlice.reducer; 