import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import OrdersToTakeUp from '../molecules/OrdersToTakeUp';
import DepartureTime from '../atoms/DepartureTime';
import BottomBarTransporterHome from '../molecules/BottomBarTransporterHome';
import LocationToVisit from '../atoms/LocationToVisit';
import {BACKGROUND_COLOR} from '../../styles/colors';
import axios from 'axios';
import {BACKEND_URL} from '../../utils/links';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {userLogin} from '../../redux/action/UserActions';

const TransporterHomeScreen = props => {
  const deliveryFee = 1.0;
  const [count, setCount] = useState(1);
  const [totalPrice, setPrice] = useState(deliveryFee * count);
  const [restaurant, setRestaurant] = useState({});

  console.log(props.user);

  const increment = () => {
    setCount(count + 1);
    setPrice(deliveryFee * (count + 1));
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
      setPrice(deliveryFee * (count - 1));
    }
  };

  const onPress = async () => {
    const outletId = 0; // id of taiwanese outlet
    const transporterId = props.user.userId;
    const depTime = '12:00:00';
    const maxOrders = count;
    const hostel = 'tembusu';

    const data = {
      transporterId,
      depTime,
      maxOrders,
      hostel,
      outletId,
    };

    try {
      const response = await axios.post(`${BACKEND_URL}/transporters`, data);
      console.log(response);
      if (response.status === 200) {
        props.navigate(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.bigContainer}>
      <View style={styles.container}>
        <LocationToVisit
          text={'Restaurant to visit'}
          location={restaurant.id + ' @ ' + restaurant.location}
          onPress={props.restaurantChangePress}
        />
        <OrdersToTakeUp
          count={count}
          decrement={decrement}
          increment={increment}
        />
        <DepartureTime />
      </View>
      <View style={{position: 'relative', paddingTop: 60}}>
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
});

const mapStateToProps = state => {
  const {user} = state;
  return {user};
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      userLogin,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TransporterHomeScreen);
