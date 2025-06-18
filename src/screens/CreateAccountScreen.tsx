import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Input, Button } from '../components/common';
import { GLOBAL } from '../styles/global';
import { COLORS } from '../constants/colors';

const CreateAccountScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={[GLOBAL.container, { backgroundColor: COLORS.background || '#faf6f3' }]}> 
      <View style={styles.topSpace} />
      <View style={styles.formContainer}>
        <Text style={styles.headerTitle}>CREATE ACCOUNT</Text>
        <View style={styles.inputContainer}>
        <Input
          value={name}
          onChangeText={setName}
          placeholder="Name*"
          style={styles.input}
          inputStyle={styles.inputText}

        />
        <Input
          value={email}
          onChangeText={setEmail}
          placeholder="Email*"
          style={styles.input}
          inputStyle={styles.inputText}

        />
        <Input
          value={number}
          onChangeText={setNumber}
          placeholder="Number*"
          style={styles.input}
          inputStyle={styles.inputText}

        />
        <Input
          value={address}
          onChangeText={setAddress}
          placeholder="Address*"
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
        <Button text="CREATE" onPress={() => {}} style={styles.button} textStyle={styles.buttonText} />
        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Have an account ? </Text>
          <TouchableOpacity onPress={() => navigation?.navigate('Login')}> 
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topSpace: {
    flex: 1,
    backgroundColor: COLORS.background || '#faf6f3',
  },
  formContainer: {
    backgroundColor: COLORS.brown,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingTop: 24,
    alignItems: 'stretch',
    width: '100%',
    marginHorizontal: 0, // Ensure no margin
    alignSelf: 'stretch', // This helps in flex layouts
    flex: 0,
  },
  inputContainer: {
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 16,
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
    marginTop: 0,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
    marginTop: -5,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  loginText: {
    color: '#fff',
    fontSize: 14,
  },
  loginLink: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
    textDecorationLine: 'underline',

  },
});

export default CreateAccountScreen; 