import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import Padding from '../../components/atoms/Padding';
import RestaurantScroll from '../../components/molecules/RestaurantScroll';
import TopBar from '../../components/molecules/TopBar';
import TopBarHome from '../../components/molecules/TopBarHome';

const ChangeRestaurantScreen = props => {
  const onPress = id => {
    // console.log(id.id);
    // if (id in selectedRestaurants) {
    //   // remove it
    //   selectRestaurant(oldArray => {
    //     let counter = 0;
    //     while (oldArray[counter].id !== id) {
    //       counter++;
    //     }
    //     oldArray.splice(counter, 1);
    //     return [...oldArray];
    //   });
    // } else {
    //   // add the id to it
    //   selectRestaurant(oldArray => [...oldArray, id]);
    // }
    props.selectRestaurant(id);
    props.navigation.goBack();
  };

  useEffect(() => {}, []);

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Padding />
        <Padding />
        <Padding />
        <Padding />
        <Padding />
        <RestaurantScroll onPress={onPress} />
      </ScrollView>
      <TopBar
        onPress={() => props.navigation.goBack()}
        text={'Taiwanese'}
        iconName={'chevron-left'}
        iconType={'feather'}
      />
    </View>
  );
};

export default ChangeRestaurantScreen;
