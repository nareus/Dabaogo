import React from 'react';
import {View} from 'react-native';
import CategoryMenuCards from '../molecules/CategoryMenuCards';

const RestOfMenuItems = ({addItem, removeItem}) => {
  const CATEGORIES = {
    'Haru Matsuri': [
      {
        id: 1,
        name: 'Sakura Hiramasa Sushi',
        description:
          'Served with mix vegetables, dal tadka, saffron pulao and butter naan',
        price: 8.0,
      },
      {
        id: 2,
        name: 'Sakura Hiramasa Sushi',
        description:
          'Served with mix vegetables, dal tadka, saffron pulao and butter naan',
        price: 8.0,
      },
      {
        id: 3,
        name: 'Sakura Hiramasa Sushi',
        description:
          'Served with mix vegetables, dal tadka, saffron pulao and butter naan',
        price: 8.0,
      },
    ],
    'Donburi Noice': [
      {
        id: 1,
        name: 'Sakura Hiramasa Sushi',
        description:
          'Served with mix vegetables, dal tadka, saffron pulao and butter naan',
        price: 8.0,
      },
      {
        id: 2,
        name: 'Sakura Hiramasa Sushi',
        description:
          'Served with mix vegetables, dal tadka, saffron pulao and butter naan',
        price: 8.0,
      },
      {
        id: 3,
        name: 'Sakura Hiramasa Sushi',
        description:
          'Served with mix vegetables, dal tadka, saffron pulao and butter naan',
        price: 8.0,
      },
    ],
    Ramen: [
      {
        id: 1,
        name: 'Sakura Hiramasa Sushi',
        description:
          'Served with mix vegetables, dal tadka, saffron pulao and butter naan',
        price: 8.0,
      },
      {
        id: 2,
        name: 'Sakura Hiramasa Sushi',
        description:
          'Served with mix vegetables, dal tadka, saffron pulao and butter naan',
        price: 8.0,
      },
      {
        id: 3,
        name: 'Sakura Hiramasa Sushi',
        description:
          'Served with mix vegetables, dal tadka, saffron pulao and butter naan',
        price: 8.0,
      },
    ],
  };

  const items = () => {
    let result = [];
    for (const [key, value] of Object.entries(CATEGORIES)) {
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
