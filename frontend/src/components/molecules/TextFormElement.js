import React from 'react';
import {StyleSheet, View} from 'react-native';
import {LINE_COLOR} from '../../styles/colors';
import {FORM_LINE_WIDTH} from '../../styles/mixins';
import FormInput from '../atoms/FormInput';
import FormText from '../atoms/FormText';

const TextFormElement = ({text, inputText, onChangeText}) => (
  <View style={styles.container}>
    <FormText text={text} />
    <FormInput
      placeholder={'Required'}
      onChangeText={onChangeText}
      defaultValue={inputText}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomColor: LINE_COLOR,
    borderBottomWidth: FORM_LINE_WIDTH,
  },
});

export default TextFormElement;
