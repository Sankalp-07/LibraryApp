import React from 'react';
import { TextInput, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  secureTextEntry?: boolean;
}

const Input: React.FC<InputProps> = ({ value, onChangeText, placeholder, style, inputStyle, secureTextEntry }) => (
  <TextInput
    style={[styles.input, inputStyle, style]}
    value={value}
    onChangeText={onChangeText}
    placeholder={placeholder}
    placeholderTextColor="#A0AEC0"
    secureTextEntry={secureTextEntry}
  />
);

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#F6F2F2', // Figma input background
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#222',
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
});

export default Input; 