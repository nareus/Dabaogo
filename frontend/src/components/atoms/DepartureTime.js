import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import ChangeButton from './TextButton';
import OrdersToTakeUp from '../molecules/OrdersToTakeUp';

const DepartureTime = () => {
  return (
    <View style={styles.main}>
      <View style={styles.top}>
        <Text>Departure Time</Text>
        <ChangeButton
          title={'Change'}
          onPress={() => console.log('presseddd')}
        />
      </View>
      <View style={styles.time}>
        <Text>10:30 am</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    borderRadius: 5,
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
    borderBottomLeftRadius: 5,
  },
});
export default DepartureTime;
