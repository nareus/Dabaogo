import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface IRestaurant {
  outletId: string;
  name: string;
  available: boolean;
  transporters: number;
  typeOfStore: string;
  latitude: number;
  longitude: number;
  imagePath: string;
}

let temp: IRestaurant[] = [];

const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState: {
    restaurants: temp,
    currMaxOrder: 0,
  },
  reducers: {
    updateRestaurants(state, action: PayloadAction<IRestaurant[]>) {
      state.restaurants = action.payload;
    },
    updateCurrMaxOrder(state, action: PayloadAction<number>) {
      state.currMaxOrder = action.payload;
    },
  },
});

export const {updateRestaurants, updateCurrMaxOrder} = restaurantsSlice.actions;
export default restaurantsSlice.reducer;
