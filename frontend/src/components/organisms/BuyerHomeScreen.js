import * as React from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import {BACKGROUND_COLOR} from '../../styles/colors';
import RestaurantScroll from '../molecules/RestaurantScroll';
import TopBarHome from '../molecules/TopBarHome';

const BuyerHomeScreen = props => {
  return (
    <View style={{backgroundColor: BACKGROUND_COLOR, flex: 1}}>
      <RestaurantScroll onPress={props.navigate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // alignSelf: 'stretch',
    height: 40,
    // paddingBottom: 60,
    flexDirection: 'row', // row
    alignItems: 'center',
    justifyContent: 'space-between', // center, space-around
    // paddingLeft: 10,
    // paddingRight: 10
  },
});

export default BuyerHomeScreen;
