import * as React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {BORDER_RADIUS} from '../../styles/mixins';

const SignInUpButton = ({onPress, title, color, backgroundColor}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      elevation: 8,
      borderRadius: BORDER_RADIUS,
      paddingVertical: 10,
      paddingHorizontal: 12,
      backgroundColor: backgroundColor,
    }}>
    <Text
      style={{
        fontSize: 18,
        color: color,
        fontWeight: 'bold',
        alignSelf: 'center',
      }}>
      {title}
    </Text>
  </TouchableOpacity>
);

export default SignInUpButton;
