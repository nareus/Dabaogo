import React, {Fragment} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import Notes from '../../components/atoms/Notes';
import Padding from '../../components/atoms/Padding';
import PaymentMethod from '../../components/atoms/PaymentMethod';
import OrderBottom from '../../components/molecules/OrderBottom';
import OrderSummary from '../../components/molecules/OrderSummary';
import {BACKGROUND_COLOR} from '../../styles/colors';
import LocationToVisit from '../../components/atoms/LocationToVisit';
import TopBar from '../../components/molecules/TopBar';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {userLogin} from '../../redux/action/UserActions';
import axios from 'axios';
import {BACKEND_URL} from '../../utils/links';
import {convertToQuantity} from '../../constants';

// interface IData {
//   items: IItem[],
//   subtotal: number,
//   deliveryFee: number,
//   serviceFee: number,
// }

// interface IItem {
//     quantity: number,
//     name: string,
//     price: number,
// }

const PaymentScreen = props => {
  const {subtotal, items, storeId} = props.route.params;
  const deliveryFee = 1.0;
  const serviceFee = 0.3;
  const totalPrice = subtotal + deliveryFee + serviceFee;

  const makeOrder = async () => {
    // console.log(items);
    const foodItems = items.map(item => item.foodId);
    const order = {
      buyerId: props.user.userId,
      foodItems: foodItems,
      price: totalPrice,
      outletId: storeId,
    };
    try {
      const response = await axios.post(`${BACKEND_URL}/orders`, order);
      if (response.status === 200) {
        await getUserDetails(props.user.userId);
        props.navigation.navigate('Order Status', {
          id: response.data.id,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getUserDetails = async id => {
    try {
      const response = await axios.get(`${BACKEND_URL}/users?userId=${id}}`);
      await props.userLogin(response.data[0]);
      // console.log(props.user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <SafeAreaView style={styles.topSafeAreaView}>
        <ScrollView
          style={styles.container}
          scrollToOverflowEnabled={false}
          showsVerticalScrollIndicator={false}>
          {/* <Text style={styles.header}>Payment</Text> */}
          <Padding />
          <Padding />
          <Padding />
          <Notes name={'Order Notes'} onPress={() => {}} />
          <Padding />
          <OrderSummary
            data={{
              items: convertToQuantity(items),
              subtotal: subtotal,
              deliveryFee: deliveryFee,
              serviceFee: serviceFee,
            }}
          />
          <Padding />
          <PaymentMethod />
          <Padding />
          <LocationToVisit
            text={'Deliver to'}
            location={'Tembusu College\n #22-01'}
          />
          <Padding />
          <Notes name={'Rider Notes'} onPress={() => {}} />
        </ScrollView>
        <OrderBottom price={totalPrice} onPress={makeOrder} />
      </SafeAreaView>
      <SafeAreaView style={styles.bottomSafeAreaView} />
      <TopBar
        onPress={() => props.navigation.goBack()}
        text={'Payment'}
        iconName={'chevron-left'}
        iconType={'feather'}
      />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  topSafeAreaView: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  bottomSafeAreaView: {
    flex: 0,
    backgroundColor: 'white',
  },
  bigContainer: {
    backgroundColor: BACKGROUND_COLOR,
    flex: 1,
  },
  container: {
    width: '90%',
    alignSelf: 'center',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 24,
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

export default connect(mapStateToProps, mapDispatchToProps)(PaymentScreen);
