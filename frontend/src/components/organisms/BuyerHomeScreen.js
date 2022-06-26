import * as React from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import RestaurantScroll from '../molecules/RestaurantScroll';
import TopBarHome from '../molecules/TopBarHome';

const BuyerHomeScreen = () => {
  return (
    <View style={{backgroundColor: '#fafafa', flex: 1}}>
      <RestaurantScroll />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // alignSelf: 'stretch',
    height: 40,
    // paddingBottom: 60,
    flexDirection: 'row', // row
    alignItems: 'center',
    justifyContent: 'space-between', // center, space-around
    // paddingLeft: 10,
    // paddingRight: 10
  },
});

export default BuyerHomeScreen;
