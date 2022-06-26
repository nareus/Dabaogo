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
      if (typeof output[item.id] === 'undefined') {
        output[item.id] = {
          quantity: 1,
          name: item.name,
          price: item.price,
          id: item.id,
        };
      } else {
        output[item.id].quantity++;
      }
    }
    return Object.values(output);
  };

  return (
    <Fragment>
      <SafeAreaView style={styles.topSafeAreaView}>
        <ScrollView style={styles.container} scrollToOverflowEnabled={false}>
          <Text style={styles.header}>Payment</Text>
          <Padding />
          <Notes name={'Order Notes'} onPress={() => {}} />
          <Padding />
          <OrderSummary
            data={{
              // items: [
              //   {
              //     quantity: '1',
              //     name: 'Chicken Rice',
              //     price: '5.00',
              //   },
              // ],
              items: convertToQuantity(items),
              // items: items,
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
        <OrderBottom price={totalPrice} />
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
