import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LINE_COLOR } from '../../../styles/colors';
import { FORM_LINE_WIDTH } from '../../../styles/mixins';
import Dropdown from '../../atoms/dropdown/HostelDropdown';
import FormText from '../../atoms/forms/FormText';
// import {Dropdown} from 'react-native-material-dropdown';

const LocationFormElement = ({ data, onSelect }) => {
  return (
    <View style={styles.container}>
      <FormText text={'Hostel'} />
      <Dropdown
        data={data}
        onSelect={onSelect}
        marginLeft={10}
        marginRight={0}
        marginTop={4}
        marginBottom={5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomColor: LINE_COLOR,
    borderBottomWidth: FORM_LINE_WIDTH
  },
  showPasswordButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10
  },
  showPasswordText: {
    fontWeight: 'bold'
  },
  dropDown: {
    topPadding: 10,
    bottomPadding: 10,
    rightPadding: 10
  }
});

export default LocationFormElement;
