import * as React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {BORDER_RADIUS} from '../../styles/mixins';

const SignInUpButton = props => (
  <TouchableOpacity
    onPress={props.onPress}
    style={styles(props).touchableOpacity}>
    <Text style={styles(props).text}>{props.title}</Text>
  </TouchableOpacity>
);

const styles = props =>
  StyleSheet.create({
    touchableOpacity: {
      elevation: 8,
      borderRadius: BORDER_RADIUS,
      paddingVertical: 10,
      paddingHorizontal: 12,
      backgroundColor: props.backgroundColor,
    },
    text: {
      fontSize: 18,
      color: props.color,
      fontWeight: 'bold',
      alignSelf: 'center',
    },
  });

export default SignInUpButton;
