import * as React from 'react';
<<<<<<< HEAD
import {SafeAreaView} from 'react-native';
=======
import {StyleSheet, View} from 'react-native';
import RestaurantScroll from '../../components/molecules/RestaurantScroll';
>>>>>>> refs/remotes/origin/main
import TopBarHome from '../../components/molecules/TopBarHome';
import {connect} from 'react-redux';
import {BACKGROUND_COLOR} from '../../styles/colors';
import {bindActionCreators} from 'redux';
import {toggleHomeState} from '../../redux/action/HomeActions';
import BuyerHomeScreen from '../../components/organisms/BuyerHomeScreen';
import TransporterHomeScreen from '../../components/organisms/TransporterHomeScreen';

const HomeScreen = props => {
  return (
<<<<<<< HEAD
    <SafeAreaView style={{backgroundColor: BACKGROUND_COLOR, flex: 1}}>
      <TopBarHome
        selectionState={props.home}
        onLeftPress={() => props.toggleHomeState(true)}
        onRightPress={() => props.toggleHomeState(false)}
      />
      {props.auth ? <BuyerHomeScreen /> : <TransporterHomeScreen />}
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
=======
    <View style={styles.container}>
      <TopBarHome />
      <RestaurantScroll />
    </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   // alignSelf: 'stretch',
  //   height: 40,
  //   // paddingBottom: 60,
  //   flexDirection: 'row', // row
  //   alignItems: 'center',
  //   justifyContent: 'space-between', // center, space-around
  //   // paddingLeft: 10,
  //   // paddingRight: 10
  // },
  container: {backgroundColor: '#fafafa', flex: 1},
});

export default HomeScreen;
>>>>>>> refs/remotes/origin/main
