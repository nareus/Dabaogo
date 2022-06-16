import * as React from 'react';
import {SafeAreaView} from 'react-native';
import TopBarHome from '../../components/molecules/TopBarHome';
import {connect} from 'react-redux';
import {BACKGROUND_COLOR} from '../../styles/colors';
import {bindActionCreators} from 'redux';
import {toggleHomeState} from '../../redux/action/HomeActions';
import BuyerHomeScreen from '../../components/organisms/BuyerHomeScreen';
import TransporterHomeScreen from '../../components/organisms/TransporterHomeScreen';

const HomeScreen = props => {
  return (
    <SafeAreaView style={{backgroundColor: BACKGROUND_COLOR, flex: 1}}>
      <TopBarHome
        selectionState={props.home}
        onLeftPress={() => props.toggleHomeState(true)}
        onRightPress={() => props.toggleHomeState(false)}
      />
      {
      //props.auth ? <BuyerHomeScreen /> : <TransporterHomeScreen />
      <TransporterHomeScreen />
      }
    </SafeAreaView>
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
