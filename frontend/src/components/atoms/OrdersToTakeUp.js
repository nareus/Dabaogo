import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const OrdersToTakeUp = () => {
  return (
    <View style={styles.main}>
      <Text style = {styles.text}>Orders to take up</Text>
      <View style = {styles.choose}>
        <Icon name='minuscircleo' size={20} style={styles.icon} /> 
        <View style={styles.box}>
        <Text>3</Text>
        </View>
        <Icon name='pluscircleo'size={20} style={styles.icon}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
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
  text: {
      fontSize: 17, 
      fontWeight: 'bold', 
      flex: 2,
      paddingLeft: 10,
      paddingTop: 10, 
      paddingBottom: 10
  },
  choose: {
      display: 'flex',
      flexDirection: 'row',
      flex: 1.3
  }, 
  box:{
    display: 'flex',
      backgroundColor: '#f19896',
      height: 23,
      width: 35,
      marginBottom: 0, 
      marginTop: 15, 
      paddingLeft: 14,
      paddingRight: 14,
      paddingTop: 1,
      borderRadius: 5
  },
  number: {
      display: 'flex',
      fontSize: 15, 
      paddingBottom: 2, 
      padddingTop: 2,
      marginLeft: 5,
      marginRight: 5
  }, 
  icon: {
      paddingTop: '10%',
      paddingBottom: '10%',
      paddingLeft: 10,
      paddingRight: 10,
      color: '#f19896'
  }
}
);

export default OrdersToTakeUp;
