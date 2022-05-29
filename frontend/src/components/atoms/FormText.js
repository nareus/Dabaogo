import React from 'react';
import {View, Text} from 'react-native';

const FormText = ({text}) => (
  <View
    style={{
      height: 42,
      width: '28%',
      alignItems: 'center',
      justifyContent: 'flex-end',
      flexDirection: 'row',
      paddingRight: 18,
    }}>
    <Text style={{fontWeight: 'bold'}}>{text}</Text>
  </View>
);

export default FormText;
