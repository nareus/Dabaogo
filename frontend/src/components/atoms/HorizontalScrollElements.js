import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const HorizontalScrollElements = ({title, price}) => {
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <Text>{price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
  },
});

export default HorizontalScrollElements;
