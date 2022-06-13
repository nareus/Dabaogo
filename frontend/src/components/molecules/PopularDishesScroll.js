import React from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {BACKGROUND_COLOR} from '../../styles/colors';
import {GAP_FORM_FIELD} from '../../styles/spacing';
import PopularDishesCard from '../atoms/PopularDishesCard';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Prawn Roe Rice',
    price: '$7.50',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Prawn Roe Rice',
    price: '$7.50',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Prawn Roe Rice',
    price: '$7.50',
  },
];

const PopularDishesScroll = () => {
  const items = () =>
    DATA.map(item => (
      <PopularDishesCard key={item.id} title={item.title} price={item.price} />
    ));

  return (
    <ScrollView
      horizontal={true}
      style={styles.container}
      showsHorizontalScrollIndicator={false}>
      {items()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: GAP_FORM_FIELD,
    flex: 1,
  },
});

export default PopularDishesScroll;
