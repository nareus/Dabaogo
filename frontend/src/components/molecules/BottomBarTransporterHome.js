import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import {convertToMoney} from '../../constants';
import {BUTTON_TEXT_2, PRIMARY} from '../../styles/colors';
import {PADDING_LEFT} from '../../styles/spacing';
import Padding from '../atoms/Padding';
import SignInUpButton from '../atoms/SignInUpButton';

const BottomBarTransporterHome = ({price, onPress}) => {
  return (
    <View style={styles.container}>
      <View style={styles.orderRow}>
        <Text style={styles.text}>Total</Text>
        <Text style={styles.text}>{convertToMoney(price)}</Text>
      </View>
      <Padding />
      <SignInUpButton
        backgroundColor={PRIMARY}
        color={BUTTON_TEXT_2}
        title="Confirm Availability"
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: PADDING_LEFT,
    backgroundColor: 'white',
    paddingBottom: 50,
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // padding: 10,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
export default BottomBarTransporterHome;
