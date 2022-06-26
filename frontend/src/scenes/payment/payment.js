import React, {Fragment} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import Notes from '../../components/atoms/Notes';
import Padding from '../../components/atoms/Padding';
import PaymentMethod from '../../components/atoms/PaymentMethod';
import OrderBottom from '../../components/molecules/OrderBottom';
import OrderSummary from '../../components/molecules/OrderSummary';
import {BACKGROUND_COLOR, PRIMARY} from '../../styles/colors';
import {PADDING_LEFT} from '../../styles/spacing';
import LocationToVisit from '../../components/atoms/LocationToVisit';
import TopBarOrder from '../../components/molecules/TopBarOrder';

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
  const {subtotal, items} = props.route.params;
  const deliveryFee = 1.0;
  const serviceFee = 0.3;
  const totalPrice = subtotal + deliveryFee + serviceFee;

  const convertToQuantity = () => {
    const output = {};
    for (const item of items) {
      if (typeof output[item.foodId] === 'undefined') {
        output[item.foodId] = {
          quantity: 1,
          name: item.name,
          price: item.price,
          foodId: item.foodIid,
        };
      } else {
        output[item.foodId].quantity++;
      }
    }
    return Object.values(output);
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
        <OrderBottom
          price={totalPrice}
          onPress={() => props.navigation.navigate('Order Status')}
        />
      </SafeAreaView>
      <SafeAreaView style={styles.bottomSafeAreaView} />
      <TopBarOrder
        onPress={() => props.navigation.goBack()}
        text={'Taiwanese'}
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
