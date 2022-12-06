import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { BORDER_RADIUS } from '../../../styles/mixins';
import { PADDING_LEFT } from '../../../styles/spacing';

const LocationToVisit = ({ text, location, onChangeButtonPress }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../../images/map.png')} style={styles.image} />
      <View style={styles.top}>
        <Text style={styles.text}>{text}</Text>
        {/* <ChangeButton text={'Change'} onPress={onChangeButtonPress} /> */}
      </View>
      <View style={styles.time}>
        <Text style={styles.locationToVisit}>{location}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS
    // marginTop: PADDING_LEFT,
  },
  top: {
    padding: PADDING_LEFT,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 5
  },
  time: {
    padding: PADDING_LEFT,
    backgroundColor: '#f19896',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5
  },
  image: {
    height: 200,
    width: '100%',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5
  },
  restaurantToVisit: {
    fontWeight: 'bold'
  },
  locationToVisit: {
    fontWeight: 'bold',
    color: 'white'
  },
  text: {
    fontWeight: 'bold',
    color: 'black'
  }
});
export default LocationToVisit;
