import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {PADDING_LEFT} from '../../styles/spacing';

const RestaurantCard = props => {
  return (
    <View style={styles(props).card}>
      <Image
        source={require('../../images/taiwanese.png')}
        style={styles(props).image}
      />
      <View style={styles(props).alignmentContainer}>
        <View style={styles(props).details}>
          <View style={styles(props).leftText}>
            <Text style={styles(props).restaurantName}>Taiwanese</Text>
            <Text style={styles(props).locationAndCategory}>
              Flavours@Utown
            </Text>
            <Text style={styles(props).locationAndCategory}>Food Court</Text>
          </View>
          <View style={styles(props).rightText}>
            <Text style={styles(props).number}>5</Text>
            <Text style={styles(props).transporterText}>transporters</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = props =>
  StyleSheet.create({
    image: {
      width: '100%',
      borderTopLeftRadius: props.borderRadius,
      borderTopRightRadius: props.borderRadius,
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
      paddingBottom: 5,
    },
    alignmentContainer: {
      justifyContent: 'center',
      backgroundColor: 'white',
      flex: 1,
      padding: PADDING_LEFT,
    },
    locationAndCategory: {
      color: '#595959',
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
      width: props.cardWidth,
      marginLeft: props.LRmargin,
      marginRight: props.LRmargin,
      marginTop: props.marginTop,
      backgroundColor: 'white',
      borderRadius: props.borderRadius,
      display: 'flex',
      elevation: 2,
    },
    number: {
      fontSize: 25,
      fontWeight: 'bold',
      color: '#ff9e9e',
      paddingTop: 5,
      paddingBottom: 5,
    },
  });

export default RestaurantCard;
