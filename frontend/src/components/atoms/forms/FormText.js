import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FormText = ({ text }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 42,
    width: '28%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    paddingRight: 18
  },
  text: {
    // fontWeight: 'bold',
    // color: 'black',
    color: 'black',
    fontWeight: '600',
    fontSize: 14
  }
});

export default FormText;
