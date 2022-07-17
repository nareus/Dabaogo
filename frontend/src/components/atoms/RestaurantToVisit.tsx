import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux';
import {IRestaurant} from '../../redux/transporterSlice';
import {BORDER_RADIUS} from '../../styles/mixins';
import {PADDING_LEFT} from '../../styles/spacing';
import ChangeButton from './TextButton';

const RestaurantToVisit = (props: any) => {
  const {restaurantsSelected} = useSelector(
    (state: RootState) => state.transporter,
  );

  return (
    <View style={styles.container}>
      <Image source={require('../../images/map.png')} style={styles.image} />
      <View style={styles.top}>
        <Text style={styles.text}>{props.text}</Text>
        <ChangeButton text={'Change'} onPress={props.onChangeButtonPress} />
      </View>
      <View style={styles.bottomHalf}>
        {restaurantsSelected.length === 0 ? (
          <Text style={styles.restaurantToVisit}>
            -- No restaurants selected so far --
          </Text>
        ) : (
          restaurantsSelected.map((location: IRestaurant) => (
            <Text style={styles.restaurantToVisit} key={location.outletId}>
              {location.name.split('- ')[0]} @ {location.name.split('- ')[1]}
            </Text>
          ))
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS,
    // marginTop: PADDING_LEFT,
  },
  top: {
    padding: PADDING_LEFT,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 5,
  },
  bottomHalf: {
    padding: PADDING_LEFT,
    backgroundColor: '#f19896',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
  image: {
    height: 200,
    width: '100%',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  restaurantToVisit: {
    fontWeight: 'bold',
    color: 'white',
  },
  text: {
    fontWeight: 'bold',
  },
});
export default RestaurantToVisit;
