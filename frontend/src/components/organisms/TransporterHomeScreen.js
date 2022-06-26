import React, {useState} from 'react';
import {StyleSheet, View, SafeAreaView, Text} from 'react-native';
import RestaurantScroll from '../molecules/RestaurantScroll';
import TopBarHome from '../molecules/TopBarHome';
import OrdersToTakeUp from '../molecules/OrdersToTakeUp';
import DepartureTime from '../atoms/DepartureTime';
import RestaurantToVisit from '../atoms/LocationToVisit';
import BottomBarTransporterHome from '../molecules/BottomBarTransporterHome';
import LocationToVisit from '../atoms/LocationToVisit';
import {BACKGROUND_COLOR} from '../../styles/colors';

const TransporterHomeScreen = props => {
  const deliveryFee = 1.0;
  const [count, setCount] = useState(0);
  const [totalPrice, setPrice] = useState(0);

  const increment = () => {
    setCount(count + 1);
    setPrice(deliveryFee * (count + 1));
  };

  const decrement = () => {
    setCount(count - 1);
    setPrice(deliveryFee * (count - 1));
  };

  return (
    <View style={styles.bigContainer}>
      <View style={styles.container}>
        <LocationToVisit
          text={'Restaurant to visit'}
          location={'Yong Tau Fu @ Fine Foods'}
        />
        <OrdersToTakeUp
          count={count}
          decrement={decrement}
          increment={increment}
        />
        <DepartureTime />
      </View>
      <View style={{position: 'relative', paddingTop: 60}}>
        <BottomBarTransporterHome price={totalPrice} onPress={props.navigate} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bigContainer: {
    backgroundColor: BACKGROUND_COLOR,
    flex: 1,
  },
  container: {
    width: '90%',
    alignSelf: 'center',
  },
});

export default TransporterHomeScreen;
