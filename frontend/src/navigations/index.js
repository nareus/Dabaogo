import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../scenes/home/home';
import SettingsScreen from '../scenes/settings/settings';
import SignInScreen from '../scenes/signIn/signIn';
import SignUpScreen from '../scenes/signUp/signUp';
import ForgotPasswordScreen from '../scenes/forgotPassword/forgotPassword';
import LandingScreen from '../scenes/landingScreen/landing';

const Stack = createNativeStackNavigator();

const Navigator = () =>  {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={LandingScreen} options={{headerShown: false}} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} options={{headerShown: false}}/>
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
