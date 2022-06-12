import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {GAP_FORM_FIELD, PADDING_LEFT} from '../../styles/spacing';

const MainDishesCard = ({name, description, price}) => {
  const onPress = () => {
    // navigateToPlaceOrderScreen();
    console.log('hello i am a popular dishes card');
  };

  return (
    // <View style={{paddingRight: GAP_FORM_FIELD * 2}}>
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.dishName}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.dishPrice}>{price}</Text>
    </TouchableOpacity>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: PADDING_LEFT,
    height: 120,
    backgroundColor: 'white',
  },
  dishName: {
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  description: {
    fontSize: 12,
  },
  dishPrice: {
    fontWeight: 'bold',
    paddingTop: GAP_FORM_FIELD,
    color: '#FF9E9E',
  },
});

export default MainDishesCard;
