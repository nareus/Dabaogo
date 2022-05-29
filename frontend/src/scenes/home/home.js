import React from 'react';
import {SafeAreaView} from 'react-native';
import Logo from '../../components/atoms/Logo';

const HomeScreen = ({navigation}) => (
  <SafeAreaView>
    <Logo text={"Welcome to Dabaogo"}/>
  </SafeAreaView>
);

export default HomeScreen;