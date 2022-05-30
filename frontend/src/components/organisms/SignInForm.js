import React, {useState} from 'react';
import {View} from 'react-native';

import PasswordFormElement from '../molecules/PasswordFormElement';
import PhoneFormElement from '../molecules/PhoneFormElement';
import {FORM_WIDTH} from '../../styles/mixins';
import axios from 'axios';
import {BACKEND_URL} from '../../utils/links';
import FormErrorAndSubmit from '../molecules/FormErrorAndSubmit';

const SignInForm = ({navigate}) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const authenticate = async () => {
    if (phone && password != '') {
      const phoneNum = parseInt(phone);
      const response = await axios.post(`${BACKEND_URL}/login`, {
        phone: phoneNum,
        password: password,
      });
      if (response.data.accepted == true) {
        return [false, '', ''];
      }
      return [true, '', 'Invalid phone number or password provided'];
    } else {
      return [
        true,
        'All fields are required',
        'Enter the required information into every field',
      ];
    }
  };

  return (
    <View style={{alignItems: 'center'}}>
      <View
        style={{
          width: FORM_WIDTH,
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

export default SignInForm;
