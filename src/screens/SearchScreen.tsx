import React, { useState } from 'react';
import { View, Text, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { Input, Card } from '../components/common';
import { GLOBAL } from '../styles/global';
import { COLORS } from '../constants/colors';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={GLOBAL.container}>
      <View style={styles.searchContainer}>
        <Input
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search books..."
          style={styles.searchInput}
        />
      </View>
      <FlatList
        data={[]} // We'll add actual data later
        renderItem={({ item }) => (
          <Card style={styles.bookCard}>
            <Text style={styles.bookTitle}>Book Title</Text>
            <Text style={styles.bookAuthor}>Author Name</Text>
          </Card>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No books found</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    marginTop: 24,
    marginBottom: 8,
  },
  searchInput: {
    borderRadius: 16,
  },
  listContainer: {
    paddingBottom: 24,
  },
  bookCard: {
    marginBottom: 12,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  bookAuthor: {
    fontSize: 14,
    color: COLORS.primary,
    marginTop: 4,
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

export default SearchScreen; 