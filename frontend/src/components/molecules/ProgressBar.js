import React, {useState} from 'react';
import {View} from 'react-native';

import {StyleSheet} from 'react-native';
import {BACKGROUND_COLOR, PRIMARY} from '../../styles/colors';
import MiniProgressBar from '../atoms/MiniProgressBar';

const MiniGap = () => {
  return <View style={styles.miniGap} />;
};

const ProgressBar = ({currentStatus, isDone}) => {
  return (
    <View style={styles.horizontalBar}>
      <MiniProgressBar
        pulseOrNah={currentStatus === 'Finding food transporter'}
        showOrNot={currentStatus === 'Finding food transporter' || isDone[0]}
      />
      <MiniGap />
      <MiniProgressBar
        pulseOrNah={currentStatus === 'on the way there'}
        showOrNot={currentStatus === 'on the way there' || isDone[1]}
      />
      <MiniGap />
      <MiniProgressBar
        pulseOrNah={currentStatus === 'waiting for food'}
        showOrNot={currentStatus === 'waiting for food' || isDone[2]}
      />
      <MiniGap />
      <MiniProgressBar
        pulseOrNah={currentStatus === 'on the way back'}
        showOrNot={currentStatus === 'on the way back' || isDone[3]}
      />
      <MiniGap />
      <MiniProgressBar
        pulseOrNah={currentStatus === 'Food has been delivered!'}
        showOrNot={currentStatus === 'Food has been delivered!' || isDone[4]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  horizontalBar: {
    flexDirection: 'row',
    backgroundColor: BACKGROUND_COLOR,
    height: 15,
  },
  miniGap: {
    backgroundColor: BACKGROUND_COLOR,
    paddingRight: 5,
  },
});
export default ProgressBar;
