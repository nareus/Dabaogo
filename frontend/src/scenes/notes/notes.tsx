import React, {useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import Padding from '../../components/atoms/Padding';
import TopBar from '../../components/molecules/TopBar';

const NotesScreen = (props: any) => {
  useEffect(() => {}, []);

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Padding />
        <Padding />
        <Padding />
        <Padding />
        <Padding />
      </ScrollView>
      <TopBar
        onPress={() => props.navigation.goBack()}
        text={''}
        iconName={'chevron-left'}
        iconType={'feather'}
      />
    </View>
  );
};

export default NotesScreen;
