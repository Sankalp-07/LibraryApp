import React from 'react';
import { View, Text, ScrollView, SafeAreaView, Image, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GLOBAL } from '../styles/global';
import { COLORS } from '../constants/colors';
import { Card, RoomCard } from '../components/common';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const LIBRARY_ROOMS = [
  { id: '1', name: 'Reading Hall', total: 30, avail: 15, book: 0 },
  { id: '2', name: 'Reference Room', total: 20, avail: 10, book: 0 },
  { id: '3', name: 'Children Section', total: 25, avail: 20, book: 0 },
  { id: '4', name: 'Study Room A', total: 12, avail: 8, book: 0 },
  { id: '5', name: 'Study Room B', total: 10, avail: 6, book: 0 },
  { id: '6', name: 'Multimedia Room', total: 8, avail: 5, book: 0 },
  { id: '7', name: 'Silent Zone', total: 15, avail: 12, book: 0 },
];
const screenHeight = Dimensions.get('window').height;

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const bookings = useSelector((state: RootState) => state.booking.bookings);

  // Calculate number of bookings for each room (across all dates)
  const getBookingCount = (roomId: string) => {
    const roomBookings = bookings[roomId];
    if (!roomBookings) return 0;
    const bookedSet = new Set();
    Object.values(roomBookings).forEach(dateObj => {
      Object.keys(dateObj).forEach(seatNum => {
        bookedSet.add(seatNum);
      });
    });
    return bookedSet.size;
  };

  const handleRoomPress = (room: { id: string; name: string; total: number }) => {
    navigation.navigate('SeatBooking', { roomId: room.id, roomName: room.name, total: room.total });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      {/* Header Section */}
      <View style={styles.headerBg}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.welcome}>Welcome</Text>
            <Text style={styles.userName}>Name surname</Text>
          </View>
          <Image
            source={require('../assets/Profile.png')}
            style={styles.profileImg}
            resizeMode="cover"
          />
        </View>
      </View>
      {/* Quote Card */}
      <View style={styles.quoteCardWrap}>
        <View style={styles.quoteCard}>
          <Text style={styles.quoteText}>
            A Room <Text style={styles.quoteHighlight}>without</Text> Books{"\n"}
            is like a <Text style={styles.quoteHighlight}>Body</Text>{"\n"}
            without a <Text style={styles.quoteHighlight}>Soul</Text>.
          </Text>
        </View>
      </View>
      {/* Library Room List */}
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <Text style={styles.sectionTitle}>Library Rooms</Text>
        <FlatList
          data={LIBRARY_ROOMS}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            const booked = getBookingCount(item.id);
            const available = item.total - booked;
            return (
              <TouchableOpacity
                style={styles.roomCard}
                onPress={() => handleRoomPress(item)}
              >
                <View>
                  <Text style={styles.roomName}>{item.name}</Text>
                  <Text style={styles.roomStats}>Total: {item.total}  |  Available: {available}  |  Booked: {booked}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerBg: {
    backgroundColor: '#684D2D',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 32,
    height: 300,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  welcome: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '400',
    marginBottom: 4,
  },
  userName: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '400',
  },
  profileImg: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#D9D9D9',
  },
  quoteCardWrap: {
    alignItems: 'center',
    marginTop: -screenHeight * 0.18,
    marginBottom: 24,
  },
  quoteCard: {
    backgroundColor: '#874F0F',
    borderRadius: 10,
    padding: 24,
    width: 303,
    alignItems: 'center',
  },
  quoteText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '400',
  },
  quoteHighlight: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginVertical: 16,
    marginLeft: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginTop: 8,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
    paddingVertical: 16,
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primary,
  },
  roomCard: {
    backgroundColor: '#f3e9dd',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  roomName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#684D2D',
  },
  roomStats: {
    fontSize: 15,
    color: '#684D2D',
    marginTop: 4,
  },
});

export default HomeScreen; 