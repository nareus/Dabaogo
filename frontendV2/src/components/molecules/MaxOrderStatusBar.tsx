import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {PRIMARY} from '../../styles/colors';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux';

const MaxOrderStatusBar = () => {
  const {currMaxOrder} = useSelector((state: RootState) => state.restaurants);
  return (
    <View style={styles.bigContainer}>
      <View style={styles.container}>
        <Text style={styles.text}>Max number of orders is {currMaxOrder}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    // alignContent: 'center',
    // paddingLeft: 30,
    flexDirection: 'row',
    width: '100%',
  },
  bigContainer: {
    // paddingBottom: 100,
    width: '100%',
    position: 'relative',
    // color: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: PRIMARY,
    elevation: 4,
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
  },
});

export default MaxOrderStatusBar;
