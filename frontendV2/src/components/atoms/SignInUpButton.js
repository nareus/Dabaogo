import * as React from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import {GRAY_DARK, GRAY_MEDIUM, SECONDARY} from '../../styles/colors';
import {BORDER_RADIUS} from '../../styles/mixins';

const SignInUpButton = props =>
  props.disabled ? (
    <View style={styles(props).disabled}>
      <Text style={styles(props).text}>{props.title}</Text>
    </View>
  ) : (
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
    disabled: {
      elevation: 8,
      borderRadius: BORDER_RADIUS,
      paddingVertical: 10,
      paddingHorizontal: 12,
      backgroundColor: GRAY_MEDIUM,
    },
    text: {
      fontSize: 18,
      color: props.color,
      fontWeight: 'bold',
      alignSelf: 'center',
    },
  });

export default SignInUpButton;
