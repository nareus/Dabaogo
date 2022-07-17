import React from 'react';
import {StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';
import {SECONDARY} from '../../styles/colors';
import {BORDER_RADIUS} from '../../styles/mixins';

interface IProps {
  data: Array<{title: string}>;
  onSelect: (item: {title: string}) => void;
  marginLeft: number;
  marginRight: number;
  marginTop: number;
  marginBottom: number;
}

const HostelDropdown = (props: IProps) => {
  const {onSelect, data} = props;

  return (
    <SelectDropdown
      data={data}
      onSelect={(selectedItem, index) => {
        console.log(selectedItem, index);
        onSelect(selectedItem);
      }}
      defaultButtonText={'Select hostel'}
      buttonTextAfterSelection={(selectedItem, index) => {
        return selectedItem.title;
      }}
      rowTextForSelection={(item, index) => {
        return item.title;
      }}
      buttonStyle={styles(props).dropdown1BtnStyle}
      buttonTextStyle={styles(props).dropdown1BtnTxtStyle}
      renderDropdownIcon={isOpened => {
        return (
          <FontAwesome
            name={isOpened ? 'chevron-up' : 'chevron-down'}
            color={'#444'}
          />
        );
      }}
      dropdownIconPosition={'right'}
      dropdownStyle={styles(props).dropdown1DropdownStyle}
      rowStyle={styles(props).dropdown1RowStyle}
      rowTextStyle={styles(props).dropdown1RowTxtStyle}
    />
  );
};

const styles = props =>
  StyleSheet.create({
    dropdown1BtnStyle: {
      backgroundColor: SECONDARY,
      flex: 1,
      borderRadius: BORDER_RADIUS,
      marginLeft: props.marginLeft,
      marginRight: props.marginRight,
      marginTop: props.marginTop,
      marginBottom: props.marginBottom,
      alignItems: 'center',
      justifyContent: 'center',
      height: '80%',
      // zINdex: 1,
    },
    dropdown1BtnTxtStyle: {
      color: '#444',
      textAlign: 'left',
      fontSize: 13,
      fontWeight: 'bold',
    },
    dropdown1DropdownStyle: {
      backgroundColor: '#EFEFEF',
      borderRadius: BORDER_RADIUS,
    },
    dropdown1RowStyle: {
      backgroundColor: '#EFEFEF',
      borderBottomColor: '#C5C5C5',
      height: 35,
      paddingleft: 10,
    },
    dropdown1RowTxtStyle: {
      color: '#444',
      textAlign: 'left',
      fontSize: 12,
      fontWeight: 'bold',
    },
    divider: {width: 12},
  });

export default HostelDropdown;
