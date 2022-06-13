import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import MainDishesCard from '../atoms/MainDishesCard';
import MenuCategoryText from '../atoms/MenuCategoryText';

const CategoryMenuCards = ({category, data}) => {
  const categoryItems = () =>
    data.map(element => (
      <MainDishesCard
        key={element.id}
        name={element.name}
        description={element.description}
        price={element.price}
      />
    ));

  return (
    <View>
      <MenuCategoryText text={category} />
      {categoryItems()}
    </View>
  );
};

export default CategoryMenuCards;
