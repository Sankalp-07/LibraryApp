import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { Button } from '../components/common';
import { GLOBAL } from '../styles/global';
import { COLORS } from '../constants/colors';

const ProfileScreen = () => {
  return (
    <SafeAreaView style={GLOBAL.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>JD</Text>
        </View>
        <Text style={styles.userName}>John Doe</Text>
        <Text style={styles.userEmail}>john.doe@example.com</Text>
      </View>
      <View style={styles.menuSection}>
        <Button text="Edit Profile" onPress={() => {}} style={styles.menuButton} textStyle={styles.menuText} />
        <Button text="Reading History" onPress={() => {}} style={styles.menuButton} textStyle={styles.menuText} />
        <Button text="Notifications" onPress={() => {}} style={styles.menuButton} textStyle={styles.menuText} />
        <Button text="Settings" onPress={() => {}} style={styles.menuButton} textStyle={styles.menuText} />
      </View>
      <Button text="Log Out" onPress={() => {}} style={styles.logoutButton} textStyle={styles.logoutText} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 24,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 8,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '700',
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 4,
  },
  userEmail: {
    fontSize: 14,
    color: COLORS.placeholder,
    marginTop: 2,
  },
  menuSection: {
    marginBottom: 24,
  },
  menuButton: {
    backgroundColor: COLORS.backgroundAlt,
    marginVertical: 4,
    borderRadius: 16,
    paddingVertical: 12,
  },
  menuText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#ff3b30',
    borderRadius: 16,
    paddingVertical: 12,
    marginTop: 8,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default ProfileScreen; 