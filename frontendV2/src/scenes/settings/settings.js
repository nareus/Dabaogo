import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import TopBar from '../../components/molecules/TopBar';
import {userLogout} from '../../redux/userSlice';
import {PRIMARY} from '../../styles/colors';

const SettingsScreen = props => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Landing');
            dispatch(userLogout());
          }}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>

      <TopBar
        onPress={() => props.navigation.goBack()}
        text={'Profile'}
        iconName={'chevron-left'}
        iconType={'feather'}
      />
    </SafeAreaView>
  );
};

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
