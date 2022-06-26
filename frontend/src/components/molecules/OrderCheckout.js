import React from 'react';
import {StyleSheet, View} from 'react-native';
import ViewBasketButton from '../atoms/ViewBasketButton';

const OrderCheckout = ({numItems, totalPrice, onPress}) => {
  return (
    <View style={styles.container}>
      <ViewBasketButton
        numItems={numItems}
        totalPrice={totalPrice}
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    bottom: 0,
    backgroundColor: 'white',
  },
});
export default OrderCheckout;
