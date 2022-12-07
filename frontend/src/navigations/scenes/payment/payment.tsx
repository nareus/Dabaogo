import React, {Fragment, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import Padding from '../../../components/atoms/style/Padding';
import PaymentMethod from '../../../components/atoms/button/PaymentMethodButton';
import OrderBottom from '../../../components/molecules/order/OrderBottom';
import OrderSummary from '../../../components/molecules/order/OrderSummary';
import {BACKGROUND_COLOR} from '../../../styles/colors';
import LocationToVisit from '../../../components/atoms/preDelivery/LocationToVisit';
import TopBar from '../../../components/molecules/bar/TopBar';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {BACKEND_URL} from '../../../utils/links';
import {convertToQuantity} from '../../../constants';
import {RootState} from '../../../redux';
import {updateUser} from '../../../redux/userSlice';

// interface IData {
//   items: IFoodItem[],
//   subtotal: number,
//   deliveryFee: number,
//   serviceFee: number,
// }

const PaymentScreen = (props: any) => {
  const {user} = useSelector((state: RootState) => state.user);
  const {subtotal, items} = props.route.params;
  const deliveryFee = 1.0;
  const serviceFee = 0.3;
  const totalPrice = subtotal + deliveryFee + serviceFee;
  const [paymentMethod, setPaymentMethod] = useState('Paylah');
  const togglePaymentMethod = () => {
    paymentMethod === 'Paynow'
      ? setPaymentMethod('Paylah')
      : setPaymentMethod('Paynow');
  };
  const dispatch = useDispatch();

  const makeOrder = async () => {
    try {
      const response = await axios.put(
        `${BACKEND_URL}/orders/confirm?userId=${user.userId}`,
      );
      console.log(response.data);
      if (response.status === 200) {
        props.navigation.navigate('OrderStatus');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      <TopBar
        onPress={async () => {
          const response = await axios.put(
            `${BACKEND_URL}/orders/cancel?userId=${user.userId}`,
          );
          console.log(response.data);
          const resp = await axios.get(
            `${BACKEND_URL}/users?userId=${user.userId}}`,
          );
          dispatch(updateUser(resp.data[0]));
          props.navigation.goBack();
        }}
        text={'Payment'}
      />
      <SafeAreaView style={styles.topSafeAreaView}>
        <ScrollView
          style={styles.container}
          scrollToOverflowEnabled={false}
          showsVerticalScrollIndicator={false}>
          {/* <Text style={styles.header}>Payment</Text> */}
          <Padding />
          {/* <Notes
            name={'Order Notes'}
            onPress={(data: string) => setOrderNotes(data)}
            content={orderNotes}
          />
          <Padding /> */}
          <OrderSummary
            data={{
              items: convertToQuantity(items),
              subtotal: subtotal,
              deliveryFee: deliveryFee,
              serviceFee: serviceFee,
            }}
          />
          <Padding />
          <PaymentMethod
            paymentMethod={paymentMethod}
            onPress={() => togglePaymentMethod()}
          />
          <Padding />
          <LocationToVisit
            text={'Deliver to'}
            location={user.location}
            onChangeButtonPress={() => {}}
          />
          {/* <Padding />
          <Notes
            name={'Rider Notes'}
            onPress={(data: string) => setRiderNotes(data)}
            content={riderNotes}
          /> */}
        </ScrollView>
        <OrderBottom price={totalPrice} onPress={makeOrder} />
      </SafeAreaView>
      <SafeAreaView style={styles.bottomSafeAreaView} />
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

export default PaymentScreen;
