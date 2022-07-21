import React, {Fragment, useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import TopBarHome from '../../components/molecules/TopBarHome';
import {useSelector} from 'react-redux';
import BuyerHomeScreen from '../../components/organisms/BuyerHomeScreen';
import TransporterHomeScreen from '../../components/organisms/TransporterHomeScreen';
import BottomUserState from '../../components/atoms/BottomUserState';
// import {SafeAreaView} from 'react-native-safe-area-context';
import {SafeAreaView} from 'react-navigation';
import {RootState} from '../../redux';
import {BACKGROUND_COLOR} from '../../styles/colors';

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

  useEffect(() => {
    return () => {
      setToggleState(true);
    };
  }, []);

  return (
    <Fragment>
      <SafeAreaView style={styles.topSafeAreaView}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TopBarHome
            selectionState={props.home}
            onPressProfile={() => props.navigation.navigate('Settings')}
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
      </SafeAreaView>
      <SafeAreaView style={styles.bottomSafeAreaView} />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  topSafeAreaView: {
    backgroundColor: 'white',
    flex: 1,
  },
  bottomSafeAreaView: {
    flex: 0,
    backgroundColor: BACKGROUND_COLOR,
  },
});

export default HomeScreen;
