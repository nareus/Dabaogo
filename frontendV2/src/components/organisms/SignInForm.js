import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import PasswordFormElement from '../molecules/auth/PasswordFormElement';
import PhoneFormElement from '../molecules/auth/PhoneFormElement';
import { FORM_WIDTH } from '../../styles/mixins';
import axios from 'axios';
import { BACKEND_URL } from '../../utils/links';
import FormErrorAndSubmit from '../molecules/auth/FormErrorAndSubmit';

const SignInForm = ({ navigate }) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const authenticate = async () => {
    if (phone && password !== '') {
      const phoneNum = parseInt(phone, 10);
      const response = await axios.post(`${BACKEND_URL}/login`, {
        phone: phoneNum,
        password
      });
      if (response.data.accepted === true) {
        return [false, '', '', response.data.id];
      }
      return [true, '', 'Invalid phone number or password provided'];
    } else {
      return [
        true,
        'All fields are required',
        'Enter the required information into every field'
      ];
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: FORM_WIDTH
        }}>
        <PhoneFormElement inputText={phone} onChangeText={setPhone} />
        <PasswordFormElement inputText={password} onChangeText={setPassword} />
      </View>
      <FormErrorAndSubmit
        signInUp={'Sign In'}
        authenticate={authenticate}
        navigate={navigate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  }
});

export default SignInForm;
