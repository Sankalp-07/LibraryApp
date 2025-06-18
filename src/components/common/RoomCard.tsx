import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { COLORS } from '../../constants/colors';

interface RoomCardProps {
  name: string;
  total: number;
  avail: number;
  book: number;
  onPress?: () => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ name, total, avail, book, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
    {/* Left Icon (placeholder) */}
    <View style={styles.iconWrap}>
      {/* Replace with actual icon if available */}
      <View style={styles.iconPlaceholder} />
    </View>
    {/* Text Block */}
    <View style={styles.textBlock}>
      <Text style={styles.nameLabel}>Name:</Text>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.statsRow}>
        <Text style={styles.stat}>Total: <Text style={styles.statValue}>{total}</Text></Text>
        <Text style={styles.stat}>Avail: <Text style={styles.statValue}>{avail}</Text></Text>
        <Text style={styles.stat}>Book: <Text style={styles.statValue}>{book}</Text></Text>
      </View>
    </View>
    {/* Right Arrow (placeholder) */}
    <View style={styles.arrowWrap}>
      <Text style={styles.arrow}>{'>'}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundAlt,
    borderRadius: 20,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  iconWrap: {
    marginRight: 16,
  },
  iconPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#D9D9D9',
  },
  textBlock: {
    flex: 1,
  },
  nameLabel: {
    fontSize: 12,
    color: COLORS.placeholder,
    fontWeight: '600',
  },
  name: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '700',
    marginBottom: 4,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  stat: {
    fontSize: 12,
    color: COLORS.text,
    marginRight: 12,
  },
  statValue: {
    fontWeight: '700',
    color: COLORS.primary,
  },
  arrowWrap: {
    marginLeft: 12,
  },
  arrow: {
    fontSize: 24,
    color: COLORS.placeholder,
    fontWeight: '700',
  },
});

export default RoomCard; 