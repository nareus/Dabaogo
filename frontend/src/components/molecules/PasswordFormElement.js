import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {LINE_COLOR} from '../../styles/colors';
import {FORM_LINE_WIDTH} from '../../styles/mixins';
import FormInput from '../atoms/FormInput';
import FormText from '../atoms/FormText';

const PasswordFormElement = ({inputText, onChangeText}) => {
  const [showPassword, setVisibility] = useState(true);

  return (
    <View style={styles.container}>
      <FormText text={'Password'} />
      <FormInput
        placeholder={'at least 8 characters'}
        onChangeText={onChangeText}
        inputText={inputText}
        showText={showPassword}
      />
      <TouchableOpacity
        style={styles.showPasswordButton}
        onPress={() => setVisibility(!showPassword)}>
        <Text style={styles.showPasswordText}>Show</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomColor: LINE_COLOR,
    borderBottomWidth: FORM_LINE_WIDTH,
  },
  showPasswordButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10,
  },
  showPasswordText: {
    fontWeight: 'bold',
  },
});

export default PasswordFormElement;
