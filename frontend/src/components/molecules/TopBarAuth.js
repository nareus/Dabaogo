import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  BACKGROUND_COLOR,
  LINE_COLOR,
  PRIMARY,
  SECONDARY,
} from '../../styles/colors';
import {FORM_LINE_WIDTH} from '../../styles/mixins';
import {FORM_GAP} from '../../styles/spacing';
import GeneralButton from '../atoms/GeneralButton';
import Padding from '../atoms/Padding';
import Toggle from '../atoms/Toggle';

const TopBarAuth = ({
  selectionState,
  onPress,
  onSignUpPress,
  onSignInPress,
}) => (
  <View style={styles.bigContainer}>
    <View style={styles.container}>
      <Toggle
        initialState={selectionState}
        onSignInPress={onSignInPress}
        onSignUpPress={onSignUpPress}
        selectionColor={PRIMARY}
        unselectionColor={SECONDARY}
        leftContent={'Sign up'}
        rightContent={'Sign in'}
        height={155}
        width={38}
      />
      <GeneralButton
        onPress={onPress}
        iconName="cross"
        iconType="entypo"
        backgroundColor={BACKGROUND_COLOR}
        color={'black'}
        position={'absolute'}
        size={24}
      />

      {/* <GeneralButton onPress={onPress} name="cross" ="entypo" /> */}
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
  bigContainer: {
    paddingBottom: FORM_GAP,
    borderBottomColor: LINE_COLOR,
    borderBottomWidth: FORM_LINE_WIDTH,
  },
});

export default TopBarAuth;
