import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import OrderLocationTracker from '../../../components/atoms/duringDelivery/OrderLocationTracker';
import Padding from '../../../components/atoms/style/Padding';
import OrderProgress from '../../../components/molecules/order/OrderProgress';
import TopBar from '../../../components/molecules/bar/TopBar';
import {convertToQuantity} from '../../../constants';
import {RootState} from '../../../redux';
import {updateUser} from '../../../redux/userSlice';
import {BACKEND_URL} from '../../../utils/links';

const OrderStatusScreen = props => {
  const [isLoading, setLoading] = useState(true);
  const [menuItems, setMenuItems] = useState([]);
  const [transporter, setTransporter] = useState({
    estimatedTime: '1300',
    firstName: '',
    lastName: '',
    userId: '',
    orderId: 0,
    phoneNumber: 0,
  });
  const [orderDetails, setOrderDetails] = useState({});
  const {user} = useSelector((state: RootState) => state.user);
  const {buyerProgress} = useSelector((state: RootState) => state.transporter);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/orders?orderId=${user.currOrderId}`,
      );
      console.log(response.data);
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

  const getMenuItems = async (outletId: number, foods: []) => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/menu?menuId=${outletId}`,
      );
      const restOfItems = response.data.restOfItems;
      const filteredMenu: Object = [];
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
      console.log(finalMenu);
      setMenuItems(finalMenu);
    } catch (error) {
      console.error(error);
    }
  };

  const getTransporter = async (transporterId: number) => {
    try {
      const responseTransporter = await axios.get(
        `${BACKEND_URL}/transporters?transporterId=${transporterId}`,
      );
      console.log('estimated arrival', responseTransporter.data);
      const {estimatedTime} = responseTransporter.data;
      const responseUser = await axios.get(
        `${BACKEND_URL}/users?userId=${transporterId}`,
      );
      const {userId, firstName, lastName, phoneNumber} = responseUser.data[0];
      const orderId = user.currOrderId;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.safeAreaView}>
          <TopBar
            onPress={async () => {
              if (buyerProgress[4]) {
                const resp = await axios.get(
                  `${BACKEND_URL}/users?userId=${user.userId}}`,
                );
                dispatch(updateUser(resp.data[0]));
              }

              props.navigation.navigate('Home');
            }}
            text={'Order Status'}
            iconName="cross"
            iconType="entypo"
          />
          <View>
            <View style={styles.container}>
              <Padding />
              <OrderProgress
                orderId={user.currOrderId}
                arrivalTime={transporter.estimatedTime}
                transporterId={transporter.userId}
                transporterName={
                  transporter.firstName + ' ' + transporter.lastName
                }
              />
              <Padding />
              <OrderLocationTracker
                text={transporter.firstName + ' ' + transporter.lastName}
                duration={''}
                orders={menuItems}
              />
            </View>
          </View>
        </View>
      )}
    </>
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
