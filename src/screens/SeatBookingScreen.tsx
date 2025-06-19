import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, FlatList, Alert, Modal } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { GLOBAL } from '../styles/global';
import { Card, Input, Button } from '../components/common';
import { COLORS } from '../constants/colors';
import { Calendar } from 'react-native-calendars';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { bookSeats, editBooking } from '../store/bookingSlice';

// Navigation params type
export type SeatBookingParams = {
  SeatBooking: {
    roomId: string;
    roomName: string;
    total: number;
    selectedSeats?: number[];
    startDate?: string;
    endDate?: string;
    bookingId?: string;
  };
};

const getToday = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

const SeatBookingScreen = () => {
  const route = useRoute<RouteProp<SeatBookingParams, 'SeatBooking'>>();
  const navigation = useNavigation<any>();
  const { roomId, roomName, total, selectedSeats = [], startDate, endDate, bookingId } = route.params || {};
  const dispatch = useDispatch();
  const bookings = useSelector((state: RootState) => state.booking.bookings);
  const userId = 'user1'; // TODO: Replace with real user logic

  const [selectedRange, setSelectedRange] = useState<{startDate: string | null, endDate: string | null}>({
    startDate: startDate || null,
    endDate: endDate || null,
  });

  // Helper to get all booked seats for the selected room on any date
  const getBookedSeatsAnyDate = () => {
    if (!roomId) return [];
    const roomBookings = bookings[roomId] || {};
    const bookedSet = new Set<number>();
    Object.values(roomBookings).forEach(dateObj => {
      Object.keys(dateObj).forEach(seatNum => {
        bookedSet.add(Number(seatNum));
      });
    });
    return Array.from(bookedSet);
  };

  // Replace NUM_ROWS and NUM_COLS with dynamic calculation based on total
  const getGrid = (totalSeats: number) => {
    const cols = 6;
    const rows = Math.ceil(totalSeats / cols);
    return { rows, cols };
  };
  const { rows: NUM_ROWS, cols: NUM_COLS } = getGrid(total || 30);

  // Example booked seats
  const BOOKED_SEATS = [];

  // 2D seat grid: 0 = available, 1 = selected, 2 = booked
  const [seats, setSeats] = useState<number[][]>(() => {
    let arr = [];
    let seatNum = 0;
    for (let r = 0; r < NUM_ROWS; r++) {
      let row = [];
      for (let c = 0; c < NUM_COLS; c++) {
        if (seatNum < (total || 30)) {
          if (selectedSeats.includes(seatNum)) {
            row.push(1); // selected (editing)
          } else {
            row.push(0); // available
          }
        }
        seatNum++;
      }
      if (row.length > 0) arr.push(row);
    }
    return arr;
  });

  // Update seat grid when bookings or date range changes
  useEffect(() => {
    let arr = [];
    let seatNum = 0;
    const bookedSeats = getBookedSeatsAnyDate();
    for (let r = 0; r < NUM_ROWS; r++) {
      let row = [];
      for (let c = 0; c < NUM_COLS; c++) {
        if (bookedSeats.includes(seatNum) && !selectedSeats.includes(seatNum)) {
          row.push(2); // booked (not user's own selection)
        } else if (selectedSeats.includes(seatNum)) {
          row.push(1); // selected (editing)
        } else {
          row.push(0); // available
        }
        seatNum++;
      }
      arr.push(row);
    }
    setSeats(arr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookings, roomId, NUM_ROWS, NUM_COLS, total]);

  const [calendarVisible, setCalendarVisible] = useState(false);

  // Helper to get marked dates for period marking
  const getMarkedDates = () => {
    const { startDate, endDate } = selectedRange;
    if (!startDate) return {};
    if (!endDate || startDate === endDate) {
      return {
        [startDate]: { startingDay: true, endingDay: true, color: '#22C55E', textColor: '#fff' },
      };
    }
    // Range
    let marked: any = {};
    let current = new Date(startDate);
    const end = new Date(endDate);
    while (current <= end) {
      const dateStr = current.toISOString().split('T')[0];
      marked[dateStr] = {
        color: '#22C55E',
        textColor: '#fff',
        ...(dateStr === startDate ? { startingDay: true } : {}),
        ...(dateStr === endDate ? { endingDay: true } : {}),
      };
      current.setDate(current.getDate() + 1);
    }
    return marked;
  };

  // Handle calendar day press
  const onDayPress = (day: { dateString: string }) => {
    const { startDate, endDate } = selectedRange;
    if (!startDate || (startDate && endDate)) {
      setSelectedRange({ startDate: day.dateString, endDate: null });
    } else if (startDate && !endDate) {
      if (day.dateString < startDate) {
        setSelectedRange({ startDate: day.dateString, endDate: startDate });
      } else {
        setSelectedRange({ startDate, endDate: day.dateString });
      }
    }
  };

  // Handle seat selection
  const handleSeatPress = (rowIdx: number, colIdx: number) => {
    setSeats(prev =>
      prev.map((row, r) =>
        row.map((seat, c) => {
          if (r === rowIdx && c === colIdx && seat === 0) {
            return 1; // select
          } else if (r === rowIdx && c === colIdx && seat === 1) {
            return 0; // deselect
          }
          return seat;
        })
      )
    );
  };

  // Book button logic
  const handleBook = () => {
    const selectedSeats: number[] = [];
    seats.forEach((row, rIdx) => {
      row.forEach((seat, cIdx) => {
        if (seat === 1) {
          selectedSeats.push(rIdx * NUM_COLS + cIdx);
        }
      });
    });
    if (!selectedRange.startDate || !selectedRange.endDate) {
      Alert.alert('Select a date range');
      return;
    }
    if (selectedSeats.length === 0) {
      Alert.alert('Select at least one seat');
      return;
    }
    // Dispatch booking to Redux
    if (bookingId) {
      dispatch(editBooking({
        userId,
        roomId,
        seatNumbers: selectedSeats,
        fromDate: selectedRange.startDate,
        toDate: selectedRange.endDate,
      }));
    } else {
      dispatch(bookSeats({
        userId,
        roomId,
        seatNumbers: selectedSeats,
        fromDate: selectedRange.startDate,
        toDate: selectedRange.endDate,
      }));
    }
    Alert.alert('Booking Confirmed', `Seats: ${selectedSeats.length}\nFrom: ${selectedRange.startDate}\nTo: ${selectedRange.endDate}`);
  };

  return (
    <SafeAreaView style={styles.mainBackground}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>{'\u2190'}</Text>
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Room</Text>
        <View style={{ width: 32 }} />
      </View>
      {/* Room Name Card */}
      <View style={styles.card}>
        <Text style={styles.roomLabel}>{roomName}</Text>
      </View>
      {/* Legend */}
      <View style={[styles.card, { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 12, marginBottom: 8 }]}> 
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#684D2D' }]} />
          <Text style={styles.legendText}>Available</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#22C55E' }]} />
          <Text style={styles.legendText}>Selected</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#EF4444' }]} />
          <Text style={styles.legendText}>Booked</Text>
        </View>
      </View>
      {/* Seat Grid Card */}
      <View style={[styles.card, styles.seatGridWrap]}>
        {seats.map((row, rIdx) => (
          <View key={rIdx} style={styles.seatRow}>
            {row.map((seat, cIdx) => {
              const seatNum = rIdx * NUM_COLS + cIdx;
              if (seatNum >= (total || 30)) {
                // Render empty space for unused slots
                return <View key={cIdx} style={[styles.seat, { backgroundColor: 'transparent', borderWidth: 0 }]} />;
              }
              return (
                <TouchableOpacity
                  key={cIdx}
                  style={[styles.seat,
                    seat === 0 && { backgroundColor: '#684D2D' },
                    seat === 1 && { backgroundColor: '#22C55E' },
                    seat === 2 && { backgroundColor: '#EF4444' },
                  ]}
                  disabled={seat === 2}
                  onPress={() => handleSeatPress(rIdx, cIdx)}
                />
              );
            })}
          </View>
        ))}
      </View>
      {/* Date Selection Card */}
      <View style={[styles.card, { alignItems: 'center', marginBottom: 16 }]}>       
        <Button
          text={selectedRange.startDate && selectedRange.endDate
            ? `From: ${selectedRange.startDate}  To: ${selectedRange.endDate}`
            : selectedRange.startDate
              ? `Selected: ${selectedRange.startDate}`
              : 'Select Date(s)'}
          onPress={() => setCalendarVisible(true)}
          style={styles.dateBtn}
        />
        <Modal
          visible={calendarVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setCalendarVisible(false)}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)' }}>
            <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 16, alignItems: 'center', width: 360 }}>
              <Calendar
                markingType={'period'}
                markedDates={getMarkedDates()}
                onDayPress={onDayPress}
                theme={{
                  selectedDayBackgroundColor: '#22C55E',
                  todayTextColor: '#684D2D',
                  arrowColor: '#684D2D',
                  textSectionTitleColor: '#684D2D',
                }}
                style={{ borderRadius: 16, width: 320 }}
              />
              <Button
                text="OK"
                onPress={() => setCalendarVisible(false)}
                style={{ marginTop: 16, width: 120, backgroundColor: '#6C63FF', borderRadius: 12 }}
              />
            </View>
          </View>
        </Modal>
      </View>
      {/* Book Button */}
      <Button text="Book" onPress={handleBook} style={styles.bookBtn} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainBackground: {
    flex: 1,
    backgroundColor: '#F8F9FD',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6C63FF',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  backBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
  topBarTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    marginTop: 16,
  },
  roomLabel: {
    color: '#6C63FF',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  legendColor: {
    width: 20,
    height: 20,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    fontSize: 14,
    color: '#6C63FF',
    fontWeight: '600',
  },
  seatGridWrap: {
    alignItems: 'center',
    marginBottom: 0,
    paddingVertical: 12,
  },
  seatRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  seat: {
    width: 32,
    height: 32,
    borderRadius: 6,
    marginHorizontal: 6,
    borderWidth: 2,
    borderColor: '#fff',
  },
  dateBtn: {
    marginBottom: 8,
    width: 200,
    backgroundColor: '#6C63FF',
    borderRadius: 12,
  },
  bookBtn: {
    backgroundColor: '#6C63FF',
    borderRadius: 16,
    marginHorizontal: 32,
    marginTop: 8,
    paddingVertical: 16,
    marginBottom: 24,
  },
});

export default SeatBookingScreen; 