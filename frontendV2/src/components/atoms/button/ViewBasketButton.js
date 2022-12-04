import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { convertToMoney } from '../../../constants';
import { PRIMARY } from '../../../styles/colors';
import { BORDER_RADIUS } from '../../../styles/mixins';
;

const ViewBasketButton = ({ numItems, totalPrice, onPress }) => {
  return (
    <TouchableOpacity style={styles.touchableOpacity} onPress={onPress}>
      <View style={styles.numItems}>
        <Text style={styles.text}>{numItems}</Text>
      </View>
      <Text style={styles.text}>View Basket</Text>
      <Text style={styles.text}>{convertToMoney(totalPrice)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  numItems: {
    padding: 5,
    backgroundColor: '#CF8280',
    borderRadius: BORDER_RADIUS
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
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
    alignItems: 'center'
  }
});

export default ViewBasketButton;
