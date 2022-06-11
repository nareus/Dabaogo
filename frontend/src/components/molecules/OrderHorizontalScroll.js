import React from 'react';
import {FlatList, View} from 'react-native';
import HorizontalScrollElements from '../atoms/HorizontalScrollElements';

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

const OrderHorizontalScroll = ({data}) => {
  const renderItem = ({item}) => (
    <HorizontalScrollElements title={item.title} price={item.price} />
  );

  return (
    <View>
      <FlatList
        horizontal={true}
        renderItem={renderItem}
        data={DATA}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default OrderHorizontalScroll;
