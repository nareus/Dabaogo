import * as React from 'react'
import { StyleSheet, View, Text } from 'react-native'

import GeneralButton from '../atoms/GeneralButton'

const TopBar = ({ onPress, text, iconName, iconType }) => (
  <View style={styles.bigContainer}>
    <View style={styles.container}>
      <View style={styles.button}>
        <GeneralButton
          onPress={onPress}
          iconName={iconName}
          iconType={iconType}
          backgroundColor={'white'}
          color={'black'}
          position={'absolute'}
          size={22}
        />
        {/* <GeneralButton onPress={onPress} /> */}
      </View>
      <Text style={styles.text}>{text}</Text>
    </View>
  </View>

  // <SafeAreaView style={styles.bigContainer}>
  //   <View
  //     style={{
  //       // paddingTop: 30,
  //       // justifyContent: 'space-between',
  //       // alignContent: 'center',
  //       // paddingLeft: 30,
  //       flexDirection: 'row',
  //       // width: '100%',
  //     }}>
  //     {/* <GeneralButton onPress={onPress} /> */}
  //     <Text>Taiwanese</Text>
  //   </View>
  // </SafeAreaView>
)

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    justifyContent: 'center',
    // alignContent: 'center',
    // paddingLeft: 30,
    flexDirection: 'row',
    width: '100%'
  },
  button: {
    position: 'absolute',
    left: 0,
    top: 17
  },
  bigContainer: {
    // paddingBottom: 100,
    width: '100%',
    position: 'relative',
    // color: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    backgroundColor: 'white'
  },
  text: {
    fontWeight: 'bold',
    color: 'black'
  }
})

export default TopBar
