import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import ChangeButton from './TextButton';
import OrdersToTakeUp from '../molecules/OrdersToTakeUp';
import {BORDER_RADIUS} from '../../styles/mixins';
import Padding from './Padding';
import {PADDING_LEFT} from '../../styles/spacing';

const DepartureTime = () => {
  return (
    <View style={styles.main}>
      <View style={styles.top}>
        <Text style={styles.departureText}>Departure Time</Text>
        <ChangeButton title={'Change'} onPress={() => {}} />
      </View>
      <View style={styles.time}>
        <Text style={styles.currentTime}>10:30 am</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    borderRadius: BORDER_RADIUS,
  },
  top: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    height: 50,
    padding: PADDING_LEFT,
    marginTop: 20,
    borderRadius: 5,
  },
  departureText: {
    fontWeight: 'bold',
    fontSize: 17,
    color: 'black',
  },
  currentTime: {
    fontWeight: 'bold',
    color: 'white',
  },
  time: {
    backgroundColor: '#f19896',
    height: 50,
    padding: PADDING_LEFT,
    // width: '95%',
    // marginLeft: '2.5%',
    // marginRight: '2.5%',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
});
export default DepartureTime;
