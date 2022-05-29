import React from 'react';
import {TextInput} from 'react-native';
import {FORM_INPUT_TEXT} from '../../styles/colors';

const FormInput = ({
  placeholder,
  onChangeText,
  showText = false,
}) => {
  return (
    <TextInput
      style={{
        fontWeight: 'bold',
        color: FORM_INPUT_TEXT,
        flex: 2,
        paddingRight: 10,
      }}
      placeholderTextColor={FORM_INPUT_TEXT}
      placeholder={placeholder}
      onChangeText={onChangeText}
      secureTextEntry={showText}
    />
  );
};

export default FormInput;
