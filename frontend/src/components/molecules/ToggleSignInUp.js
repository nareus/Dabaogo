import { useState } from 'react';
import * as React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
 
const ToggleSignInUp = ({
  navigation,
  selectionMode,
  roundCorner,
  option1,
  option2,
  onSelectSwitch,
  selectionColor
}) => {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);
  const [getRoundCorner, setRoundCorner] = useState(roundCorner);
 
  const updatedSwitchData = val => {
    setSelectionMode(val);
    onSelectSwitch(val);
  };
 
  return (
    <View>
      <View
        style={{
          alignSelf: 'center',
          height: 40,
          width: 160,
          backgroundColor: '#DFDEDE',
          borderRadius: getRoundCorner ? 5 : 0,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(1)}
          style={{
            flex: 1,
            backgroundColor: getSelectionMode == 1 ? selectionColor : '#DFDEDE',
            borderRadius: getRoundCorner ? 5 : 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: getSelectionMode == 1 ? 'white' : 'black',
            }}>
            {option1}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(2)}
          style={{
            flex: 1,
            backgroundColor: getSelectionMode == 2 ? selectionColor : '#DFDEDE',
            borderRadius: getRoundCorner ? 5 : 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: getSelectionMode == 2 ? 'white' : 'black',
            }}>
            {option2}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ToggleSignInUp;