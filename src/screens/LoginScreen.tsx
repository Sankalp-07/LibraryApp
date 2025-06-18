import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Input, Button } from '../components/common';
import { GLOBAL } from '../styles/global';
import { COLORS } from '../constants/colors';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topSpace} />
      <View style={styles.card}>
        <Text style={styles.loginTitle}>LOGIN</Text>
        <View style={styles.inputContainer}>
          <Input
            value={email}
            onChangeText={setEmail}
            placeholder="Email*"
            style={styles.input}
            inputStyle={styles.inputText}
          />
          <Input
            value={password}
            onChangeText={setPassword}
            placeholder="Password*"
            secureTextEntry
            style={styles.input}
            inputStyle={styles.inputText}
          />
        </View>
        <Button text="LOGIN" onPress={() => {}} style={styles.button} textStyle={styles.buttonText} />
        <Text style={styles.orText}>- OR -</Text>
        <Text style={styles.signInWith}>sign in with</Text>
        <TouchableOpacity style={styles.googleButton}>
          <Image source={require('../assets/google.png')} style={styles.googleIcon} />
        </TouchableOpacity>
        <View style={styles.createAccountContainer}>
          <Text style={styles.createAccountText}>Don't have an account ? </Text>
          <TouchableOpacity onPress={() => navigation?.navigate('CreateAccount')}>
            <Text style={styles.createAccountLink}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    justifyContent: 'flex-end',
  },
  topSpace: {
    flex: 1.2,
    backgroundColor: COLORS.backgroundAlt,
    // borderTopLeftRadius: 32,
    // borderTopRightRadius: 32,
    marginBottom: -32,
  },
  card: {
    backgroundColor: COLORS.brown,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
    alignItems: 'stretch',
    minHeight: 420,
    justifyContent: 'flex-start',
  },
  loginTitle: {
    color: COLORS.textLight,
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 16,
    marginLeft: 2,
  },
  inputContainer: {
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'transparent',
    borderColor: COLORS.textLight,
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 14,
    paddingHorizontal: 12,
    height: 44,
  },
  inputText: {
    color: COLORS.textLight,
  },
  button: {
    backgroundColor: COLORS.textLight,
    borderRadius: 6,
    marginTop: 4,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#222',
    fontWeight: '700',
    fontSize: 16,
    marginTop: -5
  },
  orText: {
    color: COLORS.textLight,
    textAlign: 'center',
    marginVertical: 8,
    fontSize: 14,
  },
  signInWith: {
    color: COLORS.textLight,
    textAlign: 'center',
    fontSize: 13,
    marginBottom: 6,
  },
  googleButton: {
    alignSelf: 'center',
    marginBottom: 16,
    marginTop: 2,
  },
  googleIcon: {
    width: 38,
    height: 38,
    resizeMode: 'contain',
  },
  createAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  createAccountText: {
    color: COLORS.textLight,
    fontSize: 13,
  },
  createAccountLink: {
    color: '#000',
    fontWeight: '700',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen; 