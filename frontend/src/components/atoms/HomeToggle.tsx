/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Alert,
} from 'react-native';
import {BORDER_RADIUS} from '../../styles/mixins';

import {useSelector} from 'react-redux';
import {RootState} from '../../redux';

const HomeToggle = (props: {
  onAvailablePress: Function;
  onTransporterPress: Function;
  unselectionColor: string;
  selectionColor: string;
  leftContent: string;
  rightContent: string;
  height: number;
  width: number;
}) => {
  const {user} = useSelector((state: RootState) => state.user);
  const [active, setActive] = useState(
    user.currOrderId === null && user.isTransporter,
  );
  let transformX = useRef(new Animated.Value(0)).current;
  const WIDTH = props.height;
  const HEIGHT = props.width;

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
  }, [active, transformX]);

  const rotationX = transformX.interpolate({
    inputRange: [0, 1],
    outputRange: [0, WIDTH / 2],
  });

  return (
    <SafeAreaView>
      <View
        style={{
          left: Dimensions.get('screen').width / 2 - WIDTH / 2,
          flexDirection: 'row',
          position: 'relative',
          height: HEIGHT,
          width: WIDTH,
          borderRadius: BORDER_RADIUS,
          backgroundColor: props.unselectionColor,
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
            backgroundColor: props.selectionColor,
          }}
        />
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            if (user.isTransporter) {
              console.log('user is transporter');
              // setActive(true);
              //   if (!active) {
              // props.onAvailablePress();
              //   }
              Alert.alert('You currently have an order in progress');
            } else if (user.currOrderId === null) {
              setActive(0);
              if (active) {
                props.onTransporterPress();
              }
            }
          }}>
          <Text style={{color: active ? 'black' : 'white', fontWeight: 'bold'}}>
            {props.leftContent}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            if (user.currOrderId === null) {
              setActive(1);
              if (!active) {
                props.onAvailablePress();
              }
            } else if (!user.isTransporter) {
              // setActive(false);
              // //   if (active) {
              // props.onTransporterPress();
              //   }
              Alert.alert('You currently have an order in progress');
            }
          }}>
          <Text style={{color: active ? 'white' : 'black', fontWeight: 'bold'}}>
            {props.rightContent}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeToggle;
