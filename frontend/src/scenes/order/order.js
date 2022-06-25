import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import GeneralButton from '../../components/atoms/GeneralButton';
import MenuCategoryText from '../../components/atoms/MenuCategoryText';
import RestaurantCardOrder from '../../components/atoms/RestaurantCardOrder';
import PopularDishesScroll from '../../components/molecules/PopularDishesScroll';
import TopBarAuth from '../../components/molecules/TopBarAuth';
import TopBarOrder from '../../components/molecules/TopBarOrder';
import RestOfMenuItems from '../../components/organisms/RestOfMenuItems';
import {BACKGROUND_COLOR} from '../../styles/colors';

const OrderScreen = props => {
  return (
    <View style={styles.container}>
      {/* <TopBarAuth /> */}

      <ScrollView showsVerticalScrollIndicator={false}>
        <RestaurantCardOrder />
        <MenuCategoryText text={'Popular Dishes'} />
        <PopularDishesScroll />
        <RestOfMenuItems />
      </ScrollView>
      {/* <View style={{position: 'absolute', top: 30}}>
        <GeneralButton />
      </View> */}
      <TopBarOrder onPress={() => props.navigation.navigate('Home')} />
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
