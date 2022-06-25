import React from 'react';
import {StyleSheet, View} from 'react-native';
import Padding from '../atoms/Padding';
import RestaurantCard from '../atoms/RestaurantCard';

const RestaurantScroll = ({onPress}) => {
  return (
    <View style={styles.container}>
      <Padding />
      <RestaurantCard onPress={onPress} />
      <Padding />
      <RestaurantCard onPress={onPress} />
      <Padding />
      <RestaurantCard onPress={onPress} />
      <Padding />
      <RestaurantCard onPress={onPress} />
      <Padding />
      <RestaurantCard onPress={onPress} />
      <Padding />
      <RestaurantCard onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: '90%',
  },
});

export default RestaurantScroll;
