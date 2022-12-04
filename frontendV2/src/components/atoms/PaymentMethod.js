import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { BORDER_RADIUS } from '../../styles/mixins'
import { PADDING_LEFT } from '../../styles/spacing'
import TextButton from './TextButton'

const PaymentMethod = ({ paymentMethod, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{paymentMethod}</Text>
      <TextButton text={'Change'} onPress={onPress} />
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold'
  },
  container: {
    padding: PADDING_LEFT,
    borderRadius: BORDER_RADIUS,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
export default PaymentMethod
