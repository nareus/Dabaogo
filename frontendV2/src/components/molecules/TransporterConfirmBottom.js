import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {BUTTON_TEXT_2, PRIMARY} from '../../styles/colors';
import {PADDING_LEFT} from '../../styles/spacing';
import Padding from '../atoms/Padding';
import SignInUpButton from '../atoms/SignInUpButton';

const TransporterConfirmBottom = props => {
  return (
    <View style={styles.container}>
      <View style={styles.orderRow}>
        <Text style={styles.text}>Profit</Text>
        <Text style={styles.price}>{props.price}</Text>
      </View>
      <View style={styles.orderRow}>
        <Text style={styles.text}>Total Price</Text>
        <Text style={styles.price}>{props.totalPrice}</Text>
      </View>
      <Padding />
      {props.dataLength === 0 ? (
        <SignInUpButton
          disabled={false}
          onPress={props.cancelPress}
          backgroundColor={'red'}
          color={BUTTON_TEXT_2}
          title={'Cancel Transporter'}
        />
      ) : (
        <SignInUpButton
          disabled={props.processing}
          onPress={props.onPress}
          backgroundColor={PRIMARY}
          color={BUTTON_TEXT_2}
          title={props.buttonTitle}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: PADDING_LEFT,
    paddingRight: PADDING_LEFT,
    paddingTop: PADDING_LEFT,
    paddingBottom: PADDING_LEFT * 2,
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
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: PRIMARY,
  },
});
export default TransporterConfirmBottom;
