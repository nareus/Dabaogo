import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import OrdersToTakeUp from '../molecules/OrdersToTakeUp';
import DepartureTime from '../atoms/DepartureTime';
import BottomBarTransporterHome from '../molecules/BottomBarTransporterHome';
import RestaurantToVisit from '../atoms/RestaurantToVisit';
import {BACKGROUND_COLOR} from '../../styles/colors';
import axios from 'axios';
import {BACKEND_URL} from '../../utils/links';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {RootState} from '../../redux';
import {IRestaurant} from '../../redux/transporterSlice';

const TransporterHomeScreen = (props: any) => {
  const deliveryFee = 1.0;
  const [count, setCount] = useState(1);
  const [totalPrice, setPrice] = useState(deliveryFee * count);
  const navigation = useNavigation();
  const {departureTime, restaurantsSelected} = useSelector(
    (state: RootState) => state.transporter,
  );
  const {user} = useSelector((state: RootState) => state.user);

  const orderToTakeupInc = () => {
    setCount(count + 1);
    setPrice(deliveryFee * (count + 1));
  };

  const orderToTakeupDec = () => {
    if (count > 1) {
      setCount(count - 1);
      setPrice(deliveryFee * (count - 1));
    }
  };

  const onPress = async () => {
    const outlets = restaurantsSelected.map(
      (restaurant: IRestaurant) => restaurant.outletId,
    ); // id of taiwanese outlet
    const transporterId = user.userId;
    const depTime = departureTime;
    const maxOrders = count;
    const hostel = user.location;

    // TO CHANGE
    const data = {
      transporterId,
      depTime,
      maxOrders,
      hostel,
      outlets,
    };

    try {
      const response = await axios.post(`${BACKEND_URL}/transporters`, data);
      if (response.status === 200) {
        props.navigate();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.bigContainer}>
      <View style={styles.container}>
        <RestaurantToVisit
          text={'Restaurant(s) to visit'}
          onChangeButtonPress={() => navigation.navigate('ChangeRestaurant')}
        />
        <OrdersToTakeUp
          count={count}
          decrement={orderToTakeupDec}
          increment={orderToTakeupInc}
        />
        <DepartureTime />
      </View>
      <View style={styles.bottomBar}>
        <BottomBarTransporterHome price={totalPrice} onPress={onPress} />
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
  bottomBar: {
    position: 'relative',
  },
});

export default TransporterHomeScreen;
