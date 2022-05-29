import * as React from 'react';
import {Icon} from '@rneui/themed';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {BORDER_RADIUS} from '../../styles/mixins';

const ExitButton = ({onPress, backgroundColor, color}) => (
  <TouchableOpacity style={styles(backgroundColor).button} onPress={onPress}>
    <Icon name="cross" type="entypo" color={color} />
  </TouchableOpacity>
);

const styles = props =>
  StyleSheet.create({
    button: {
      borderRadius: BORDER_RADIUS,
      alignItems: 'center',
      position: 'absolute',
      backgroundColor: props,
      padding: 20,
    },
  });

export default ExitButton;
