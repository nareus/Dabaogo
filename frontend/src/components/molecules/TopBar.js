import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {LINE_COLOR, PRIMARY, SECONDARY} from '../../styles/colors';
import {FORM_LINE_WIDTH} from '../../styles/mixins';
import {FORM_GAP} from '../../styles/spacing';
import ExitButton from '../atoms/ExitButton';
import ToggleSignInUp from '../atoms/ToggleSignInUp';

const TopBar = ({selectionState, onPress, onSignUpPress, onSignInPress}) => (
  <View
    style={{
      paddingBottom: FORM_GAP,
      borderBottomColor: LINE_COLOR,
      borderBottomWidth: FORM_LINE_WIDTH,
    }}>
    <View style={styles.container}>
      <ToggleSignInUp
        initialState={selectionState}
        onSignInPress={onSignInPress}
        onSignUpPress={onSignUpPress}
        selectionColor={PRIMARY}
        unselectionColor={SECONDARY}
      />
      <ExitButton onPress={onPress} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    // alignSelf: 'stretch',
    height: 40,
    // paddingBottom: 60,
    flexDirection: 'row', // row
    alignItems: 'center',
    justifyContent: 'space-between', // center, space-around
    // paddingLeft: 10,
    // paddingRight: 10
  },
});

export default TopBar;
