import React, {useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ChangeRestaurantBottom from '../../../components/molecules/bar/ChangeRestaurantBottomBar';
import RestaurantScroll from '../../../components/molecules/menu/RestaurantScroll';
import TopBar from '../../../components/molecules/bar/TopBar';
import {RootState} from '../../../redux';
import {addOrRemoveRestaurant} from '../../../redux/transporterSlice';
import {IRestaurant} from '../../../redux/restaurantsSlice';

const ChangeRestaurantScreen = (props: any) => {
  const dispatch = useDispatch();
  const {restaurantsSelected} = useSelector(
    (state: RootState) => state.transporter,
  );

  useEffect(() => {}, []);

  return (
    <View>
      <TopBar
        onPress={() => props.navigation.goBack()}
        text={'Change Restaurant'}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <RestaurantScroll
          onPress={(restaurant: IRestaurant) =>
            dispatch(addOrRemoveRestaurant(restaurant))
          }
        />
        <View style={{padding: 120}} />
      </ScrollView>
      {restaurantsSelected.length === 0 ? <></> : <ChangeRestaurantBottom />}
    </View>
  );
};

export default ChangeRestaurantScreen;
