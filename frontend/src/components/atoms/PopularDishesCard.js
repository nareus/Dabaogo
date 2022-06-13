import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import {GAP_FORM_FIELD} from '../../styles/spacing';

const PopularDishesCard = ({title, price}) => {
  const onPress = () => {
    // navigateToPlaceOrderScreen();
    console.log('hello there');
  };

  return (
    <View style={{paddingRight: GAP_FORM_FIELD * 2}}>
      <TouchableOpacity style={styles.touchableOpacity} onPress={onPress}>
        <Text style={styles.dishName}>{title}</Text>
        <Text style={styles.dishPrice}>{price}</Text>
      </TouchableOpacity>
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
    backgroundColor: 'white',
  },
  dishName: {
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  dishPrice: {
    fontWeight: 'bold',
    color: '#FF9E9E',
  },
});

export default PopularDishesCard;
