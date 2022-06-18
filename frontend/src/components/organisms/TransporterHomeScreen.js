import * as React from 'react';
import {StyleSheet, View, SafeAreaView, Text} from 'react-native';
import RestaurantScroll from '../molecules/RestaurantScroll';
import TopBarHome from '../molecules/TopBarHome';
import OrdersToTakeUp from '../atoms/OrdersToTakeUp';
import DepartureTime from '../atoms/DepartureTime';
import RestaurantToVisit from '../atoms/LocationToVisit';
import BottomBarTransporterHome from '../molecules/BottomBarTransporterHome';
import LocationToVisit from '../atoms/LocationToVisit';

const TransporterHomeScreen = () => {
  return (
    <View style={{backgroundColor: '#fafafa', flex: 1}}>
      <View style={{flex: 1}}>
        <LocationToVisit
          text={'Restaurant to visit'}
          location={'Yong Tau Fu @ Fine Foods'}
        />
        <OrdersToTakeUp />
        <DepartureTime />
      </View>
      <BottomBarTransporterHome style={{marginTop: 'auto'}} />
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

export default TransporterHomeScreen;
