import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { convertToMoney } from '../../../constants';
import { BUTTON_TEXT_2, PRIMARY } from '../../../styles/colors';
import { PADDING_LEFT } from '../../../styles/spacing';
import Padding from '../../atoms/style/Padding';
import SignInUpButton from '../../atoms/button/SignInUpButton';

const OrderBottom = props => {
  return (
    <View style={styles.container}>
      <View style={styles.orderRow}>
        <Text style={styles.text}>Total</Text>
        <Text style={styles.text}>{convertToMoney(props.price)}</Text>
      </View>
      <Padding />
      <SignInUpButton
        backgroundColor={PRIMARY}
        color={BUTTON_TEXT_2}
        title="Place Order"
        onPress={props.onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: PADDING_LEFT,
    backgroundColor: 'white'
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
    // padding: 10,
  },
  text: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold'
  }
});
export default OrderBottom;
