import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {BORDER_RADIUS} from '../../styles/mixins';
import {PADDING_LEFT} from '../../styles/spacing';

/* INTERFACE
  "outletId": 0,
  "name": "Taiwanese - Flavours Utown ",
  "latitude": 1.304987,
  "available": 1,
  "transporters": "0",
  "typeOfStore": "Food Court",
  "longitude": 103.772789
*/

const RestaurantCard = props => {
  const [name, location] = props.name.split('- ');

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        props.onPress({
          id: props.outletId,
          name: name,
          location: location,
          typeOfStore: props.typeOfStore,
          transporters: props.transporters,
          url: props.image,
        })
      }>
      <Image
        source={
          location === 'Fine Foods'
            ? require('../../images/finefoods.jpg')
            : require('../../images/flavours.jpg')
        }
        style={styles.image}
      />
      <View style={styles.alignmentContainer}>
        <View style={styles.details}>
          <View style={styles.leftText}>
            <Text style={styles.restaurantName}>{name}</Text>
            <Text style={styles.locationAndCategory}>{location}</Text>
            <Text style={styles.locationAndCategory}>{props.typeOfStore}</Text>
          </View>
          <View style={styles.rightText}>
            <Text style={styles.number}>{props.transporters}</Text>
            <Text style={styles.transporterText}>transporters</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
    flex: 3,
  },
  details: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  restaurantName: {
    fontWeight: '500',
    fontSize: 18,
  },
  alignmentContainer: {
    justifyContent: 'center',
    backgroundColor: 'white',
    flex: 0.9,
    padding: PADDING_LEFT,
  },
  locationAndCategory: {
    color: 'black',
    opacity: 0.4,
    fontWeight: 'bold',
    fontSize: 12,
  },
  leftText: {
    justifyContent: 'flex-start',
  },
  rightText: {
    alignItems: 'center',
  },
  transporterText: {
    // flex: 1,
    justifyContent: 'center',
    fontWeight: '500',
    fontSize: 12,
  },
  card: {
    height: 240,
    backgroundColor: 'white',
    borderRadius: BORDER_RADIUS,
    display: 'flex',
    elevation: 2,
  },
  number: {
    fontSize: 23,
    fontWeight: '600',
    color: '#ff9e9e',
    paddingBottom: 5,
  },
});

export default RestaurantCard;
