import React from 'react';
import {SafeAreaView, Text, TouchableHighlight, View} from 'react-native';
import { Icon } from 'react-native-elements';
import ToggleSignInUp from '../../components/molecules/ToggleSignInUp';

const SignUpScreen = ({navigation}) => (
  <SafeAreaView>
    
    <View style={{paddingTop: 10}}>
      <ToggleSignInUp 
        selectionMode={2}
        roundCorner={true}
        option1={'Sign In'}
        option2={'Sign Up'}
        onSelectSwitch={(index) => console.log(index)}
        selectionColor={'#F19896'}/>
    </View>
    {/* <Icon raised
        name='rowing'
        color='#f50'
        onPress={() => console.log('hello')}/> */}
    <Text>Screen: SignUp</Text>

    <TouchableHighlight onPress={() => navigation.navigate('Home')}>
      <Text>Go to home</Text>
    </TouchableHighlight>
  </SafeAreaView>
);

export default SignUpScreen;