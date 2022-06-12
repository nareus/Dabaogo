import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import OrdersToTakeUp from './OrdersToTakeUp';

const RestaurantToVisit = () => {
  return (
    <View style = {styles.main}>
    <Image source={'../../images/location.jpeg'} />
    <View style={styles.top}>
      <Text>Restaurant to Visit</Text>
      <View>
        <View>
        <Text>Change</Text>
        </View>
      </View>
    </View>
    <View style ={styles.time}>
        <Text>Yong Tau Fu @ Fine Foods</Text>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
    main: {
        borderRadius: 5
    },
    top: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        height: 50,
        width: '95%',
        marginLeft: '2.5%',
        marginRight: '2.5%',
        marginTop: 20,
        borderRadius: 5,
        },
    time: {
        backgroundColor: '#f19896',
        height: 50,
        width: '95%',
        marginLeft: '2.5%',
        marginRight: '2.5%',
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5

    }
});
export default RestaurantToVisit;