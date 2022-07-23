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
import {useDispatch, useSelector} from 'react-redux';
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
import {updateUser} from '../../redux/userSlice';

interface IFoodItem {
  foodId: number;
  name: string;
  description: string;
  price: number;
  type: string;
  menuId: number;
  popular: number;
}

const OrderScreen = props => {
  const [order, setOrder] = useState([]);
  const [totalPrice, setPrice] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [popularMenu, setPopularMenu] = useState([]);
  const [mainMenu, setMainMenu] = useState([]);
  const {outletId, name, typeOfStore, transporters} = props.route.params.data;
  const [restaurantName, restaurantLocation] = name.split(' - ');

  const [maxOrder, updateMaxOrder] = useState(0);
  const {user} = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const userId = user.userId;
  console.log(userId);

  const socket = io(`${BACKEND_URL}/maxOrders`);

  socket.emit('join', userId, outletId);
  socket.on('connect', () => {
    // console.log(socket.connected);
  });
  socket.on('update', orderNum => {
    console.log(orderNum);
    updateMaxOrder(orderNum);
  });

  // const getMaxOrders = async () => {
  //   const response = await axios.get(
  //     `${BACKEND_URL}/transporters/maxOrders?userId=${userId}&outletId=${outletId}`,
  //   );
  //   const data = response.data;
  //   updateMaxOrder(data);
  //   setLoading(false);
  // };

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

  const onViewBasketPress = async () => {
    if (order.length > maxOrder) {
      return Alert.alert(
        'Maximum number of orders exceeded, please reduce number of orders',
      );
    } else {
      const foodItems = order.map((item: IFoodItem) => item.foodId);
      const deliveryFee = 1.0;
      const serviceFee = 0.3;
      const subTotal =
        totalPrice.reduce((accumulator, a) => accumulator + a) +
        deliveryFee +
        serviceFee;
      const body = {
        buyerId: user.userId,
        foodItems: foodItems,
        price: subTotal,
        outletId: outletId,
      };
      const response = await axios.post(`${BACKEND_URL}/orders`, body);
      if (response.status === 200) {
        const resp = await axios.get(
          `${BACKEND_URL}/users?userId=${user.userId}}`,
        );
        dispatch(updateUser(resp.data[0]));

        props.navigation.navigate('Payment', {
          subtotal: subTotal,
          items: order,
          storeId: outletId,
        });
      }
    }
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
          onPress={onViewBasketPress}
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
