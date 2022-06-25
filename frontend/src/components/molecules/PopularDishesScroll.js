import React from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {BACKGROUND_COLOR} from '../../styles/colors';
import {GAP_FORM_FIELD} from '../../styles/spacing';
import PopularDishesCard from '../atoms/PopularDishesCard';

const DATA = [
  {
    id: 1,
    name: 'Sakura Hiramasa Sushi',
    description:
      'Served with mix vegetables, dal tadka, saffron pulao and butter naan',
    price: '$8.00',
  },
  {
    id: 1,
    name: 'Sakura Hiramasa Sushi',
    description:
      'Served with mix vegetables, dal tadka, saffron pulao and butter naan',
    price: '$8.00',
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
      <PopularDishesCard key={item.id} title={item.name} price={item.price} />
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
