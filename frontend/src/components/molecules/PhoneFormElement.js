import React from 'react';
import {StyleSheet, View} from 'react-native';
import {LINE_COLOR} from '../../styles/colors';
import {FORM_LINE_WIDTH} from '../../styles/mixins';
import FormInput from '../atoms/FormInput';
import FormText from '../atoms/FormText';

const PhoneFormElement = ({inputText, onChangeText}) => {
  return (
    <View style={styles.container}>
      <FormText text={'Phone'} />
      <FormInput
        placeholder={'Required'}
        onChangeText={onChangeText}
        inputText={inputText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomColor: LINE_COLOR,
    borderBottomWidth: FORM_LINE_WIDTH,
  },
});

export default PhoneFormElement;
