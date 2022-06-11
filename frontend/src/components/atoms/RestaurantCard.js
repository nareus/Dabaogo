import React from 'react';
import { View, Text, Image, ScrollView, TextInput, StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';


const styles = StyleSheet.create({

    image: {
      width: '100%',
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      flex: 2
    },
    details:{
      flex: 1, 
      flexDirection: 'row', 
      justifyContent: 'space-between'
    },
    restaurantName :{
      fontWeight: 'bold',
      fontSize: 20, 
      paddingTop: 5
    },
    card: {
      height: 250,
      width: '96%',
      marginLeft: '2%', 
      marginRight: '2%',
      marginTop: 25,
      backgroundColor: 'white',
      borderRadius: 5,
      display: 'flex',
      elevation: 2
    },
    number: {
      fontSize: 25,
      color: '#ff9e9e',
      paddingLeft: 30, 
      paddingTop: 10
    }
        
})

const RestaurantCard = () => {
  return (
      <View style={styles.card}>
      <Image
          source={require('../../images/taiwanese.png')}
          style={styles.image}
        />
      <View style={styles.details}>
        <View style ={{justifyContent: 'flex-start',paddingLeft: 20}}>
          <Text style = {styles.restaurantName}>Taiwanese</Text>
          <Text>Flavours@Utown</Text>
          <Text>Food Court</Text>
        </View>
        <View style = {{justifyContent: 'space-around'}}>
          <Text style = {styles.number}>5</Text>
          <Text style={{flex:1, justifyContent: 'center', fontWeight: 'bold', paddingRight: 20}}>transporters</Text>
        </View>
      </View>
      </View>

  );
}

export default RestaurantCard;