import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {PADDING_LEFT} from '../../styles/spacing';
import {PRIMARY} from '../../styles/colors';
import {BORDER_RADIUS} from '../../styles/mixins';
export interface IRestaurantTransporterOrderCard {
  id: number;
  restaurantName: string;
  data: ITransporterOrderCard[];
}

export interface ITransporterOrderCard {
  id: string;
  categoryName: string;
  subCategory: IFoodItem[];
}

export interface IFoodItem {
  id: string;
  name: string;
}

const TransporterOrderCard = ({restaurantName, data}) => {
  console.log(data);
  return (
    // <View style={{paddingRight: GAP_FORM_FIELD * 2}}>
    <View style={styles.container}>
      <Text style={styles.restaurantName}>{restaurantName}</Text>
      <View>
        {data.map((item: ITransporterOrderCard) => (
          <View key={item.id} style={{marginBottom: PADDING_LEFT / 4}}>
            <View
              style={{
                backgroundColor: PRIMARY,
                padding: PADDING_LEFT / 1.5,
                borderRadius: BORDER_RADIUS,
              }}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>
                {item.categoryName}
              </Text>
            </View>
            <View style={{padding: PADDING_LEFT / 1.5}}>
              {item.subCategory.map((subCategory: IFoodItem) => {
                const [name, price] = subCategory.name.split(' $');
                return (
                  <View
                    key={subCategory.id}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontWeight: '600',
                        marginBottom: PADDING_LEFT / 2,
                        fontSize: 12,
                      }}>
                      {name}
                    </Text>
                    <Text
                      style={{
                        fontWeight: '600',
                        marginBottom: PADDING_LEFT / 2,
                        fontSize: 12,
                        color: PRIMARY,
                      }}>
                      {price}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        ))}
      </View>
      {/* <ExpandableListView
        // ExpandableListViewStyles={{borderTopWidth:1}} // styles to expandable listview
        // renderInnerItemSeparator={false} // true or false, render separator between inner items
        // renderItemSeparator={false} // true or false, render separator between Items
        itemContainerStyle={{
          backgroundColor: PRIMARY,
          padding: PADDING_LEFT / 1.5,
          // borderColor: PRIMARY,
          // borderWidth: 0.5,
          borderRadius: BORDER_RADIUS,
          marginBottom: PADDING_LEFT / 2,
        }} // add your styles to all item container of your list
        itemLabelStyle={{color: 'white', fontWeight: 'bold'}} // add your styles to all item text of your list
        // customChevron={{}} // your custom image to the indicator
        chevronColor="white" // color of the default indicator
        innerItemContainerStyle={{
          paddingTop: PADDING_LEFT / 2,
          paddingBottom: PADDING_LEFT / 2,
          marginBottom: PADDING_LEFT / 2,
        }} // add your styles to all inner item containers of your list
        innerItemLabelStyle={{
          fontSize: 14,
          fontWeight: '500',
        }} */}
      {/* // itemLabelStyle={{backgroundColor: 'purple'}} // add your styles to all inner item text of your list
        // itemImageIndicatorStyle={{backgroundColor: 'purple'}} // add your styles to the image indicator of your list
        // animated={true} // sets all animations on/off, default on
        // defaultLoaderStyles?: ViewStyle; // Set your styles to default loader (only for animated={true})
        // customLoader?: JSX.Element; Pass your custom loader, while your content is measured and rendered (only for animated={true})
        data={data}
      /> */}
    </View>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: PADDING_LEFT,
    backgroundColor: 'white',
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: PADDING_LEFT,
    color: PRIMARY,
  },
  smallContainer: {},
});

export default TransporterOrderCard;
