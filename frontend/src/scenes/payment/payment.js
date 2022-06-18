import React, {Fragment} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import Notes from '../../components/atoms/Notes';
import Padding from '../../components/atoms/Padding';
import Payment from '../../components/atoms/Payment';
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
  return (
    <Fragment>
      <SafeAreaView style={styles.topSafeAreaView}>
        <ScrollView style={styles.container} scrollToOverflowEnabled={false}>
          <Text style={styles.header}>Payment</Text>
          <Padding />
          <Notes
            name={'Order Notes'}
            onPress={console.log('order notes pressed')}
          />
          <Padding />
          <OrderSummary
            data={{
              items: [
                {
                  quantity: '1',
                  name: 'Chicken Rice',
                  price: '5.00',
                },
              ],
              subtotal: '5.00',
              deliveryFee: '1.00',
              serviceFee: '0.30',
            }}
          />
          <Padding />
          <Payment />
          <Padding />
          <LocationToVisit
            text={'Deliver to'}
            location={'Tembusu College\n #22-01'}
          />
          <Padding />
          <Notes
            name={'Rider Notes'}
            onPress={console.log('rider notes pressed')}
          />
        </ScrollView>
        <OrderBottom price={'6.30'} />
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
