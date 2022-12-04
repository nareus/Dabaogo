import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  StyleSheet
} from 'react-native';
import { BORDER_RADIUS } from '../../../styles/mixins';

const Toggle = ({
  onSignUpPress,
  onSignInPress,
  initialState,
  unselectionColor,
  selectionColor,
  leftContent,
  rightContent,
  height,
  width
}) => {
  const [active, setActive] = useState(initialState);
  const transformX = useRef(new Animated.Value(0)).current;
  const WIDTH = height;
  const HEIGHT = width;

  useEffect(() => {
    if (active) {
      Animated.timing(transformX, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true
      }).start();
    } else {
      Animated.timing(transformX, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true
      }).start();
    }
  }, [active]);

  const rotationX = transformX.interpolate({
    inputRange: [0, 1],
    outputRange: [0, WIDTH / 2]
  });

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View
        style={{
          left: Dimensions.get('screen').width / 2 - WIDTH / 2,
          flexDirection: 'row',
          position: 'relative',
          height: HEIGHT,
          width: WIDTH,
          borderRadius: BORDER_RADIUS,
          backgroundColor: unselectionColor
        }}>
        <Animated.View
          style={{
            position: 'absolute',
            height: HEIGHT,
            // top: 2,
            // bottom: 2,
            borderRadius: BORDER_RADIUS,
            width: WIDTH / 2,
            transform: [
              {
                translateX: rotationX
              }
            ],
            backgroundColor: selectionColor
          }}
        />
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={() => {
            setActive(false);
            if (active) {
              onSignUpPress();
            }
          }}>
          <Text style={{ color: active ? 'black' : 'white', fontWeight: 'bold' }}>
            {leftContent}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={() => {
            setActive(true);
            if (!active) {
              onSignInPress();
            }
          }}>
          <Text style={{ color: active ? 'white' : 'black', fontWeight: 'bold' }}>
            {rightContent}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = props =>
  StyleSheet.create({
    safeAreaView: {
      width: props.WIDTH,
      alignItems: 'center'
    }
  });

export default Toggle;
