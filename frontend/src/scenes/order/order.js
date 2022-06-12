import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import MenuCategoryText from '../../components/atoms/MenuCategoryText';
import RestaurantCard from '../../components/atoms/RestaurantCard';
import PopularDishesScroll from '../../components/molecules/PopularDishesScroll';
import TopBarOrder from '../../components/molecules/TopBarOrder';
import RestOfMenuItems from '../../components/organisms/RestOfMenuItems';
import {BACKGROUND_COLOR} from '../../styles/colors';

const OrderScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <RestaurantCard />
        <MenuCategoryText text={'Popular Dishes'} />
        <PopularDishesScroll />
        <RestOfMenuItems />
      </ScrollView>
      <TopBarOrder />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND_COLOR,
    flex: 1,
  },
});

export default OrderScreen;
