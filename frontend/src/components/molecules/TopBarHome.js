import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import Toggle from '../atoms/Toggle';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Text} from 'react-native-elements';
import {PRIMARY, SECONDARY} from '../../styles/colors';

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: 'white',
    elevation: 2,
  },
  icons: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15,
    justifyContent: 'space-between',
  },
});

const TopBarHome = () => {
  return (
    <View style={styles.topBar}>
      <View style={styles.icons}>
        <View flexDirection="row">
          <Icon name="location-arrow" style={{fontSize: 25, paddingLeft: 20}} />
          <Text style={{fontSize: 15, paddingLeft: 10}}>Tembusu College</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Icon style={{paddingRight: 20, fontSize: 23}} name="search" />
          <Icon name="user-circle-o" style={{paddingRight: 20, fontSize: 23}} />
        </View>
      </View>
      <View style={{marginBottom: 20}}>
        <Toggle
          initialState={false}
          onSignInPress={() => {}}
          onSignUpPress={() => {}}
          selectionColor={PRIMARY}
          unselectionColor={SECONDARY}
          leftContent={'Available Restaurants'}
          rightContent={'Be a Transporter'}
          height={350}
          width={50}
        />
      </View>
    </View>
  );
};

export default TopBarHome;
