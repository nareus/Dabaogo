import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import GeneralButton from '../../components/atoms/GeneralButton';
import MenuCategoryText from '../../components/atoms/MenuCategoryText';
import RestaurantCardOrder from '../../components/atoms/RestaurantCardOrder';
import OrderCheckout from '../../components/molecules/OrderCheckout';
import PopularDishesScroll from '../../components/molecules/PopularDishesScroll';
import TopBarAuth from '../../components/molecules/TopBarAuth';
import TopBarOrder from '../../components/molecules/TopBarOrder';
import RestOfMenuItems from '../../components/organisms/RestOfMenuItems';
import {BACKGROUND_COLOR} from '../../styles/colors';

const OrderScreen = props => {
  const [order, setOrder] = useState([]);
  const [totalPrice, setPrice] = useState([]);

  const addItem = (item, price) => {
    setPrice(oldArray => [...oldArray, price]);
    setOrder(oldArray => [...oldArray, item]);
  };

  const removeItem = (item, price) => {
    setOrder(oldArray => {
      let counter = 0;
      while (oldArray[counter].id !== item.id) {
        counter++;
      }
      oldArray.splice(counter, 1);
      return [...oldArray];
    });
    setPrice(oldArray => {
      let counter = 0;
      while (oldArray[counter] !== price) {
        counter++;
      }
      oldArray.splice(counter, 1);
      return [...oldArray];
    });
  };

  return (
    <View style={styles.container}>
      {/* <TopBarAuth /> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <RestaurantCardOrder />
        {/* <MenuCategoryText text={'Popular Dishes'} /> */}
        {/* <PopularDishesScroll addItem={addItem} removeItem={removeItem} /> */}
        <RestOfMenuItems addItem={addItem} removeItem={removeItem} />
      </ScrollView>
      {order.length !== 0 ? (
        <OrderCheckout
          numItems={order.length}
          totalPrice={totalPrice.reduce((accumulator, a) => accumulator + a)}
          onPress={() =>
            props.navigation.navigate('Payment', {
              subtotal: totalPrice.reduce((accumulator, a) => accumulator + a),
              items: order,
            })
          }
        />
      ) : (
        <></>
      )}
      <TopBarOrder
        onPress={() => props.navigation.goBack()}
        text={'Taiwanese'}
        iconName={'chevron-left'}
        iconType={'feather'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND_COLOR,
    flex: 1,
  },
});

export default OrderScreen;
