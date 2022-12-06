import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {convertToMoney} from '../../../constants';
import {BUTTON_TEXT_2, PRIMARY} from '../../../styles/colors';
import {PADDING_LEFT} from '../../../styles/spacing';
import Padding from '../../atoms/style/Padding';
import {RootState} from '../../../redux';
import SignInUpButton from '../../atoms/button/SignInUpButton';

const BottomBarTransporterHome = ({price, onPress}) => {
  const {user} = useSelector((state: RootState) => state.user);

  return (
    <View style={styles.container}>
      <View style={styles.orderRow}>
        <Text style={styles.text}>Total</Text>
        <Text style={styles.text}>{convertToMoney(price)}</Text>
      </View>
      <Padding />
      <SignInUpButton
        disabled={user.isTransporter || user.currOrderId !== null}
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
