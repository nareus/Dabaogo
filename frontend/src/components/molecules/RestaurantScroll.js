import React from 'react';
import {ScrollView} from 'react-native';
import {BORDER_RADIUS} from '../../styles/mixins';
import RestaurantCard from '../atoms/RestaurantCard';

const RestaurantScroll = ({navigate}) => {
  return (
    <ScrollView>
      <RestaurantCard
        borderRadius={BORDER_RADIUS}
        onPress={navigate}
        LRMargin={'2%'}
        marginTop={25}
        cardWidth={'96%'}
      />
      <RestaurantCard
        borderRadius={BORDER_RADIUS}
        onPress={navigate}
        LRMargin={'2%'}
        marginTop={25}
        cardWidth={'96%'}
      />
      <RestaurantCard
        borderRadius={BORDER_RADIUS}
        onPress={navigate}
        LRMargin={'2%'}
        marginTop={25}
        cardWidth={'96%'}
      />
      <RestaurantCard
        borderRadius={BORDER_RADIUS}
        onPress={navigate}
        LRMargin={'2%'}
        marginTop={25}
        cardWidth={'96%'}
      />
      <RestaurantCard
        borderRadius={BORDER_RADIUS}
        onPress={navigate}
        LRMargin={'2%'}
        marginTop={25}
        cardWidth={'96%'}
      />
    </ScrollView>
  );
};

export default RestaurantScroll;
