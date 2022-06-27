import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import TopBarHome from '../../components/molecules/TopBarHome';
import {connect} from 'react-redux';
import {BACKGROUND_COLOR} from '../../styles/colors';
import {bindActionCreators} from 'redux';
import BuyerHomeScreen from '../../components/organisms/BuyerHomeScreen';
import TransporterHomeScreen from '../../components/organisms/TransporterHomeScreen';
import {userLogin} from '../../redux/action/UserActions';
import BottomUserState from '../../components/atoms/BottomUserState';

const HomeScreen = props => {
  const [toggleState, setToggleState] = useState(true);

  useEffect(() => {}, []);

  return (
    <View style={{backgroundColor: BACKGROUND_COLOR, flex: 1}}>
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
    </View>
  );
};

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
