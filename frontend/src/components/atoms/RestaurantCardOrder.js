import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {BORDER_RADIUS} from '../../styles/mixins';
import {PADDING_LEFT} from '../../styles/spacing';

const RestaurantCardOrder = props => {
  return (
    <View style={styles.card}>
      <Image
        source={require('../../images/taiwanese.png')}
        style={styles.image}
      />
      <View style={styles.alignmentContainer}>
        <View style={styles.details}>
          <View style={styles.leftText}>
            <Text style={styles.restaurantName}>Taiwanese</Text>
            <Text style={styles.locationAndCategory}>Flavours@Utown</Text>
            <Text style={styles.locationAndCategory}>Food Court</Text>
          </View>
          <View style={styles.rightText}>
            <Text style={styles.number}>5</Text>
            <Text style={styles.transporterText}>transporters</Text>
          </View>
        </View>
      </View>
    </View>
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
    fontSize: 30,
  },
  alignmentContainer: {
    justifyContent: 'center',
    backgroundColor: 'white',
    flex: 1,
    padding: PADDING_LEFT,
  },
  locationAndCategory: {
    color: 'black',
    opacity: 0.4,
    fontWeight: 'bold',
  },
  leftText: {
    justifyContent: 'flex-start',
  },
  rightText: {
    alignItems: 'center',
  },
  transporterText: {
    flex: 1,
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  card: {
    height: 328,
    backgroundColor: 'white',
    borderRadius: BORDER_RADIUS,
    display: 'flex',
    elevation: 2,
  },
  number: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ff9e9e',
    // paddingTop: 5,
    paddingBottom: 5,
  },
});

export default RestaurantCardOrder;