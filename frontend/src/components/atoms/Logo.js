import React from 'react';
import {Text, StyleSheet} from 'react-native';

const Logo = ({text}) => {
  return <Text style={styles.title}>{text}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Avenir-Heavy',
    color: '#F19896',
    fontSize: 45,
  },
});

export default Logo;
