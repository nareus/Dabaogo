import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {IRestaurant} from '../../redux/slice/transporterSlice';
import {BACKEND_URL} from '../../utils/links';
import Padding from '../atoms/Padding';
import RestaurantCard from '../atoms/RestaurantCard';

const RestaurantScroll = (props: any) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/outlets`);
      setData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    return () => {
      setData([]);
      setLoading(true);
    };
  }, []);

  const mapData = () =>
    props.isFilter
      ? data
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
      : data.map((card: IRestaurant) => (
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
      {isLoading ? (
        <ActivityIndicator />
      ) : mapData().length === 0 ? (
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
