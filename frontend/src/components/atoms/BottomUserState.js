import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {PRIMARY} from '../../styles/colors';
import {PADDING_LEFT} from '../../styles/spacing';
import Padding from '../atoms/Padding';

const BottomUserState = props => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <View style={styles.orderRow}>
        <ActivityIndicator size={25} style={styles.indicator} color={'white'} />
        <Text style={styles.text}>View Order Progress</Text>
      </View>
      <Padding />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: PADDING_LEFT,
    backgroundColor: PRIMARY,
    paddingBottom: 25,
  },
  orderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    // padding: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  indicator: {
    paddingLeft: 20,
    paddingRight: 35,
  },
});
export default BottomUserState;
