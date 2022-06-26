import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {BORDER_RADIUS} from '../../styles/mixins';
import {PADDING_LEFT} from '../../styles/spacing';
import HalfPadding from '../atoms/HalfPadding';
import OrderBottom from './OrderBottom';
import ProgressBar from './ProgressBar';

const OrderProgress = () => {
  /*
    Current status includes
    1. Finding food transporter
    2. on the way there
    3. waiting for food
    4. on the way back
    5. Food has been delivered!
    6. Done // this is a dummy, to stop delivered from flashing
    */
  const [currentStatus, setCurrentStatus] = useState(
    'Finding food transporter',
  );
  const [isDone, setIsDone] = useState([true, false, false, false, false]);
  const [foodTransporter, setFoodTransporter] = useState('Naren Sreekanth');

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Estimated Arrival</Text>
      <Text style={styles.estimatedArrival}>20:15 - 20:20</Text>
      <HalfPadding />
      <ProgressBar currentStatus={currentStatus} isDone={isDone} />
      <HalfPadding />
      {currentStatus === 'Food has been delivered!' ||
      currentStatus === 'Finding food transporter' ? (
        <Text style={styles.orderStatus}>{currentStatus}</Text>
      ) : (
        <Text style={styles.orderStatus}>
          {foodTransporter} is {currentStatus}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    borderRadius: BORDER_RADIUS,
    padding: PADDING_LEFT,
  },
  estimatedArrival: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  text: {
    opacity: 0.5,
    fontSize: 15,
    fontWeight: 'bold',
  },
  orderStatus: {
    // fontWeight: 'bold',
    fontSize: 15,
  },
});

export default OrderProgress;
