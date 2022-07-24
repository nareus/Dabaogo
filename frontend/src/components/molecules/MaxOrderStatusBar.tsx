import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import {PRIMARY} from '../../styles/colors';
import {io} from 'socket.io-client';
import {BACKEND_URL} from '../../utils/links';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux';
import axios from 'axios';

const MaxOrderStatusBar = ({outletId}) => {
  const [maxOrder, updateMaxOrder] = useState(0);
  const {user} = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const socket = io(`${BACKEND_URL}/maxOrders`);

    socket.emit('join', user.userId, outletId);
    socket.on('connect', () => {
      console.log(socket.connected);
    });
    socket.on('update', orderNum => {
      console.log(orderNum);
      updateMaxOrder(orderNum);
    });
    return () => {
      updateMaxOrder(0);
    };
  }, []);

  return (
    <View style={styles.bigContainer}>
      <View style={styles.container}>
        <Text style={styles.text}>Max number of orders is {maxOrder}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    // alignContent: 'center',
    // paddingLeft: 30,
    flexDirection: 'row',
    width: '100%',
  },
  bigContainer: {
    // paddingBottom: 100,
    width: '100%',
    position: 'relative',
    // color: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: PRIMARY,
    elevation: 4,
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
  },
});

export default MaxOrderStatusBar;
