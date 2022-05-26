import React from 'react';
import {Text, StyleSheet} from 'react-native';

const Logo = () => {
  return <Text style={styles.title}>DABAOGO</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Avenir-Heavy',
    color: '#F19896',
    fontSize: 45,
  },
});

export default Logo;
