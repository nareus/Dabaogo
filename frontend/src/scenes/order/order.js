/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import GeneralButton from '../../components/atoms/GeneralButton';
import MenuCategoryText from '../../components/atoms/MenuCategoryText';
import RestaurantCardOrder from '../../components/atoms/RestaurantCardOrder';
import OrderCheckout from '../../components/molecules/OrderCheckout';
import PopularDishesScroll from '../../components/molecules/PopularDishesScroll';
import TopBarAuth from '../../components/molecules/TopBarAuth';
import TopBarOrder from '../../components/molecules/TopBarOrder';
import RestOfMenuItems from '../../components/organisms/RestOfMenuItems';
import {BACKGROUND_COLOR} from '../../styles/colors';
import {BACKEND_URL} from '../../utils/links';

const OrderScreen = props => {
  const [order, setOrder] = useState([]);
  const [totalPrice, setPrice] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [popularMenu, setPopularMenu] = useState([]);
  const [mainMenu, setMainMenu] = useState([]);
  const [state, setState] = useState({});

  const {id, name, location, typeOfStore, transporters} =
    props.route.params.data;

  const getData = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/menu?menuId=${id}`);
      setPopularMenu(response.data.popular);
      setMainMenu(response.data.restOfItems);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    return () => {
      setPopularMenu([]);
      setMainMenu([]);
      setLoading(true);
      setPrice([]);
      setOrder([]);
    };
  }, []);

  const addItem = (item, price) => {
    setPrice(oldArray => [...oldArray, price]);
    setOrder(oldArray => [...oldArray, item]);
  };

  const removeItem = (item, price) => {
    setOrder(oldArray => {
      let counter = 0;
      while (oldArray[counter].foodId !== item.foodId) {
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
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <RestaurantCardOrder
              name={name}
              location={location}
              typeOfStore={typeOfStore}
              transporters={transporters}
            />
            {/* <MenuCategoryText text={'Popular Dishes'} /> */}
            {/* <PopularDishesScroll
              data={popularMenu}
              addItem={addItem}
              removeItem={removeItem}
            /> */}
            <RestOfMenuItems
              data={mainMenu}
              addItem={addItem}
              removeItem={removeItem}
            />
            <View style={{padding: 60}} />
          </ScrollView>
        </>
      )}

      {order.length !== 0 ? (
        <OrderCheckout
          numItems={order.length}
          totalPrice={totalPrice.reduce((accumulator, a) => accumulator + a)}
          onPress={() =>
            props.navigation.navigate('Payment', {
              subtotal: totalPrice.reduce((accumulator, a) => accumulator + a),
              items: order,
              storeId: id,
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
