import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {PRIMARY} from '../../styles/colors';
import {BORDER_RADIUS} from '../../styles/mixins';
import {PADDING_LEFT} from '../../styles/spacing';

const OrderLocationTracker = ({text, orders, duration}) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../images/map.png')} style={styles.image} />
      <View style={styles.top}>
        <Text style={styles.title}>{text}</Text>
        <Text style={styles.duration}>{duration}</Text>
      </View>
      <View style={styles.time}>
        {orders.map((order, index) => (
          <View style={styles.orderRow} key={index}>
            <Text style={styles.text}>{order.quantity}x </Text>
            <Text style={styles.text}>{order.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS,
    // marginTop: PADDING_LEFT,
  },
  orderRow: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // padding: PADDING_LEFT,
  },
  duration: {
    fontWeight: 'bold',
    color: PRIMARY,
  },
  top: {
    padding: PADDING_LEFT,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 5,
  },
  time: {
    padding: PADDING_LEFT,
    backgroundColor: '#f19896',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
  image: {
    height: 200,
    width: '100%',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  restaurantToVisit: {
    fontWeight: 'bold',
  },
  locationToVisit: {
    fontWeight: 'bold',
    color: 'white',
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
  },
});
export default OrderLocationTracker;
