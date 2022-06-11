import React from 'react';
import {View, ScrollView} from 'react-native'
import RestaurantCard from '../atoms/RestaurantCard';


const RestaurantScroll = () => {
    return(
        <ScrollView>
            <RestaurantCard/>
            <RestaurantCard/>
            <RestaurantCard/>
            <RestaurantCard/>
            <RestaurantCard/>
            <RestaurantCard/>
            <RestaurantCard/>
            <RestaurantCard/>
        </ScrollView>
    );

}

export default RestaurantScroll 