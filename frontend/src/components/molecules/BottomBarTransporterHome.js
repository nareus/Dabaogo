import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import {convertToMoney} from '../../constants';
import {BUTTON_TEXT_2, PRIMARY, SECONDARY} from '../../styles/colors';
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

// const BottomBarTransporterHome = ({price}) => {
//   return (
//     <View style={styles.bottomBar}>
//       <View style={styles.profit}>
//         <Text style={{fontSize: 15, paddingLeft: 10}}>Total Profit</Text>
//         <Text style={{fontSize: 15, paddingRight: 10}}>
//           {convertToMoney(price)}
//         </Text>
//       </View>
//       <View style={styles.button}>
//         <Text style={{color: 'white', textAlign: 'center'}}>
//           Confirm Availability
//         </Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   bottomBar: {
//     backgroundColor: 'white',
//     elevation: 2,
//     height: 130,
//     flexDirection: 'column',
//     justifyContent: 'space-around',
//   },
//   profit: {
//     flexDirection: 'row',
//     paddingTop: 15,
//     paddingBottom: 15,
//     justifyContent: 'space-between',
//   },
//   button: {
//     marginBottom: 10,
//     marginLeft: '5%',
//     marginRight: '5%',
//     borderRadius: 5,
//     backgroundColor: PRIMARY,
//     paddingTop: 12,
//     paddingBottom: 12,
//   },
// });

// export default BottomBarTransporterHome;
