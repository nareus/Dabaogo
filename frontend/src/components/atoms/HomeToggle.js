import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Alert,
} from 'react-native';
import {BORDER_RADIUS} from '../../styles/mixins';

const HomeToggle = ({
  hasOrder,
  isTransporter,
  onAvailablePress,
  onTransporterPress,
  initialState,
  unselectionColor,
  selectionColor,
  leftContent,
  rightContent,
  height,
  width,
}) => {
  const [active, setActive] = useState(initialState);
  let transformX = useRef(new Animated.Value(0)).current;
  const WIDTH = height;
  const HEIGHT = width;

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

  console.log(hasOrder);
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
          }}
        />
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            if (!hasOrder) {
              setActive(false);
              if (active) {
                onTransporterPress();
              }
            } else if (!isTransporter) {
              setActive(false);
              //   if (active) {
              onTransporterPress();
              //   }
            } else {
              Alert.alert('You currently have an order in progress');
            }
          }}>
          <Text style={{color: active ? 'black' : 'white', fontWeight: 'bold'}}>
            {leftContent}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            if (!hasOrder) {
              setActive(true);
              if (!active) {
                onAvailablePress();
              }
            } else if (isTransporter) {
              setActive(true);
              //   if (!active) {
              onAvailablePress();
              //   }
            } else {
              Alert.alert('You currently have an order in progress');
            }
          }}>
          <Text style={{color: active ? 'white' : 'black', fontWeight: 'bold'}}>
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
      alignItems: 'center',
    },
  });

export default HomeToggle;
