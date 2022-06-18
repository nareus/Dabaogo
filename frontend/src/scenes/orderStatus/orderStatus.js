import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import OrderLocationTracker from '../../components/atoms/OrderLocationTracker';
import Padding from '../../components/atoms/Padding';
import SignInUpButton from '../../components/atoms/SignInUpButton';
import OrderBottom from '../../components/molecules/OrderBottom';
import OrderProgress from '../../components/molecules/OrderProgress';

const OrderStatusScreen = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View>
        <View style={styles.container}>
          <Text style={styles.header}>Order Status</Text>
          <Padding />
          <OrderProgress />
          <Padding />
          <OrderLocationTracker
            text={'Naren Sreekanth'}
            duration={''}
            orders={[
              {
                quantity: 1,
                name: 'Chicken Rice',
              },
              {
                quantity: 1,
                name: 'Fries',
              },
            ]}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: 'BACKGROUND_COLOR',
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

export default OrderStatusScreen;
