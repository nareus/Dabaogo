/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import RestaurantCardOrder from '../../components/atoms/RestaurantCardOrder';
import MaxOrderStatusBar from '../../components/molecules/MaxOrderStatusBar';
import OrderCheckout from '../../components/molecules/OrderCheckout';
import PopularDishesScroll from '../../components/molecules/PopularDishesScroll';
import TopBar from '../../components/molecules/TopBar';
import RestOfMenuItems from '../../components/organisms/RestOfMenuItems';
import {RootState} from '../../redux';
import {BACKGROUND_COLOR} from '../../styles/colors';
import {BACKEND_URL} from '../../utils/links';
import {io} from 'socket.io-client';

const OrderScreen = props => {
  const [order, setOrder] = useState([]);
  const [totalPrice, setPrice] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [popularMenu, setPopularMenu] = useState([]);
  const [mainMenu, setMainMenu] = useState([]);
  const [state, setState] = useState({});
  const {outletId, name, typeOfStore, transporters} = props.route.params.data;
  const [restaurantName, restaurantLocation] = name.split(' - ');

  const [maxOrder, updateMaxOrder] = useState(0);
  const {user} = useSelector((state: RootState) => state.user);
  const userId = user.userId;
  const socket = io(BACKEND_URL);

  socket.emit('join', {userId, outletId});
  socket.on('connect', () => {
    // console.log(socket.connected);
  });

  useEffect(() => {
    getMaxOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  socket.on('update', orderNum => {
    updateMaxOrder(orderNum);
  });

  const getMaxOrders = async () => {
    const response = await axios.get(
      `${BACKEND_URL}/transporters/maxOrders?userId=${userId}&outletId=${outletId}`,
    );
    const data = response.data;
    updateMaxOrder(data);
    setLoading(false);
  };

  const getData = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/menu?menuId=${outletId}`,
      );
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
      <TopBar
        onPress={() => props.navigation.goBack()}
        text={restaurantName}
        iconName={'chevron-left'}
        iconType={'feather'}
      />
      <MaxOrderStatusBar outletId={outletId} />
      {/* <TopBarAuth /> */}
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <RestaurantCardOrder
              name={restaurantName}
              location={restaurantLocation}
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
          onPress={() => {
            order.length > maxOrder
              ? Alert.alert(
                  'Maximum number of orders exceeded, please reduce number of orders',
                )
              : props.navigation.navigate('Payment', {
                  subtotal: totalPrice.reduce(
                    (accumulator, a) => accumulator + a,
                  ),
                  items: order,
                  storeId: outletId,
                });
          }}
        />
      ) : (
        <></>
      )}

      {/* <TopBar
        onPress={() => props.navigation.goBack()}
        text={restaurantName}
        iconName={'chevron-left'}
        iconType={'feather'}
      /> */}
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