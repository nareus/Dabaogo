import React from 'react';
import {SafeAreaView, Text, TouchableHighlight} from 'react-native';

const ForgotPasswordScreen = ({navigation}) => (
  <SafeAreaView>
    <Text>Screen: ForgotPasswordScreen</Text>

    <TouchableHighlight onPress={() => navigation.navigate('SignIn')}>
      <Text>Go back</Text>
    </TouchableHighlight>
  </SafeAreaView>
);

export default ForgotPasswordScreen;