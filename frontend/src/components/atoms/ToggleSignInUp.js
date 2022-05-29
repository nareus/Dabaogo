import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {BORDER_RADIUS} from '../../styles/mixins';

const ToggleSignInUp = ({
  onSignUpPress,
  onSignInPress,
  initialState,
  unselectionColor,
  selectionColor,
}) => {
  const [active, setActive] = useState(initialState);
  let transformX = useRef(new Animated.Value(0)).current;
  const WIDTH = 155;
  const HEIGHT = 38;

  useEffect(() => {
    if (active) {
      Animated.timing(transformX, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(transformX, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start();
    }
  }, [active]);

  const rotationX = transformX.interpolate({
    inputRange: [0, 1],
    outputRange: [0, WIDTH / 2],
  });

  return (
    <SafeAreaView
      style={{
        width: WIDTH,
        alignItems: 'center',
      }}>
      <View
        style={{
          left: Dimensions.get('screen').width / 2 - WIDTH / 2,
          flexDirection: 'row',
          position: 'relative',
          height: HEIGHT,
          width: WIDTH,
          borderRadius: BORDER_RADIUS,
          backgroundColor: unselectionColor,
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
                translateX: rotationX,
              },
            ],
            backgroundColor: selectionColor,
          }}></Animated.View>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            setActive(false);
            if (active) {
              onSignUpPress();
            }
          }}>
          <Text style={{color: active ? 'black' : 'white', fontWeight: 'bold'}}>
            Sign Up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            setActive(true);
            if (!active) {
              onSignInPress();
            }
          }}>
          <Text style={{color: active ? 'white' : 'black', fontWeight: 'bold'}}>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default ToggleSignInUp;
