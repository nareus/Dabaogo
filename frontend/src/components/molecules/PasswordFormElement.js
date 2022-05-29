import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FORM_INPUT_TEXT, LINE_COLOR} from '../../styles/colors';
import {FORM_LINE_WIDTH} from '../../styles/mixins';
import {GAP_FORM_FIELD} from '../../styles/spacing';
import FormInput from '../atoms/FormInput';
import FormText from '../atoms/FormText';

const PasswordFormElement = ({inputText, onChangeText}) => {
  const [showPassword, setVisibility] = useState(true);

  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomColor: LINE_COLOR,
        borderBottomWidth: FORM_LINE_WIDTH,
      }}>
      <FormText text={'Password'} />
      <FormInput
        placeholder={'at least 8 characters'}
        onChangeText={onChangeText}
        inputText={inputText}
        showText={showPassword}
      />
      <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingRight: 10,
        }}
        onPress={() => setVisibility(!showPassword)}>
        <Text style={{fontWeight: 'bold'}}>Show</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PasswordFormElement;
