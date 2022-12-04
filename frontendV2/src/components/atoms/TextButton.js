import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { PRIMARY } from '../../styles/colors'

const TextButton = ({ text, onPress }) => {
  // return <Button title={text} style={styles.text} onPress={onPress} />;
  return (
    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  text: {
    color: PRIMARY,
    fontWeight: 'bold'
  }
})
export default TextButton
