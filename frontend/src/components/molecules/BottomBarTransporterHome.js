import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import {PRIMARY, SECONDARY} from '../../styles/colors';

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: 'white',
    elevation: 2,
    height: 130, 
    flexDirection: 'column', 
    justifyContent: 'space-around'
  },
  profit: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15,
    justifyContent: 'space-between',
  },
  button: {
    marginBottom: 10,
    marginLeft:'5%',
    marginRight: '5%',
    borderRadius: 5,
    backgroundColor: PRIMARY, 
    paddingTop: 12, 
    paddingBottom: 12
    
  }
});

const BottomBarTransporterHome = ({selectionState, onLeftPress, onRightPress}) => {
  return (
    <View style={styles.bottomBar}>
      <View style={styles.profit}>
        <Text style={{fontSize: 15, paddingLeft: 10}}>Total Profit</Text>
        <Text style={{fontSize: 15, paddingRight: 10}}>$3.00</Text>
      </View>
      <View style={styles.button}>
        <Text style={{color:'white', textAlign: 'center'}}>Confirm Availability</Text>
      </View>
    </View>
  );
};

export default BottomBarTransporterHome;