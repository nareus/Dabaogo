import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { convertToMoney } from '../../../constants';
import { GAP_FORM_FIELD } from '../../../styles/spacing';
import IncrementDecrement from '../button/IncrementDecrementButton';

const PopularDishesCard = ({ title, price, id, addItem, removeItem }) => {
  const [counter, setCounter] = useState(0);

  const incrementer = () => {
    setCounter(counter + 1);
    addItem(id, price);
  };

  const decrementer = () => {
    setCounter(counter - 1);
    removeItem(id, price);
  };

  return (
    <View style={{ paddingRight: GAP_FORM_FIELD * 2 }}>
      {counter === 0
        ? (
          <TouchableOpacity style={styles.touchableOpacity} onPress={incrementer}>
            <Text style={styles.dishName}>{title}</Text>
            <Text style={styles.dishPrice}>{convertToMoney(price)}</Text>
          </TouchableOpacity>
        )
        : (
          <View style={styles.touchableOpacity}>
            <Text style={styles.dishNameSelected}>{title}</Text>
            <View style={styles.row}>
              <Text style={styles.dishPrice}>{convertToMoney(price)}</Text>
              <IncrementDecrement
                count={counter}
                increment={incrementer}
                decrement={decrementer}
              />
            </View>
          </View>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  touchableOpacity: {
    // width: 100,
    // borderRadius: 20,
    padding: 10,
    width: 180,
    height: 80,
    backgroundColor: 'white'
  },
  dishName: {
    fontWeight: 'bold',
    paddingBottom: 14
  },
  dishNameSelected: {
    fontWeight: 'bold'
  },
  dishPrice: {
    fontWeight: 'bold',
    color: '#FF9E9E'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

export default PopularDishesCard;
