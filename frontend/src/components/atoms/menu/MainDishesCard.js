import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { convertToMoney } from '../../../constants';
import { GAP_FORM_FIELD, PADDING_LEFT } from '../../../styles/spacing';
import IncrementDecrement from '../button/IncrementDecrementButton';

const MainDishesCard = ({
  // name,
  // description,
  // price,
  // id,
  element,
  addItem,
  removeItem
}) => {
  const [counter, setCounter] = useState(0);

  const incrementer = () => {
    setCounter(counter + 1);
    addItem(element, element.price);
  };

  const decrementer = () => {
    setCounter(counter - 1);
    removeItem(element, element.price);
  };

  return (
    <View>
      {counter === 0
        ? (
          <TouchableOpacity style={styles.container} onPress={incrementer}>
            <Text style={styles.dishName}>{element.name}</Text>
            <Text style={styles.description}>{element.description}</Text>
            <Text style={styles.dishPrice}>{convertToMoney(element.price)}</Text>
          </TouchableOpacity>
        )
        : (
          <View style={styles.container}>
            <Text style={styles.dishName}>{element.name}</Text>
            <Text style={styles.description}>{element.description}</Text>
            <View style={styles.row}>
              <Text style={styles.dishPriceSelected}>
                {convertToMoney(element.price)}
              </Text>
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
  container: {
    justifyContent: 'center',
    padding: PADDING_LEFT,
    height: 120,
    backgroundColor: 'white'
  },
  dishName: {
    fontWeight: 'bold',
    paddingBottom: 10,
    color: 'black'
  },
  description: {
    fontSize: 12,
    color: 'black'
  },
  dishPrice: {
    fontWeight: 'bold',
    paddingTop: GAP_FORM_FIELD,
    color: '#FF9E9E'
  },
  dishPriceSelected: {
    fontWeight: 'bold',
    color: '#FF9E9E'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center'
  }
});

export default MainDishesCard;
