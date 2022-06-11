import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import OrderHorizontalScroll from '../../components/molecules/OrderHorizontalScroll';
import {BACKGROUND_COLOR} from '../../styles/colors';

const OrderScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello</Text>
      <OrderHorizontalScroll />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND_COLOR,
    flex: 1,
  },
});

export default OrderScreen;
