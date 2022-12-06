import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux';
import {IRestaurant} from '../../../redux/restaurantsSlice';
import Padding from '../../atoms/style/Padding';
import RestaurantCard from '../../atoms/menu/RestaurantCard';

const RestaurantScroll = (props: any) => {
  const {restaurants} = useSelector((state: RootState) => state.restaurants);

  const mapData = () =>
    props.isFilter
      ? restaurants
          .filter((card: IRestaurant) => card.transporters > 0)
          .map((card: IRestaurant) => (
            <View key={card.outletId}>
              <Padding />
              <RestaurantCard
                outletId={card.outletId}
                image={card.imagePath}
                available={card.available}
                name={card.name}
                typeOfStore={card.typeOfStore}
                transporters={card.transporters}
                latitude={card.latitude}
                longitude={card.longitude}
                onPress={props.onPress}
              />
            </View>
          ))
      : restaurants.map((card: IRestaurant) => (
          <View key={card.outletId}>
            <Padding />
            <RestaurantCard
              outletId={card.outletId}
              image={card.imagePath}
              available={card.available}
              name={card.name}
              typeOfStore={card.typeOfStore}
              transporters={card.transporters}
              latitude={card.latitude}
              longitude={card.longitude}
              onPress={props.onPress}
            />
          </View>
        ));

  return (
    <View style={styles.container}>
      {/* {isLoading ? (
        <ActivityIndicator />
      ) :  */}
      {mapData().length === 0 ? (
        <View style={styles.noRestaurantAvailContainer}>
          <Text style={styles.noRestaurantAvaiLTest}>
            No Restaurants Available
          </Text>
        </View>
      ) : (
        <View>{mapData()}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  noRestaurantAvailContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noRestaurantAvaiLTest: {
    fontWeight: 'bold',
  },
  container: {
    alignSelf: 'center',
    width: '90%',
  },
});

export default RestaurantScroll;
