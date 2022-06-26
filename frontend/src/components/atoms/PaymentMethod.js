import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {BORDER_RADIUS} from '../../styles/mixins';
import {PADDING_LEFT} from '../../styles/spacing';
import TextButton from './TextButton';

const PaymentMethod = onPress => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Paynow</Text>
      <TextButton text={'Change'} onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
  },
  container: {
    padding: PADDING_LEFT,
    borderRadius: BORDER_RADIUS,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default PaymentMethod;
