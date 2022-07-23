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
  const [isLoading, setLoading] = useState(true);
  const {user} = useSelector((state: RootState) => state.user);
  const userId = user.userId;
  const socket = io(BACKEND_URL);

  socket.emit('join', {userId, outletId});
  socket.on('connect', () => {
    // console.log(socket.connected);
  });

  useEffect(() => {
    getMaxOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  socket.on('update', orderNum => {
    updateMaxOrder(orderNum);
  });

  const getMaxOrders = async () => {
    const response = await axios.get(
      `${BACKEND_URL}/transporters/maxOrders?userId=${userId}&outletId=${outletId}`,
    );
    const data = response.data;
    updateMaxOrder(data);
    setLoading(false);
  };

  return isLoading ? (
    <></>
  ) : (
    <View style={styles.bigContainer}>
      <View style={styles.container}>
        <Text style={styles.text}>Max number of orders is: {maxOrder}</Text>
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
