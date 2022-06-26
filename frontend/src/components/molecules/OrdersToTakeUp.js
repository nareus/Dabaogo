import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {PADDING_LEFT} from '../../styles/spacing.js';
import IncrementDecrement from '../atoms/IncrementDecrement.js';

const OrdersToTakeUp = ({decrement, increment}) => {
  return (
    <View style={styles.main}>
      <Text style={styles.text}>Orders to take up</Text>
      <IncrementDecrement count={4} style={styles.toggle} />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    height: 50,
    width: '95%',
    marginLeft: '2.5%',
    marginRight: '2.5%',
    marginTop: 20,
    borderRadius: 5,
    padding: PADDING_LEFT,
  },
  text: {
    fontSize: 17,
    fontWeight: 'bold',
    flex: 2,
    // paddingLeft: 10,
    // paddingTop: 10,
    // paddingBottom: 10,
  },
  toggle: {
    flex: 1,
  },
  number: {
    display: 'flex',
    fontSize: 15,
    paddingBottom: 2,
    padddingTop: 2,
    marginLeft: 5,
    marginRight: 5,
  },
});

export default OrdersToTakeUp;
