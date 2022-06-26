import React from 'react';
import {View} from 'react-native';
import CategoryMenuCards from '../molecules/CategoryMenuCards';

const RestOfMenuItems = ({addItem, removeItem, data}) => {
  const items = () => {
    let result = [];
    for (const [key, value] of Object.entries(data)) {
      result.push(
        <CategoryMenuCards
          key={key}
          category={key}
          data={value}
          addItem={addItem}
          removeItem={removeItem}
        />,
      );
    }

    return result;
  };

  return <View>{items()}</View>;
};

export default RestOfMenuItems;
