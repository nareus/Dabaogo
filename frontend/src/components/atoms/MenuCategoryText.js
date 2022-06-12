import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import {PADDING_LEFT} from '../../styles/spacing';

const MenuCategoryText = ({text}) => <Text style={styles.text}>{text}</Text>;

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    paddingLeft: PADDING_LEFT,
    paddingTop: PADDING_LEFT,
    paddingBottom: PADDING_LEFT,
    fontSize: 16,
  },
});

export default MenuCategoryText;
