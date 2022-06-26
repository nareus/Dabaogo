import * as React from 'react';
import {Icon} from '@rneui/themed';
// import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {BORDER_RADIUS} from '../../styles/mixins';

const GeneralButton = props => (
  <TouchableOpacity style={styles(props).button} onPress={props.onPress}>
    <Icon
      name={props.iconName}
      type={props.iconType}
      size={props.size}
      color={props.color}
    />
  </TouchableOpacity>
);

const styles = props =>
  StyleSheet.create({
    button: {
      borderRadius: 30,
      alignItems: 'center',
      left: props.position === 'absolute' ? 10 : 0,
      position: props.position,
      backgroundColor: props.backgroundColor,
      padding: 10,
    },
  });

export default GeneralButton;
