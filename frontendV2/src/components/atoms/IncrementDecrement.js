import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
  import {PRIMARY} from '../../styles/colors';

const IncrementDecrement = ({count, decrement, increment}) => (
  <View style={styles.choose}>
    <TouchableOpacity onPress={decrement}>
      <Icon name={'minus-circle'} type={'feather'} size={20} color={PRIMARY} />
    </TouchableOpacity>
    <View style={styles.box}>
      <Text style={styles.numOrders}>{count}</Text>
    </View>
    <TouchableOpacity onPress={increment}>
      <Icon name={'plus-circle'} type={'feather'} size={20} color={PRIMARY} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  choose: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  box: {
    height: 32,
    backgroundColor: '#f19896',
    justifyContent: 'center',
    padding: 7,
    marginLeft: 7,
    marginRight: 7,
    borderRadius: 5,
  },
  numOrders: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default IncrementDecrement;
