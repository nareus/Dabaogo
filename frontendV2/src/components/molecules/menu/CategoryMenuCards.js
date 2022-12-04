import React from 'react';
import { View } from 'react-native';
import MainDishesCard from '../../atoms/menu/MainDishesCard';
import MenuCategoryText from '../../atoms/menu/MenuCategoryText';
;

const CategoryMenuCards = ({ category, data, addItem, removeItem }) => {
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
