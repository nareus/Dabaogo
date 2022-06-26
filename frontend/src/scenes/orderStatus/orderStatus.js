import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import OrderLocationTracker from '../../components/atoms/OrderLocationTracker';
import Padding from '../../components/atoms/Padding';
import SignInUpButton from '../../components/atoms/SignInUpButton';
import OrderBottom from '../../components/molecules/OrderBottom';
import OrderProgress from '../../components/molecules/OrderProgress';
import TopBarOrder from '../../components/molecules/TopBarOrder';

const OrderStatusScreen = props => {
  return (
    <View style={styles.safeAreaView}>
      <View>
        <View style={styles.container}>
          <View style={styles.bigPadding} />
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
      <TopBarOrder
        onPress={() => props.navigation.navigate('Home')}
        text={'Order Status'}
        iconName="cross"
        iconType="entypo"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bigPadding: {
    padding: 48,
  },
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
