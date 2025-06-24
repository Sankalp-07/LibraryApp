import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { getLibraries } from '../services/api';

const { width: screenWidth } = Dimensions.get('window');

type Room = {
  id: string;
  name: string;
  total: number;
  booked?: number;
  available?: number;
};

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [libraries, setLibraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const bookings = useSelector((state: RootState) => state.booking.bookings);

  useEffect(() => {
    const fetchLibraries = async () => {
      setLoading(true);
      try {
        const libs = await getLibraries();
        setLibraries(libs);
      } catch (err) {
        Alert.alert('Error', String(err))
        setError('Failed to load libraries');
      }
      setLoading(false);
    };
    fetchLibraries();
  }, []);

  const getRoomStats = (room: Room): Room => {
    const roomBookings = bookings[room.id] || {};
    const bookedSet = new Set<number>();
    Object.values(roomBookings).forEach(dateObj => {
      Object.keys(dateObj).forEach(seatNum => {
        bookedSet.add(Number(seatNum));
      });
    });
    const booked = bookedSet.size;
    const available = room.total - booked;
    return { ...room, booked, available };
  };

  const roomsWithStats: Room[] = libraries.map(getRoomStats);

  const getTotalStats = () => {
    const totalSeats = roomsWithStats.reduce((sum, room) => sum + room.total, 0);
    const totalAvailable = roomsWithStats.reduce((sum, room) => sum + (room.available || 0), 0);
    const totalBooked = roomsWithStats.reduce((sum, room) => sum + (room.booked || 0), 0);
    return { totalSeats, totalAvailable, totalBooked };
  };

  const { totalSeats, totalAvailable, totalBooked } = getTotalStats();

  const handleRoomPress = (room: Room) => {
    navigation.navigate('SeatBooking', { 
      roomId: room.id, 
      roomName: room.name, 
      total: room.total 
    });
  };

  const handleProfilePress = () => {
  };

  const renderRoomCard = (room: Room) => (
    <TouchableOpacity
      key={room.id}
      style={styles.roomCard}
      onPress={() => handleRoomPress(room)}
      activeOpacity={0.8}
    >
      <View style={styles.roomHeader}>
        <View style={styles.roomIconContainer}>
          <Text style={styles.roomIcon}>📚</Text>
        </View>
        <View style={styles.roomInfo}>
          <Text style={styles.roomName}>{room.name}</Text>
          <Text style={styles.roomCapacity}>Capacity: {room.total} seats</Text>
        </View>
        <View style={styles.arrowContainer}>
          <Text style={styles.arrowIcon}>›</Text>
        </View>
      </View>
      
      <View style={styles.roomStats}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{room.available}</Text>
          <Text style={styles.statLabel}>Available</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, styles.bookedNumber]}>{room.booked}</Text>
          <Text style={styles.statLabel}>Booked</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${((room.booked || 0) / (room.total || 1)) * 100}%` }
              ]} 
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6366F1" />
      
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <Text style={styles.welcomeText}>Welcome back</Text>
            <Text style={styles.userName}>John Doe</Text>
          </View>
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={handleProfilePress}
            activeOpacity={0.8}
          >
            <Text style={styles.profileIcon}>👤</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <View style={[styles.statCard, styles.totalCard]}>
              <Text style={styles.statCardNumber}>{totalSeats}</Text>
              <Text style={styles.statCardLabel}>Total Seats</Text>
            </View>
            <View style={[styles.statCard, styles.availableCard]}>
              <Text style={[styles.statCardNumber, styles.availableNumber]}>{totalAvailable}</Text>
              <Text style={styles.statCardLabel}>Available</Text>
            </View>
            <View style={[styles.statCard, styles.bookedCard]}>
              <Text style={[styles.statCardNumber, styles.bookedCardNumber]}>{totalBooked}</Text>
              <Text style={styles.statCardLabel}>Booked</Text>
            </View>
          </View>
        </View>

        {/* Quote Card */}
        <View style={styles.quoteContainer}>
          <View style={styles.quoteCard}>
            <Text style={styles.quoteText}>
              "A room <Text style={styles.quoteHighlight}>without</Text> books{'\n'}
              is like a <Text style={styles.quoteHighlight}>body</Text>{'\n'}
              without a <Text style={styles.quoteHighlight}>soul</Text>."
            </Text>
            <Text style={styles.quoteAuthor}>- Marcus Tullius Cicero</Text>
          </View>
        </View>

        {/* Rooms Section */}
        <View style={styles.roomsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Library Rooms</Text>
            <Text style={styles.roomCount}>{libraries.length} rooms</Text>
          </View>
          
          <View style={styles.roomsList}>
            {roomsWithStats.map(renderRoomCard)}
          </View>
        </View>
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  statsContainer: {
    paddingHorizontal: 24,
    marginTop: -15,
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  totalCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#6366F1',
  },
  availableCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
  },
  bookedCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  statCardNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  availableNumber: {
    color: '#10B981',
  },
  bookedCardNumber: {
    color: '#F59E0B',
  },
  statCardLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  quoteContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  quoteCard: {
    backgroundColor: '#6366F1',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  quoteText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 12,
  },
  quoteHighlight: {
    fontWeight: '700',
    color: '#FEF3C7',
  },
  quoteAuthor: {
    fontSize: 14,
    color: '#E0E7FF',
    fontStyle: 'italic',
  },
  roomsSection: {
    paddingHorizontal: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  roomCount: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  roomsList: {
    gap: 12,
  },
  roomCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  roomHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  roomIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  roomIcon: {
    fontSize: 20,
  },
  roomInfo: {
    flex: 1,
  },
  roomName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  roomCapacity: {
    fontSize: 14,
    color: '#6B7280',
  },
  arrowContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowIcon: {
    fontSize: 20,
    color: '#9CA3AF',
    fontWeight: '300',
  },
  roomStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    minWidth: 60,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#10B981',
    marginBottom: 2,
  },
  bookedNumber: {
    color: '#F59E0B',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
  },
  progressBarContainer: {
    flex: 1,
    marginLeft: 16,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#F59E0B',
    borderRadius: 3,
  },
});

export default HomeScreen;