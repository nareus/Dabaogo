import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BORDER_RADIUS } from '../../../styles/mixins';
import { PADDING_LEFT } from '../../../styles/spacing';
import HalfPadding from '../../atoms/style/HalfPadding';
import TransporterProgressBar from './TransporterProgressBar';

const TransporterOrderProgress = props => {
  /*
    Current status includes
    1. Finding food transporter
    2. on the way there
    3. waiting for food
    4. on the way back
    5. Food has been delivered!
    6. Done // this is a dummy, to stop delivered from flashing
    */

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Estimated Arrival</Text>
      <Text style={styles.estimatedArrival}>13:00</Text>
      <HalfPadding />
      <TransporterProgressBar
        currentStatus={props.currentStatus}
        isDone={props.isDone}
      />
      <HalfPadding />
      {props.currentStatus === 'Food has been delivered!' ||
      props.currentStatus === 'Finding food transporter'
        ? (
          <Text style={styles.orderStatus}>{props.currentStatus}</Text>
        )
        : (
          <Text style={styles.orderStatus}>{props.currentStatus}</Text>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    borderRadius: BORDER_RADIUS,
    padding: PADDING_LEFT
  },
  estimatedArrival: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black'
  },
  text: {
    opacity: 0.5,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black'
  },
  orderStatus: {
    // fontWeight: 'bold',
    fontSize: 15,
    color: 'black'
  }
});

export default TransporterOrderProgress;
