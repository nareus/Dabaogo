/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {BORDER_RADIUS} from '../../styles/mixins';
import {PADDING_LEFT} from '../../styles/spacing';
import {BACKEND_URL} from '../../utils/links';
import HalfPadding from '../atoms/HalfPadding';
import OrderBottom from './OrderBottom';
import ProgressBar from './ProgressBar';

const OrderProgress = ({
  orderId,
  arrivalTime,
  transporterId,
  transporterName,
}) => {
  /*
    Current status includes
    1. Finding food transporter
    2. on the way there
    3. waiting for food
    4. on the way back
    5. Food has been delivered!
    6. Delivered // this is a dummy, to stop delivered from flashing
    */

  // console.log(orderId, transporterId, transporterName);

  const [currentStatus, setCurrentStatus] = useState('on the way there');

  const [isDone, setIsDone] = useState([true, false, false, false, false]);
  const [orderDetails, setOrderDetails] = useState({});
  const [transporter, setTransporter] = useState({});
  const [isLoading, setLoading] = useState(true);

  // setTimeout(() => {
  //   console.log('getting data');
  //   getData();
  // }, 10000);

  const getData = async () => {
    try {
      const responseTransporter = await axios.get(
        `${BACKEND_URL}/transporters?transporterId=${transporterId}`,
      );
      setTransporter(responseTransporter.data[0]);
      const response = await axios.get(
        `${BACKEND_URL}/orders?orderId=${orderId}`,
      );
      setOrderDetails(response.data[0]);
      // setIsDone(
      //   orderDetails.foundTransporter,
      //   orderDetails.reachedOutlet,
      //   orderDetails.orderPickedUp,
      //   orderDetails.delivered,
      //   false,
      // );
      // setMenuItems(response.data.popular);
      // setMainMenu(response.data.restOfItems);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    return () => {
      getData();
      setLoading(true);
      setTransporter({});
      setOrderDetails({});
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.container}>
          <Text style={styles.text}>Estimated Arrival</Text>
          <Text style={styles.estimatedArrival}>{arrivalTime}</Text>
          <HalfPadding />
          <ProgressBar currentStatus={currentStatus} isDone={isDone} />
          <HalfPadding />
          {currentStatus === 'Food has been delivered!' ||
          currentStatus === 'Finding food transporter' ||
          currentStatus === 'Delivered' ? (
            <Text style={styles.orderStatus}>{currentStatus}</Text>
          ) : (
            <Text style={styles.orderStatus}>
              {transporterName} is {currentStatus}
            </Text>
          )}
        </View>
      )}
    </>
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
