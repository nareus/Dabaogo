import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {BUTTON_TEXT_2, PRIMARY} from '../../styles/colors';
import {PADDING_LEFT} from '../../styles/spacing';
import Padding from '../atoms/Padding';
import SignInUpButton from '../atoms/SignInUpButton';

const OrderBottom = props => {
  return (
    <View style={styles.container}>
      <View style={styles.orderRow}>
        <Text style={styles.text}>Total</Text>
        <Text style={styles.text}>${props.price}</Text>
      </View>
      <Padding />
      <SignInUpButton
        backgroundColor={PRIMARY}
        color={BUTTON_TEXT_2}
        title="Place Order"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: PADDING_LEFT,
    backgroundColor: 'white',
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // padding: 10,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
export default OrderBottom;
