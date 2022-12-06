import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BACKGROUND_COLOR } from '../../../styles/colors';
import TransporterMiniProgressBar from '../../atoms/duringDelivery/TransporterMiniProgressBar';
const MiniGap = () => {
  return <View style={styles.miniGap} />;
};

const TransporterProgressBar = ({ currentStatus, isDone }) => {
  return (
    <View style={styles.horizontalBar}>
      <TransporterMiniProgressBar
        pulseOrNah={currentStatus === 'Waiting for orders'}
        showOrNot={currentStatus === 'Waiting for orders' || true}
      />
      <MiniGap />
      <TransporterMiniProgressBar
        pulseOrNah={currentStatus === 'On the way there'}
        showOrNot={currentStatus === 'On the way there' || isDone[0]}
      />
      <MiniGap />
      <TransporterMiniProgressBar
        pulseOrNah={currentStatus === 'Waiting for food'}
        showOrNot={currentStatus === 'Waiting for food' || isDone[1]}
      />
      <MiniGap />
      <TransporterMiniProgressBar
        pulseOrNah={currentStatus === 'On the way back'}
        showOrNot={currentStatus === 'On the way back' || isDone[2]}
      />
      <MiniGap />
      <TransporterMiniProgressBar
        pulseOrNah={false}
        showOrNot={currentStatus === 'Food has been delivered!' || isDone[3]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  horizontalBar: {
    flexDirection: 'row',
    backgroundColor: BACKGROUND_COLOR,
    height: 15
  },
  miniGap: {
    backgroundColor: BACKGROUND_COLOR,
    paddingRight: 5
  }
});
export default TransporterProgressBar;
