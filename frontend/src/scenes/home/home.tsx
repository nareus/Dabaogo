import React, {Fragment, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import TopBarHome from '../../components/molecules/TopBarHome';
import {useDispatch, useSelector} from 'react-redux';
import BuyerHomeScreen from '../../components/organisms/BuyerHomeScreen';
import TransporterHomeScreen from '../../components/organisms/TransporterHomeScreen';
import BottomUserState from '../../components/atoms/BottomUserState';
// import {SafeAreaView} from 'react-navigation';
import {RootState} from '../../redux';
import {userLogout} from '../../redux/userSlice';
import {PADDING_LEFT} from '../../styles/spacing';

interface IOrderData {
  id: number;
  name: string;
  location: string;
  typeOfStore: string;
  transporters: number;
}

const HomeScreen = (props: any) => {
  const [toggleState, setToggleState] = useState(true);
  const {user} = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const onPressLogout = () => {
    dispatch(userLogout());
    props.navigation.navigate('Landing');
  };

  useEffect(() => {
    return () => {
      setToggleState(true);
    };
  }, []);

  return (
    <View style={styles.topSafeAreaView}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TopBarHome
          selectionState={props.home}
          onPressProfile={onPressLogout}
          onLeftPress={() => setToggleState(false)}
          onRightPress={() => setToggleState(true)}
        />
        {toggleState ? (
          <BuyerHomeScreen
            navigate={(data: IOrderData) =>
              props.navigation.navigate('Order', {
                data: data,
              })
            }
          />
        ) : (
          <TransporterHomeScreen
            navigate={() => props.navigation.navigate('TransporterOrder')}
          />
        )}
      </ScrollView>
      {user.currOrderId !== null ? (
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
  topSafeAreaView: {
    paddingTop: PADDING_LEFT * 3,
    backgroundColor: 'white',
    flex: 1,
  },
  bottomSafeAreaView: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default HomeScreen;
