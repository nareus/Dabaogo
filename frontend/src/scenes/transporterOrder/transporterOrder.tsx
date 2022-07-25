import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import Padding from '../../components/atoms/Padding';
import TransporterConfirmBottom from '../../components/molecules/TransporterConfirmBottom';
import {BACKGROUND_COLOR} from '../../styles/colors';
import TransporterOrderCard, {
  IRestaurantTransporterOrderCard,
  ITransporterOrderCard,
} from '../../components/atoms/TransporterOrderCard';
import axios from 'axios';
import {BACKEND_URL} from '../../utils/links';
import TransporterOrderProgress from '../../components/molecules/TransporterOrderProgress';
import TopBar from '../../components/molecules/TopBar';
import {io} from 'socket.io-client';
import {RootState} from '../../redux';
import {useDispatch, useSelector} from 'react-redux';
import {convertToMoney, convertToQuantity, IOrder} from '../../constants';
import {IRestaurant} from '../../redux/restaurantsSlice';
import {updateUser} from '../../redux/userSlice';

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
interface ISocketData {
  items: ITransporterOrder[];
  processing: boolean;
}

interface ITransporterOrder {
  orderId: number;
  buyerId: number;
  transporterId: number;
  price: number;
  outletId: number;
  foods: string;
  foundTransporter: number;
  reachedOutlet: number;
  orderPickedUp: number;
  delivered: number;
  confirmed: number;
}

interface IFoodItem {
  description: string;
  foodId: number;
  menuId: number;
  name: string;
  popular: number;
  price: number;
  type: string;
}

const TransporterOrder = props => {
  const deliveryFee = 1;
  const [buttonTitle, setButtonTitle] = useState('Depart');
  const [count, setCount] = useState(1);
  const [stage, setStage] = useState([false, false, false, false]);
  const [currentStatus, setCurrentStatus] = useState('Waiting for Orders');
  const [pulseState] = useState([true, false, false, false, false]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [numCurrOrder, setNumCurrOrder] = useState(0);
  const [ordersToBeDisplayed, setOrdersToBeDisplayed] = useState<
    IRestaurantTransporterOrderCard[]
  >([]);
  const {user} = useSelector((state: RootState) => state.user);
  const {restaurants} = useSelector((state: RootState) => state.restaurants);
  // const {totalProfit} = useSelector((state: RootState) => state.transporter);
  const dispatch = useDispatch();

  const handlePress = async () => {
    if (count <= 5) {
      setCount(count + 1);
      const newStage = [false, false, false, false];
      for (let i = 0; i < count; i = i + 1) {
        newStage[i] = true;
      }
      setStage(newStage);
      await axios.put(`${BACKEND_URL}/orders`, {
        stage: newStage,
        transporterId: user.userId,
      });
      if (count === 1) {
        setButtonTitle('Reached Outlet');
        setCurrentStatus('On the way there');
      }
      if (count === 2) {
        setButtonTitle('Picked Up Food');
        setCurrentStatus('Waiting for food');
      }
      if (count === 3) {
        setButtonTitle('Delivered');
        setCurrentStatus('On the way back');
      }
      if (count === 4) {
        setButtonTitle('Done');
        setCurrentStatus('Food has been delivered!');
      }
      if (count === 5) {
        await axios.delete(
          `${BACKEND_URL}/transporters?transporterId=${user.userId}`,
        );
        const response = await axios.get(
          `${BACKEND_URL}/users?userId=${user.userId}}`,
        );
        dispatch(updateUser(response.data[0]));

        props.navigation.navigate('Home');
      }
    }
  };

  useEffect(() => {
    const socket = io(`${BACKEND_URL}/transporterOrders`);

    socket.emit('join', String(user.userId));
    socket.on('connect', () => {});
    socket.on('update', (data: ISocketData) => {
      console.log('dataItems is', data);
      setNumCurrOrder(data.items.length);
      getFinalOrder(data.items);
      setProcessing(data.processing);
    });

    return () => {
      setButtonTitle('Confirm');
      setCount(1);
      setStage([false, false, false, false, false]);
      setCurrentStatus('Waiting for Order');
      setOrdersToBeDisplayed([]);
      setProcessing(false);
    };
  }, []);

  const getOrdererOrder = async (outletId: number, foodItems: []) => {
    const menu = await axios.get(`${BACKEND_URL}/menu?menuId=${outletId}`);
    const restOfItems: Record<string, IFoodItem[]> = menu.data.restOfItems;
    const filteredMenu: Object[] = [];

    foodItems.forEach(foodItemId => {
      for (const value of Object.values(restOfItems)) {
        value.forEach(item => {
          if (item.foodId === foodItemId) {
            filteredMenu.push(item);
          }
        });
      }
    });

    const finalMenu: {
      foodId: number;
      name: string;
      price: number;
      quantity: number;
    }[] = convertToQuantity(filteredMenu);
    return finalMenu;
  };

  const getOrdererDetails = async (userId: number) => {
    const response = await axios.get(`${BACKEND_URL}/users?userId=${userId}}`);
    const {firstName, lastName, location, phoneNumber} = response.data[0];
    return [firstName, lastName, location, phoneNumber];
  };

  const getFinalOrder = async currOrders => {
    const finalCurrOrders: IRestaurantTransporterOrderCard[] = [];
    let price = 0;
    let profit = 0;

    for (let i = 0; i < currOrders.length; i++) {
      const orderDetails = currOrders[i];
      const ordererOrder: IOrder[] = await getOrdererOrder(
        orderDetails.outletId,
        JSON.parse(orderDetails.foods).foods,
      );
      const [firstName, lastName, location, phoneNumber] =
        await getOrdererDetails(orderDetails.buyerId);
      console.log(phoneNumber);

      const item: ITransporterOrderCard = {
        id: orderDetails.buyerId.toString(),
        categoryName: firstName + ' ' + lastName + ' @ ' + location,
        subCategory: ordererOrder.map((order: IOrder) => {
          profit = profit + deliveryFee;
          price = price + order.price;
          return {
            id: String(order.foodId),
            name: `${order.quantity}x ${order.name} $${convertToMoney(
              order.price,
            )}`,
          };
        }),
      };

      const {name} = restaurants.filter(
        (restaurant: IRestaurant) =>
          restaurant.outletId === orderDetails.outletId,
      )[0];

      const data: IRestaurantTransporterOrderCard = {
        id: orderDetails.outletId,
        restaurantName: name,
        data: [item],
      };

      if (finalCurrOrders.length === 0) {
        finalCurrOrders.push(data);
      } else {
        const result = finalCurrOrders.filter(
          element => element.id === orderDetails.outletId,
        );
        if (result.length === 0) {
          finalCurrOrders.push(data);
        } else {
          result[0].data.push(item);
        }
      }
    }
    console.log('finalCurrOrders is', finalCurrOrders);
    setTotalPrice(price);
    setTotalProfit(profit);
    setOrdersToBeDisplayed(finalCurrOrders);
    setLoading(false);
  };

  const renderItems = (data: IRestaurantTransporterOrderCard) => (
    <View key={data.id}>
      <Padding />
      <TransporterOrderCard
        restaurantName={data.restaurantName}
        data={data.data}
      />
    </View>
  );

  /*
    Current status includes
    1. Finding food transporter
    2. on the way there
    3. waiting for food
    4. on the way back
    5. Food has been delivered!
    6. Done // this is a dummy, to stop delivered from flashing
    */

  return loading ? (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
      }}>
      <ActivityIndicator />
    </View>
  ) : (
    <View style={styles.topSafeAreaView}>
      <TopBar
        onPress={() => props.navigation.goBack()}
        text={'Transport Status'}
        iconName={'chevron-left'}
        iconType={'feather'}
      />
      <ScrollView style={styles.container} scrollToOverflowEnabled={false}>
        <Padding />
        <TransporterOrderProgress
          isDone={stage}
          currentStatus={currentStatus}
          pulseState={pulseState}
        />
        {ordersToBeDisplayed.map(order => renderItems(order))}
        <Padding />
      </ScrollView>
      <TransporterConfirmBottom
        dataLength={numCurrOrder}
        processing={processing}
        price={convertToMoney(totalProfit)}
        totalPrice={convertToMoney(totalPrice)}
        cancelPress={async () => {
          await axios.delete(
            `${BACKEND_URL}/transporters?transporterId=${user.userId}`,
          );
          const response = await axios.get(
            `${BACKEND_URL}/users?userId=${user.userId}}`,
          );
          dispatch(updateUser(response.data[0]));

          props.navigation.navigate('Home');
        }}
        onPress={handlePress}
        buttonTitle={buttonTitle}
      />
    </View>
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

export default TransporterOrder;
