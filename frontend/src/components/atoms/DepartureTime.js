import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import ChangeButton from './TextButton';
import OrdersToTakeUp from '../molecules/OrdersToTakeUp';
import {BORDER_RADIUS} from '../../styles/mixins';
import Padding from './Padding';
import {PADDING_LEFT} from '../../styles/spacing';

const DepartureTime = ({time}) => {
  return (
    <View style={styles.main}>
      <View style={styles.top}>
        <Text style={styles.departureText}>Departure Time</Text>
        <ChangeButton text={'Change'} onPress={() => {}} />
      </View>
      <View style={styles.time}>
        <Text style={styles.currentTime}>{time}</Text>
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
    padding: PADDING_LEFT,
    marginTop: 20,
    borderRadius: 5,
  },
  departureText: {
    fontWeight: 'bold',
<<<<<<< HEAD
    fontSize: 17,
    color: 'black',
=======
>>>>>>> refs/remotes/origin/main
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
