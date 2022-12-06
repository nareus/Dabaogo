import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming
} from 'react-native-reanimated';
import { BACKGROUND_COLOR, PRIMARY } from '../../../styles/colors';

const TransporterMiniProgressBar = ({ pulseOrNah, showOrNot }) => {
  /* There are 3 different states
       1. Don't show it (when not yet at stage) -> showOrNot false, pulseOrNah false
       2. Show and pulse (when in progress) -> showOrNot true, pulseOrNah true
       3. Show but don't pulse (When complete) -> showOrNot true, pulseOrNah false
    */
  const animation = useSharedValue(0);

  useEffect(() => {
    animation.value = withRepeat(
      withTiming(1, {
        duration: 2000,
        easing: Easing.ease
      }),
      -1,
      false
    );
  }, [animation]);

  // when component mount. scale the component from 0 to 1.
  // also we used interpolate for decreasing opacity. 0.6 to 0

  const animatedStyles = useAnimatedStyle(() => {
    const opacity = interpolate(
      animation.value,
      [0, 1],
      [0.4, 1],
      Extrapolate.CLAMP
    );
    return {
      opacity
      //   transform: [{scale: animation.value}],
    };
  });

  if (!showOrNot && !pulseOrNah) {
    return <View style={styles.notVisible} />;
  } else if (showOrNot && pulseOrNah) {
    return <Animated.View style={[styles.visible, animatedStyles]} />;
  } else if (showOrNot && !pulseOrNah) {
    return <View style={styles.visible} />;
  } else {
    return <View style={styles.huh} />;
  }
};

const styles = StyleSheet.create({
  visible: {
    backgroundColor: PRIMARY,
    // width: 30,
    flex: 1
    // width: '10%',
  },
  notVisible: {
    backgroundColor: BACKGROUND_COLOR,
    flex: 1
    // width: 30,
    // width: '10%',
  },
  huh: {
    backgroundColor: 'purple',
    flex: 1
    // width: 30,
    // width: '10%',
  }
});

export default TransporterMiniProgressBar;
