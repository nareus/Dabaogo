import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-elements';
import {PRIMARY} from '../../styles/colors';
import {BORDER_RADIUS} from '../../styles/mixins';
import {PADDING_LEFT} from '../../styles/spacing';
import TextButton from './TextButton';

const Notes = ({name, onPress, content}) => {
  return (
    <View style={styles.container}>
      <TextButton text={name} onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: PRIMARY,
    fontWeight: 'bold',
  },
  container: {
    padding: PADDING_LEFT,
    borderRadius: BORDER_RADIUS,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default Notes;
