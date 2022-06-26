import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TopBarOrder from '../../components/molecules/TopBarOrder';
import {PRIMARY} from '../../styles/colors';

const SettingsScreen = props => (
  <SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
      <TouchableOpacity onPress={() => props.navigation.navigate('Landing')}>
        <Text style={styles.logout}>Logout</Text>
      </TouchableOpacity>
    </View>

    <TopBarOrder
      onPress={() => props.navigation.goBack()}
      text={'Profile'}
      iconName={'chevron-left'}
      iconType={'feather'}
    />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logout: {
    fontWeight: 'bold',
    fontSize: 18,
    color: PRIMARY,
    textDecorationLine: 'underline',
  },
});

export default SettingsScreen;
