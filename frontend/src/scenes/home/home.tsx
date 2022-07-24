import React, {Fragment, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import TopBarHome from '../../components/molecules/TopBarHome';
import {useDispatch, useSelector} from 'react-redux';
import BuyerHomeScreen from '../../components/organisms/BuyerHomeScreen';
import TransporterHomeScreen from '../../components/organisms/TransporterHomeScreen';
import BottomUserState from '../../components/atoms/BottomUserState';
// import {SafeAreaView} from 'react-navigation';
import {RootState} from '../../redux';
import {userLogout} from '../../redux/userSlice';
import {PADDING_LEFT} from '../../styles/spacing';
import {changeDepartureTime} from '../../redux/transporterSlice';
import {IRestaurant, updateRestaurants} from '../../redux/restaurantsSlice';
import {formatAMPM} from '../../constants';
import {io} from 'socket.io-client';
import {BACKEND_URL} from '../../utils/links';

const HomeScreen = (props: any) => {
  const {user} = useSelector((state: RootState) => state.user);
  const [toggleState, setToggleState] = useState(
    user.currOrderId === null || !user.isTransporter,
  );
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const onPressLogout = () => {
    dispatch(userLogout());
    props.navigation.navigate('Landing');
  };

  useEffect(() => {
    const socket = io(`${BACKEND_URL}/updateOutlets`);

    socket.emit('join', user.userId);
    socket.on('connect', () => {
      // console.log(socket.connected);
    });
    socket.on('update', data => {
      setLoading(false);
      dispatch(updateRestaurants(data));
    });
    return () => {
      setToggleState(true);
    };
  }, [dispatch, user.userId]);

  return loading ? (
    <>
      <ActivityIndicator />
    </>
  ) : (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TopBarHome
          selectionState={!toggleState}
          onPressProfile={onPressLogout}
          onLeftPress={() => setToggleState(false)}
          onRightPress={() => {
            setToggleState(true);
            dispatch(changeDepartureTime(formatAMPM(new Date(), 5)));
          }}
        />
        {toggleState ? (
          <BuyerHomeScreen
            navigate={(data: IRestaurant) => {
              user.currOrderId !== null
                ? Alert.alert('You currently have an order in progress')
                : props.navigation.navigate('Order', {
                    data: data,
                  });
            }}
          />
        ) : (
          <TransporterHomeScreen
            navigate={() => props.navigation.navigate('TransporterOrder')}
          />
        )}
      </ScrollView>
      {user.isTransporter || user.currOrderId !== null ? (
        <BottomUserState
          onPress={() => {
            user.isTransporter
              ? props.navigation.navigate('TransporterOrder', {
                  id: user.currOrderId,
                })
              : props.navigation.navigate('OrderStatus', {
                  id: user.currOrderId,
                });
          }}
        />
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: PADDING_LEFT * 3,
    backgroundColor: 'white',
    flex: 1,
  },
});

export default HomeScreen;
