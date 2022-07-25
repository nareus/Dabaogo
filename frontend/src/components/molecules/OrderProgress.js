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
import {io} from 'socket.io-client';
import {useDispatch, useSelector} from 'react-redux';
import {updateBuyerState} from '../../redux/transporterSlice';

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

  const [currentStatus, setCurrentStatus] = useState(
    'Finding food transporter',
  );

  const [isDone, setIsDone] = useState([0, 0, 0, 0, 0]);
  const [orderDetails, setOrderDetails] = useState({});
  const [transporter, setTransporter] = useState({});
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user);

  // setTimeout(() => {
  //   console.log('getting data');
  //   getData();
  // }, 10000);

  useEffect(() => {
    const socket = io(`${BACKEND_URL}/transporterStatus`);

    socket.emit('join', user.userId);
    socket.on('connect', () => {});
    socket.on('update', data => {
      // console.log('response is', data);

      dispatch(updateBuyerState(data));
      // console.log('dataItems is', isDone);
      if (data[0]) {
        setCurrentStatus('on the way there');
      }
      if (data[1]) {
        setCurrentStatus('waiting for food');
      }
      if (data[2]) {
        setCurrentStatus('on the way back');
      }
      if (data[3]) {
        setCurrentStatus('Food has been delivered!');
      }
      if (data[4]) {
        setCurrentStatus('Complete!');
      }

      setLoading(false);
    });

    const getData = async () => {
      console.log('transporter id is', transporterId);
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
    getData().catch(console.error);
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
          <Text style={styles.estimatedArrivalTime}>{arrivalTime}</Text>
          <HalfPadding />
          {/* <ProgressBar currentStatus={currentStatus} />
          <HalfPadding /> */}
          {currentStatus === 'Food has been delivered!' ||
          currentStatus === 'Finding food transporter' ||
          currentStatus === 'Complete!' ? (
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
  estimatedArrivalTime: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  orderStatus: {
    // fontWeight: 'bold',
    fontSize: 15,
  },
});

export default OrderProgress;
