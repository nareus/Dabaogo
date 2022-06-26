import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-elements';
import {PRIMARY} from '../../styles/colors';
import {BORDER_RADIUS} from '../../styles/mixins';

const ViewBasketButton = ({numItems, totalPrice, onPress}) => {
  return (
    <TouchableOpacity style={styles.touchableOpacity} onPress={onPress}>
      <View style={styles.numItems}>
        <Text style={styles.text}>{numItems}</Text>
      </View>
      <Text style={styles.text}>View Basket</Text>
      <Text style={styles.text}>
        $
        {totalPrice - Math.floor(totalPrice) === 0
          ? totalPrice + '.00'
          : totalPrice}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  numItems: {
    padding: 5,
    backgroundColor: '#CF8280',
  },
  text: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  touchableOpacity: {
    elevation: 8,
    borderRadius: BORDER_RADIUS,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: PRIMARY,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignItems: 'center',
  },
});

export default ViewBasketButton;
