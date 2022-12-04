import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
// import {Icon} from '@rneui/themed';
import Icon from 'react-native-vector-icons/Feather';
import {BACKGROUND_COLOR, PRIMARY, SECONDARY} from '../../styles/colors';
import {PADDING_LEFT} from '../../styles/spacing';
import GeneralButton from '../atoms/GeneralButton';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux';
import HomeToggle from '../atoms/HomeToggle';

const TopBarHome = (props: {
  onLeftPress: Function;
  onRightPress: Function;
  onPressProfile: Function;
}) => {
  const {user} = useSelector((state: RootState) => state.user);
  console.log('isTransporter', user.isTransporter);
  return (
    <View style={styles.topBar}>
      <View style={styles.topIcons}>
        <View style={styles.icons}>
          <Icon name="navigation" size={24} />
          {/* <Icon name="navigation" type="feather" size={24} /> */}
          <Text style={styles.location}>{user.location}</Text>
        </View>
        <View style={styles.icons}>
          {/* <GeneralButton
            onPress={() => {}}
            iconName="search"
            iconType="feather"
            backgroundColor={BACKGROUND_COLOR}
            color={PRIMARY}
            position={'relative'}
            size={24}
          /> */}
          <View style={{padding: 4}} />
          <GeneralButton
            onPress={props.onPressProfile}
            iconName="log-out"
            iconType="feather"
            backgroundColor={BACKGROUND_COLOR}
            color={PRIMARY}
            position={'relative'}
            size={24}
          />
        </View>
      </View>
      <View style={{marginBottom: PADDING_LEFT}}>
        <HomeToggle
          onAvailablePress={props.onLeftPress}
          onTransporterPress={props.onRightPress}
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

const styles = StyleSheet.create({
  topBar: {
    // paddingTop: 40,
    backgroundColor: 'white',
    elevation: 2,
  },
  topIcons: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'space-between',
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 17,
    paddingLeft: 12,
    fontWeight: '600',
    color: 'black',
  },
  searchIcon: {
    paddingRight: 20,
    fontSize: 23,
  },
});

export default TopBarHome;
