import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { Input, Button } from '../components/common';
import { GLOBAL } from '../styles/global';
import { COLORS } from '../constants/colors';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={GLOBAL.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Login</Text>
      </View>
      <View style={styles.form}>
        <Input
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          style={styles.input}
        />
        <Input
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          style={styles.input}
        />
        <Button text="Login" onPress={() => {}} style={styles.button} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 48,
    marginBottom: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.primary,
  },
  form: {
    marginTop: 24,
    paddingHorizontal: 8,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
});

export default LoginScreen; 