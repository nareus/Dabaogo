import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import OrderLocationTracker from '../../components/atoms/OrderLocationTracker';
import Padding from '../../components/atoms/Padding';
import SignInUpButton from '../../components/atoms/SignInUpButton';
import OrderBottom from '../../components/molecules/OrderBottom';
import OrderProgress from '../../components/molecules/OrderProgress';
import TopBarOrder from '../../components/molecules/TopBarOrder';
import {convertToQuantity} from '../../constants';
import {BACKEND_URL} from '../../utils/links';

const OrderStatusScreen = props => {
  const [isLoading, setLoading] = useState(true);
  const [menuItems, setMenuItems] = useState([]);
  const [transporter, setTransporter] = useState({});
  const [orderDetails, setOrderDetails] = useState({});
  const orderId = props.route.params.id;

  const getData = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/orders?orderId=${orderId}`,
      );
      const {foods, outletId, transporterId} = response.data[0];
      setOrderDetails({
        foods,
        outletId,
        transporterId,
      });
      const foodItems = JSON.parse(foods).foods;

      await getMenuItems(outletId, foodItems);
      await getTransporter(transporterId);
      // setMenuItems(response.data.popular);
      // setMainMenu(response.data.restOfItems);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getMenuItems = async (outletId, foods) => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/menu?menuId=${outletId}`,
      );
      const restOfItems = response.data.restOfItems;
      const filteredMenu = [];
      foods.forEach(itemId => {
        for (const [, value] of Object.entries(restOfItems)) {
          value.forEach(item => {
            if (item.foodId === itemId) {
              filteredMenu.push(item);
            }
          });
        }
      });

      const finalMenu = convertToQuantity(filteredMenu);
      setMenuItems(finalMenu);
    } catch (error) {
      console.error(error);
    }
  };

  const getTransporter = async transporterId => {
    try {
      const responseTransporter = await axios.get(
        `${BACKEND_URL}/transporters?transporterId=${transporterId}`,
      );
      const {estimatedTime} = responseTransporter.data;
      const responseUser = await axios.get(
        `${BACKEND_URL}/users?userId=${transporterId}`,
      );
      const {userId, firstName, lastName, phoneNumber} = responseUser.data[0];

      setTransporter({
        estimatedTime,
        userId,
        orderId,
        firstName,
        lastName,
        phoneNumber,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
    return () => {
      getData();
      setLoading(true);
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.safeAreaView}>
          <View>
            <View style={styles.container}>
              <View style={styles.bigPadding} />
              <OrderProgress
                orderId={orderId}
                arrivalTime={transporter.estimatedTime}
                transporterId={transporter.userId}
                transporterName={transporter.firstName + transporter.lastName}
              />
              <Padding />
              <OrderLocationTracker
                text={transporter.firstName + transporter.lastName}
                duration={''}
                orders={menuItems}
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
      )}
    </>
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
