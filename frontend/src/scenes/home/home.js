import React from 'react';
import {SafeAreaView} from 'react-native';
import {Button} from 'react-native-elements';
import Logo from '../../components/atoms/Logo';

const HomeScreen = ({navigation}) => (
  <SafeAreaView>
    <Logo text={'Welcome to Dabaogo'} />
    <Button onPress={navigation.navigate('Order')} />
  </SafeAreaView>
);

export default HomeScreen;
