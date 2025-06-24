import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, Alert, RefreshControl, StatusBar } from 'react-native';
import { Card } from '../components/common';
import { COLORS } from '../constants/colors';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useNavigation } from '@react-navigation/native';
import { getMyBookings, cancelBooking } from '../services/api';
import { getToken } from '../utils/auth';

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
  const navigation = useNavigation<any>();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const token = await getToken();
        const res = await getMyBookings(token!);
        setBookings(res);
      } catch (err) {
        setError('Failed to load bookings');
      }
      setLoading(false);
    };
    fetchBookings();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000); // Placeholder refresh
  };

  const handleEdit = (id: string) => {
    const booking = bookings.find(b => b._id === id);
    if (!booking) return;
    const room = LIBRARY_ROOMS.find(r => r.id === booking.roomId);
    navigation.navigate('SeatBooking', {
      roomId: booking.roomId,
      roomName: booking.libraryId?.name || booking.libraryId,
      total: room ? room.total : 30,
      selectedSeats: booking.seatIds,
      startDate: booking.fromDate,
      endDate: booking.toDate,
    });
  };
  const handleDelete = async (id: string) => {
    Alert.alert('Cancel Booking', 'Are you sure you want to cancel this booking?', [
      { text: 'No' },
      { text: 'Yes', onPress: async () => {
        try {
          const token = await getToken();
          await cancelBooking(token!, id);
          // Refresh bookings
          const res = await getMyBookings(token!);
          setBookings(res);
          Alert.alert('Booking cancelled');
        } catch (err) {
          Alert.alert('Failed to cancel booking');
        }
      }}
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6366F1" />
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <Text style={styles.welcomeText}>Your</Text>
            <Text style={styles.userName}>Bookings</Text>
          </View>
          <TouchableOpacity style={styles.profileButton} activeOpacity={0.8}>
            <Text style={styles.profileIcon}>👤</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        ListHeaderComponent={
          <>
            {/* Info Cards */}
            <View style={styles.statsContainer}>
              <View style={styles.statsRow}>
                <View style={[styles.statCard, styles.editCard]}>
                  <Text style={styles.statCardIcon}>📝</Text>
                  <Text style={styles.statCardLabel}>You can change your booked seats before 5 days of the from date.</Text>
                </View>
                <View style={[styles.statCard, styles.deleteCard]}>
                  <Text style={styles.statCardIcon}>❗</Text>
                  <Text style={styles.statCardLabel}>You can cancel your booked seats before 5 days of the from date.</Text>
                </View>
              </View>
            </View>
            {/* Pull to Refresh Label */}
            <Text style={styles.refreshLabel}>🔄 Pull to refresh</Text>
          </>
        }
        data={bookings}
        keyExtractor={item => item._id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => {
          const editable = canEditOrDelete(item.fromDate);
          return (
            <View style={styles.bookingCard}>
              <View style={styles.bookingHeader}>
                <View style={styles.bookingIconContainer}>
                  <Text style={styles.bookingIcon}>📚</Text>
                </View>
                <View style={styles.bookingInfo}>
                  <Text style={styles.libraryName}>{item.libraryId?.name || item.libraryId}</Text>
                  <Text style={styles.bookingCapacity}>Seats: {item.seatIds.length}</Text>
                </View>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>From: <Text style={styles.value}>{item.fromDate}</Text></Text>
                <Text style={styles.label}>To: <Text style={styles.value}>{item.toDate}</Text></Text>
              </View>
              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={[styles.actionBtn, !editable && styles.actionBtnDisabled]}
                  onPress={() => handleEdit(item._id)}
                  disabled={!editable}
                >
                  <Text style={[styles.actionIcon, { color: editable ? '#22C55E' : COLORS.placeholder }]}>📝</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionBtn, !editable && styles.actionBtnDisabled]}
                  onPress={() => handleDelete(item._id)}
                  disabled={!editable}
                >
                  <Text style={[styles.actionIcon, { color: editable ? '#EF4444' : COLORS.placeholder }]}>🗑️</Text>
                </TouchableOpacity>
              </View>
            </View>
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
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#6366F1',
    paddingTop: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  headerLeft: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: '#E0E7FF',
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  statsContainer: {
    paddingHorizontal: 24,
    marginTop: -15,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    flexDirection: 'row',
    gap: 8,
  },
  editCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
  },
  deleteCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
  },
  statCardIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  statCardLabel: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
    flex: 1,
    flexWrap: 'wrap',
  },
  refreshLabel: {
    color: '#6366F1',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '500',
  },
  listContainer: {
    paddingBottom: 24,
    paddingHorizontal: 8,
  },
  bookingCard: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    padding: 20,
  },
  bookingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  bookingIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  bookingIcon: {
    fontSize: 20,
  },
  bookingInfo: {
    flex: 1,
  },
  libraryName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 2,
  },
  bookingCapacity: {
    fontSize: 14,
    color: '#6B7280',
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
    color: '#6366F1',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 4,
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