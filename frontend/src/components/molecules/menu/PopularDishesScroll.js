import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { GAP_FORM_FIELD } from '../../../styles/spacing';
import PopularDishesCard from '../../atoms/menu/PopularDishesCard';

const DATA = [
  {
    id: 1,
    name: 'Sakura Hiramasa Sushi',
    description:
      'Served with mix vegetables, dal tadka, saffron pulao and butter naan',
    price: 8.0
  },
  {
    id: 2,
    name: 'Sakura Hiramasa Sushi',
    description:
      'Served with mix vegetables, dal tadka, saffron pulao and butter naan',
    price: 8.0
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Prawn Roe Rice',
    price: 7.5
  }
];

const PopularDishesScroll = ({ data, addItem, removeItem }) => {
  const items = () =>
    DATA.map(item => (
      <PopularDishesCard
        key={item.id}
        id={item.id}
        title={item.name}
        price={item.price}
        addItem={addItem}
        removeItem={removeItem}
      />
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
    flex: 1
  }
});

export default PopularDishesScroll;
