import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { BACKGROUND_COLOR } from '../../../styles/colors';
import MiniProgressBar from '../../atoms/duringDelivery/MiniProgressBar';

const MiniGap = () => {
  return <View style={styles.miniGap} />;
};

const ProgressBar = ({ currentStatus }) => {
  const { buyerProgress } = useSelector(state => state.transporter);

  return (
    <View style={styles.horizontalBar}>
      <MiniProgressBar
        pulseOrNah={currentStatus === 'Finding food transporter'}
        showOrNot={
          currentStatus === 'Finding food transporter' || buyerProgress[0]
        }
      />
      <MiniGap />
      <MiniProgressBar
        pulseOrNah={currentStatus === 'on the way there'}
        showOrNot={currentStatus === 'on the way there' || buyerProgress[1]}
      />
      <MiniGap />
      <MiniProgressBar
        pulseOrNah={currentStatus === 'waiting for food'}
        showOrNot={currentStatus === 'waiting for food' || buyerProgress[2]}
      />
      <MiniGap />
      <MiniProgressBar
        pulseOrNah={currentStatus === 'on the way back'}
        showOrNot={currentStatus === 'on the way back' || buyerProgress[3]}
      />
      <MiniGap />
      <MiniProgressBar
        pulseOrNah={currentStatus === 'Food has been delivered!'}
        showOrNot={
          currentStatus === 'Food has been delivered!' || buyerProgress[4]
        }
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
export default ProgressBar;
