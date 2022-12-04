import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {BACKGROUND_COLOR} from '../../styles/colors';
import RestaurantScroll from '../molecules/RestaurantScroll';

const BuyerHomeScreen = props => {
  return (
    <View style={styles.container}>
      <RestaurantScroll onPress={props.navigate} isFilter={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND_COLOR,
    flex: 1,
  },
});

export default BuyerHomeScreen;
