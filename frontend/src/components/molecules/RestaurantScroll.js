import React from 'react';
import {StyleSheet, View} from 'react-native';
import Padding from '../atoms/Padding';
import RestaurantCard from '../atoms/RestaurantCard';

const RestaurantScroll = ({navigate}) => {
  return (
    <View style={styles.container}>
      <Padding />
      <RestaurantCard onPress={navigate} />
      <Padding />
      <RestaurantCard onPress={navigate} />
      <Padding />
      <RestaurantCard onPress={navigate} />
      <Padding />
      <RestaurantCard onPress={navigate} />
      <Padding />
      <RestaurantCard onPress={navigate} />
      <Padding />
      <RestaurantCard onPress={navigate} />
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
