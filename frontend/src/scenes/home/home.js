import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, ScrollView, View} from 'react-native';
import TopBarHome from '../../components/molecules/TopBarHome';
import {connect} from 'react-redux';
import {BACKGROUND_COLOR} from '../../styles/colors';
import {bindActionCreators} from 'redux';
import {toggleHomeState} from '../../redux/action/HomeActions';
import BuyerHomeScreen from '../../components/organisms/BuyerHomeScreen';
import TransporterHomeScreen from '../../components/organisms/TransporterHomeScreen';

const HomeScreen = props => {
  const [toggleState, setToggleState] = useState(true);

  return (
    <View style={{backgroundColor: BACKGROUND_COLOR, flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TopBarHome
          selectionState={props.home}
          // onLeftPress={() => props.toggleHomeState(true)}
          // onRightPress={() => props.toggleHomeState(false)}
          onLeftPress={() => setToggleState(false)}
          onRightPress={() => setToggleState(true)}
        />
        {
          toggleState ? (
            <BuyerHomeScreen
              navigate={data => props.navigation.navigate('Order', data)}
            />
          ) : (
            <TransporterHomeScreen
              navigate={() => props.navigation.navigate('Transporter Status')}
            />
          )
          // <TransporterHomeScreen />
          // <BuyerHomeScreen />
        }
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => {
  const {home} = state;
  return {home};
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleHomeState,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
