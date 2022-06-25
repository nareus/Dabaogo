import * as React from 'react';
import {StyleSheet, View, SafeAreaView, Text} from 'react-native';
import RestaurantScroll from '../molecules/RestaurantScroll';
import TopBarHome from '../molecules/TopBarHome';
import OrdersToTakeUp from '../atoms/OrdersToTakeUp';
import DepartureTime from '../atoms/DepartureTime';
import RestaurantToVisit from '../atoms/LocationToVisit';
import BottomBarTransporterHome from '../molecules/BottomBarTransporterHome';
import LocationToVisit from '../atoms/LocationToVisit';
import {BACKGROUND_COLOR} from '../../styles/colors';

const TransporterHomeScreen = () => {
  return (
    <View style={styles.container}>
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
    backgroundColor: BACKGROUND_COLOR,
    flex: 1,
  },
});

export default TransporterHomeScreen;
