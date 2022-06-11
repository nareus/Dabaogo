import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../scenes/home/home';
import SettingsScreen from '../scenes/settings/settings';
import ForgotPasswordScreen from '../scenes/forgotPassword/forgotPassword';
import LandingScreen from '../scenes/landingScreen/landing';
import AuthScreen from '../scenes/auth/auth';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import AuthReducer from '../redux/reducer/AuthReducer';
import OrderScreen from '../scenes/order/orderv2';

const Stack = createNativeStackNavigator();

const store = createStore(AuthReducer);

const Navigator = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Order">
          <Stack.Screen
            name="Landing"
            component={LandingScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />
          {/* <Stack.Screen
            name="Order"
            component={OrderScreen}
            options={{headerShown: false}}
          /> */}
          <Stack.Screen
            name="Order"
            component={OrderScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default Navigator;
