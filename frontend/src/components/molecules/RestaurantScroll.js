import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {BACKEND_URL} from '../../utils/links';
import Padding from '../atoms/Padding';
import RestaurantCard from '../atoms/RestaurantCard';

const RestaurantScroll = ({onPress}) => {
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
  }, []);

  const mapData = () =>
    data.map(card => (
      <View key={card.outletId}>
        <Padding />
        <RestaurantCard
          image={card.imagePath}
          outletId={card.outletId}
          name={card.name}
          typeOfStore={card.typeOfStore}
          transporters={card.transporters}
          onPress={onPress}
        />
      </View>
    ));

  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator /> : <View>{mapData()}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: '90%',
  },
});

export default RestaurantScroll;
