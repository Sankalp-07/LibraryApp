import React, { useState } from 'react';
import { View, Text, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { Card } from '../components/common';
import { GLOBAL } from '../styles/global';
import { COLORS } from '../constants/colors';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useNavigation } from '@react-navigation/native';

// Map roomId to library name (placeholder)
const ROOM_ID_TO_NAME: Record<string, string> = {
  '1': 'Reading Hall',
  '2': 'Reference Room',
  '3': 'Children Section',
  '4': 'Study Room A',
  '5': 'Study Room B',
  '6': 'Multimedia Room',
  '7': 'Silent Zone',
};

const LIBRARY_ROOMS = [
  { id: '1', name: 'Reading Hall', total: 30 },
  { id: '2', name: 'Reference Room', total: 20 },
  { id: '3', name: 'Children Section', total: 25 },
  { id: '4', name: 'Study Room A', total: 12 },
  { id: '5', name: 'Study Room B', total: 10 },
  { id: '6', name: 'Multimedia Room', total: 8 },
  { id: '7', name: 'Silent Zone', total: 15 },
];

const canEditOrDelete = (fromDate: string) => {
  const now = new Date();
  const from = new Date(fromDate);
  const diff = (from.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  return diff > 5;
};

const BookingsScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const userId = 'user1'; // Hardcoded for now
  const userBookings = useSelector((state: RootState) => state.booking.userBookings[userId] || []);
  const navigation = useNavigation<any>();

  // Group bookings only by room
  const groupedByRoom: Record<string, { roomId: string; seatNumbers: number[]; from: string; to: string }> = {};
  userBookings.forEach(b => {
    if (!groupedByRoom[b.roomId]) {
      groupedByRoom[b.roomId] = {
        roomId: b.roomId,
        seatNumbers: [...b.seatNumbers],
        from: b.fromDate,
        to: b.toDate,
      };
    } else {
      // Combine seat numbers
      groupedByRoom[b.roomId].seatNumbers = Array.from(new Set([...groupedByRoom[b.roomId].seatNumbers, ...b.seatNumbers]));
      // Update from (earliest)
      if (b.fromDate < groupedByRoom[b.roomId].from) groupedByRoom[b.roomId].from = b.fromDate;
      // Update to (latest)
      if (b.toDate > groupedByRoom[b.roomId].to) groupedByRoom[b.roomId].to = b.toDate;
    }
  });
  const bookings = Object.values(groupedByRoom).map((b, idx) => ({
    id: idx.toString(),
    library: ROOM_ID_TO_NAME[b.roomId] || b.roomId,
    seats: b.seatNumbers.length,
    from: b.from,
    to: b.to,
    roomId: b.roomId,
    seatNumbers: b.seatNumbers,
  }));

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000); // Placeholder refresh
  };

  const handleEdit = (id: string) => {
    const booking = bookings.find(b => b.id === id);
    if (!booking) return;
    const room = LIBRARY_ROOMS.find(r => r.id === booking.roomId);
    navigation.navigate('SeatBooking', {
      roomId: booking.roomId,
      roomName: booking.library,
      total: room ? room.total : 30, // fallback to 30 if not found
      selectedSeats: booking.seatNumbers,
      fromDate: booking.from,
      toDate: booking.to,
    });
  };
  const handleDelete = (id: string) => {
    Alert.alert('Delete', `Delete booking ${id}`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#684D2D' }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bookings</Text>
      </View>
      {/* Info Banners */}
      <View style={styles.infoBannerRed}>
        <Text style={styles.infoIcon}>❗</Text>
        <Text style={styles.infoTextRed}>Yes! you can cancel your booked seats before 5 days of booked from the from date.</Text>
      </View>
      <View style={styles.infoBannerGreen}>
        <Text style={styles.infoIcon}>📝</Text>
        <Text style={styles.infoTextGreen}>Yes! you can Change your booked seats before 5 days of booked from the from date.</Text>
      </View>
      {/* Pull to Refresh Label */}
      <Text style={styles.refreshLabel}>🔄 Pull to refresh</Text>
      {/* Booking List */}
      <FlatList
        data={bookings}
        keyExtractor={item => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => {
          const editable = canEditOrDelete(item.from);
          return (
            <Card style={styles.bookingCard}>
              <Text style={styles.libraryName}>{item.library}</Text>
              <View style={styles.row}>
                <Text style={styles.label}>Booked Seats: <Text style={styles.value}>{item.seats}</Text></Text>
                <Text style={styles.label}>From: <Text style={styles.value}>{item.from}</Text></Text>
                <Text style={styles.label}>To: <Text style={styles.value}>{item.to}</Text></Text>
              </View>
              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={[styles.actionBtn, !editable && styles.actionBtnDisabled]}
                  onPress={() => handleEdit(item.id)}
                  disabled={!editable}
                >
                  <Text style={[styles.actionIcon, { color: editable ? '#22C55E' : COLORS.placeholder }]}>📝</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionBtn, !editable && styles.actionBtnDisabled]}
                  onPress={() => handleDelete(item.id)}
                  disabled={!editable}
                >
                  <Text style={[styles.actionIcon, { color: editable ? '#EF4444' : COLORS.placeholder }]}>🗑️</Text>
                </TouchableOpacity>
              </View>
            </Card>
          );
        }}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No bookings found</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 24,
    marginBottom: 8,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  infoBannerRed: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff0f0',
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 6,
    padding: 8,
    elevation: 2,
  },
  infoBannerGreen: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0fff0',
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 8,
    elevation: 2,
  },
  infoIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  infoTextRed: {
    color: '#EF4444',
    fontSize: 14,
    flex: 1,
  },
  infoTextGreen: {
    color: '#22C55E',
    fontSize: 14,
    flex: 1,
  },
  refreshLabel: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
  },
  listContainer: {
    paddingBottom: 24,
    paddingHorizontal: 8,
  },
  bookingCard: {
    marginBottom: 16,
    backgroundColor: '#fff8f0',
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  libraryName: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
    gap: 12,
  },
  label: {
    fontSize: 14,
    color: COLORS.text,
    marginRight: 8,
  },
  value: {
    fontWeight: '700',
    color: COLORS.primary,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  actionBtn: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    marginLeft: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  actionBtnDisabled: {
    opacity: 0.5,
  },
  actionIcon: {
    fontSize: 20,
    fontWeight: '700',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.placeholder,
  },
});

export default BookingsScreen; 