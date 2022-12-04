import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux';
import {IRestaurant} from '../../../redux/restaurantsSlice';
import {PADDING_LEFT} from '../../../styles/spacing';

const ChangeRestaurantBottom = () => {
  const {restaurantsSelected} = useSelector(
    (state: RootState) => state.transporter,
  );

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.text}>Restaurants Selected</Text>
      </View>
      <View style={styles.bottomHalf}>
        {restaurantsSelected.map((location: IRestaurant) => (
          <Text style={styles.restaurantToVisit} key={location.outletId}>
            {location.name.split('- ')[0]} @ {location.name.split('- ')[1]}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderRadius: BORDER_RADIUS,
    bottom: 0,
    position: 'absolute',
    width: '100%',
    paddingBottom: PADDING_LEFT * 5,
    // marginTop: PADDING_LEFT,
  },
  // container: {
  //   width: '100%',
  //   position: 'absolute',
  //   // flexDirection: 'row',
  //   alignItems: 'center',
  //   padding: PADDING_LEFT,
  //   // justifyContent: 'center',
  //   // margin: PADDING_LEFT,
  //   bottom: 0,
  //   backgroundColor: 'white',
  //   marginBottom: PADDING_LEFT,
  // },
  header: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  top: {
    padding: PADDING_LEFT,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 5,
  },
  bottomHalf: {
    paddingLeft: PADDING_LEFT,
    paddingRight: PADDING_LEFT,
    paddingTop: PADDING_LEFT,
    paddingBottom: PADDING_LEFT * 2,
    backgroundColor: '#f19896',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
  },
  restaurantToVisit: {
    fontWeight: 'bold',
    color: 'white',
  },
});
export default ChangeRestaurantBottom;
