import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FORM_LINE_WIDTH} from '../../styles/mixins';
import {FORM_GAP} from '../../styles/spacing';
import GeneralButton from '../atoms/GeneralButton';

const TopBarOrder = ({onPress}) => (
  <SafeAreaView style={styles.bigContainer}>
    <View style={styles.container}>
      <GeneralButton onPress={onPress} />
      <Text style={styles.text}>Taiwanese</Text>
      <Text style={styles.text}>Taiwanese</Text>
      <Text style={styles.text}>Taiwanese</Text>
      {/* <GeneralButton onPress={onPress} name="cross" type="entypo" /> */}
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    flexDirection: 'row', // row
    alignItems: 'center',
    justifyContent: 'space-between', // center, space-around
  },
  bigContainer: {
    // paddingBottom: 100,
    width: '100%',
    position: 'absolute',
    height: 100,
    backgroundColor: 'white',
    borderBottomWidth: FORM_LINE_WIDTH,
  },
  text: {
    fontWeight: 'bold',
  },
});

export default TopBarOrder;
