import React from 'react';
import {StyleSheet, View} from 'react-native';
import MapboxGL from '@rnmapbox/maps';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiZnJvZ2d5ZG9vZGxlIiwiYSI6ImNrcHcwdHA2aTA2YXcydW1mZWpyZnRxZ2cifQ.zJ5a0gGP7_s-76Fi1f-iTw',
);

const Map = () => {
  return (
    <View style={styles.container}>
      <MapboxGL.MapView style={styles.map} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: '100%',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  map: {
    height: 200,
    width: '100%',
  },
});

export default Map;
