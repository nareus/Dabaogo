import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import MainDishesCard from '../atoms/MainDishesCard';
import MenuCategoryText from '../atoms/MenuCategoryText';

const CategoryMenuCards = ({category, data, addItem, removeItem}) => {
  const categoryItems = () =>
    data.map(element => (
      <MainDishesCard
        element={element}
        key={element.foodId}
        addItem={addItem}
        removeItem={removeItem}
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
