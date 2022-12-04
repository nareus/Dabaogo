import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import PasswordFormElement from '../molecules/auth/PasswordFormElement';
import PhoneFormElement from '../molecules/auth/PhoneFormElement';
import FormElement from '../molecules/auth/TextFormElement';
import { FORM_WIDTH } from '../../styles/mixins';
import FormErrorAndSubmit from '../molecules/auth/FormErrorAndSubmit';
import axios from 'axios';
import { BACKEND_URL } from '../../utils/links';
import LocationFormElement from '../molecules/homePage/LocationFormElement';
import { hostelData } from '../../constants';

const SignUpForm = ({ navigate }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [password, setPassword] = useState('');

  const authenticate = async () => {
    if (firstName && lastName && email && phone && password !== '') {
      const response = await axios.post(`${BACKEND_URL}/register`, {
        phone: parseInt(phone, 10),
        password,
        firstName,
        lastName,
        email,
        location: location.title
      });
      const {
        emailUnique,
        emailValid,
        firstNameValid,
        lastNameValid,
        passwordValid,
        phoneUnique,
        phoneValid
      } = response.data;
      if (typeof response.data.id !== 'undefined') {
        return [false, '', '', response.data.id];
      } else if (!firstNameValid) {
        return [
          true,
          'First name invalid',
          'Please ensure the name does not contain numbers'
        ];
      } else if (!lastNameValid) {
        return [
          true,
          'Last name invalid',
          'Please ensure the name does not contain numbers'
        ];
      } else if (!emailValid) {
        return [
          true,
          'Email invalid',
          'Please ensure that a valid email has been provided'
        ];
      } else if (!emailUnique) {
        return [
          true,
          'An account with this email exists',
          'Please use another email'
        ];
      } else if (!phoneValid) {
        return [
          true,
          'Phone number invalid',
          'Please ensure that you have provided a valid phone number without country code'
        ];
      } else if (!phoneUnique) {
        return [
          true,
          'An account with this phone number exists',
          'Please use another phone number'
        ];
      } else if (!passwordValid) {
        return [true, '', 'Password should be at least 8 characters'];
      }
    }
    return [
      true,
      'All fields are required',
      'Enter the required information into every field'
    ];
  };

  return (
    <View style={styles.container}>
      <View style={{ width: FORM_WIDTH }}>
        <FormElement
          text={'First Name'}
          inputText={firstName}
          onChangeText={setFirstName}
        />
        <FormElement
          text={'Last Name'}
          inputText={lastName}
          onChangeText={setLastName}
        />
        <LocationFormElement onSelect={setLocation} data={hostelData} />
        <FormElement text={'Email'} inputText={email} onChangeText={setEmail} />
        <PhoneFormElement inputText={phone} onChangeText={setPhone} />
        <PasswordFormElement inputText={password} onChangeText={setPassword} />
      </View>
      <FormErrorAndSubmit
        signInUp={'Sign Up'}
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

export default SignUpForm;
