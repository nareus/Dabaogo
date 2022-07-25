import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ChangeButton from './TextButton';
import {BORDER_RADIUS} from '../../styles/mixins';
import {PADDING_LEFT} from '../../styles/spacing';
import DatePicker from 'react-native-date-picker';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux';
import {changeDepartureTime} from '../../redux/transporterSlice';
import {convertToDate, formatAMPM} from '../../constants';

const DepartureTime = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const {departureTime} = useSelector((state: RootState) => state.transporter);

  console.log(departureTime);
  console.log(convertToDate(departureTime));
  return (
    <View style={styles.main}>
      <View style={styles.top}>
        <Text style={styles.departureText}>Departure Time</Text>
        <ChangeButton text={'Change'} onPress={() => setOpen(true)} />
      </View>
      <DatePicker
        modal
        mode="time"
        open={open}
        date={convertToDate(departureTime)}
        onConfirm={date => {
          setOpen(false);
          dispatch(changeDepartureTime(formatAMPM(date, 0)));
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <View style={styles.time}>
        <Text style={styles.currentTime}>{departureTime}</Text>
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
