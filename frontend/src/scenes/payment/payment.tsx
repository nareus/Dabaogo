import React, {Fragment, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import Padding from '../../components/atoms/Padding';
import PaymentMethod from '../../components/atoms/PaymentMethod';
import OrderBottom from '../../components/molecules/OrderBottom';
import OrderSummary from '../../components/molecules/OrderSummary';
import {BACKGROUND_COLOR} from '../../styles/colors';
import LocationToVisit from '../../components/atoms/LocationToVisit';
import TopBar from '../../components/molecules/TopBar';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {BACKEND_URL} from '../../utils/links';
import {convertToQuantity} from '../../constants';
import {RootState} from '../../redux';

// interface IData {
//   items: IFoodItem[],
//   subtotal: number,
//   deliveryFee: number,
//   serviceFee: number,
// }

interface IFoodItem {
  foodId: number;
  name: string;
  description: string;
  price: number;
  type: string;
  menuId: number;
  popular: number;
}

const PaymentScreen = (props: any) => {
  const {user} = useSelector((state: RootState) => state.user);
  const {subtotal, items, storeId} = props.route.params;
  const deliveryFee = 1.0;
  const serviceFee = 0.3;
  const totalPrice = subtotal + deliveryFee + serviceFee;
  const [paymentMethod, setPaymentMethod] = useState('Paylah');
  const togglePaymentMethod = () => {
    paymentMethod === 'Paynow'
      ? setPaymentMethod('Paylah')
      : setPaymentMethod('Paynow');
  };

  const makeOrder = async () => {
    // console.log(items);
    const foodItems = items.map((item: IFoodItem) => item.foodId);
    const order = {
      buyerId: user.userId,
      foodItems: foodItems,
      price: totalPrice,
      outletId: storeId,
    };
    try {
      const response = await axios.post(`${BACKEND_URL}/orders`, order);
      if (response.status === 200) {
        props.navigation.navigate('OrderStatus', {
          id: response.data.id,
        });
      }
    } catch (error) {
      console.error(error);
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

export default PaymentScreen;
