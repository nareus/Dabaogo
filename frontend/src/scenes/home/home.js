import * as React from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import RestaurantScroll from '../../components/molecules/RestaurantScroll'
import TopBarHome from '../../components/molecules/TopBarHome';

const HomeScreen = () => {
  return (
    <View style={{backgroundColor: '#fafafa', flex: 1, }}>
      <TopBarHome/>
      <RestaurantScroll/>
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

export default HomeScreen;