import React, {useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Padding from '../../components/atoms/Padding';
import ChangeRestaurantBottom from '../../components/molecules/ChangeRestaurantBottom';
import RestaurantScroll from '../../components/molecules/RestaurantScroll';
import TopBar from '../../components/molecules/TopBar';
import {RootState} from '../../redux';
import {addOrRemoveRestaurant, IRestaurant} from '../../redux/transporterSlice';

const ChangeRestaurantScreen = (props: any) => {
  const dispatch = useDispatch();
  const {restaurantsSelected} = useSelector(
    (state: RootState) => state.transporter,
  );

  useEffect(() => {}, []);

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Padding />
        <Padding />
        <Padding />
        <Padding />
        <Padding />
        <RestaurantScroll
          onPress={(restaurant: IRestaurant) =>
            dispatch(addOrRemoveRestaurant(restaurant))
          }
        />
      </ScrollView>
      <TopBar
        onPress={() => props.navigation.goBack()}
        text={'Taiwanese'}
        iconName={'chevron-left'}
        iconType={'feather'}
      />

      {restaurantsSelected.length === 0 ? <></> : <ChangeRestaurantBottom />}
    </View>
  );
};

export default ChangeRestaurantScreen;
