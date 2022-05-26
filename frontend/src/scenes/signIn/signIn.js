import React from 'react';
import {SafeAreaView, Text, TouchableHighlight} from 'react-native';
import ToggleSignInUp from '../../components/molecules/ToggleSignInUp';

const SignInScreen = ({navigation}) => (
  <SafeAreaView>
    <ToggleSignInUp 
      selectionMode={1}
      roundCorner={true}
      option1={'Sign In'}
      option2={'Sign Up'}
      onSelectSwitch={(index) => console.log(index)}
      selectionColor={'#F19896'}/>

    <Text>Screen: SignIn</Text>

    <TouchableHighlight onPress={() => navigation.navigate('Home')}>
      <Text>Go to home</Text>
    </TouchableHighlight>
  </SafeAreaView>
);

export default SignInScreen;