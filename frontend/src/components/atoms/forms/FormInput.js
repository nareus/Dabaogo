import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { FORM_INPUT_TEXT } from '../../../styles/colors';

const FormInput = ({ placeholder, onChangeText, showText = false, autoCapitalize = 'none' }) => {
  return (
    <TextInput
      style={styles.textInput}
      placeholderTextColor={FORM_INPUT_TEXT}
      placeholder={placeholder}
      onChangeText={onChangeText}
      secureTextEntry={showText}
      autoCapitalize={autoCapitalize}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    fontWeight: 'bold',
    color: FORM_INPUT_TEXT,
    flex: 2,
    paddingRight: 10
  }
});

export default FormInput;
