/* eslint-disable react-hooks/exhaustive-deps */
import React, {Fragment, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import TopBarHome from '../../components/molecules/TopBarHome';
import {connect} from 'react-redux';
import {BACKGROUND_COLOR} from '../../styles/colors';
import {bindActionCreators} from 'redux';
import BuyerHomeScreen from '../../components/organisms/BuyerHomeScreen';
import TransporterHomeScreen from '../../components/organisms/TransporterHomeScreen';
import {userLogin} from '../../redux/action/UserActions';
import BottomUserState from '../../components/atoms/BottomUserState';
import {SafeAreaView} from 'react-native-safe-area-context';

const HomeScreen = props => {
  const [toggleState, setToggleState] = useState(true);

  useEffect(() => {
    return () => {
      toggleState(true);
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
              navigate={data =>
                props.navigation.navigate('Order', {
                  data: data,
                })
              }
            />
          ) : (
            <TransporterHomeScreen
              navigate={data =>
                props.navigation.navigate('Transporter Status', {
                  data: data,
                })
              }
            />
          )}
        </ScrollView>
      </SafeAreaView>
      {props.user.currOrderId !== null ? (
        <BottomUserState
          onPress={() => {
            props.user.isTransporter
              ? props.navigation.navigate('Transporter Status', {
                  id: props.user.currOrderId,
                })
              : props.navigation.navigate('Order Status', {
                  id: props.user.currOrderId,
                });
          }}
        />
      ) : (
        <></>
      )}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  topSafeAreaView: {
    backgroundColor: 'white',
    flex: 1,
  },
});

const mapStateToProps = state => {
  const {user} = state;
  return {user};
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      userLogin,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
