import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {formatAMPM} from '../constants';
import {IRestaurant} from './restaurantsSlice';

let temp: IRestaurant[] = [];

const transporterSlice = createSlice({
  name: 'transporter',
  initialState: {
    restaurantsSelected: temp,
    departureTime: formatAMPM(new Date(), 5),
    totalProfit: 0,
    buyerProgress: [0, 0, 0, 0, 0],
  },
  reducers: {
    addOrRemoveRestaurant(state, action: PayloadAction<IRestaurant>) {
      // if there are no restaurants currently added, add the new restaurant
      if (state.restaurantsSelected.length === 0) {
        state.restaurantsSelected.push(action.payload);
      } else {
        // otherwise, loop through and determine if there are duplicates
        let counter = 0;
        while (counter < state.restaurantsSelected.length) {
          if (
            action.payload.outletId ===
            state.restaurantsSelected[counter].outletId
          ) {
            // restaurant exists in the restaurants array, break
            break;
          }
          counter++;
        }
        if (counter !== state.restaurantsSelected.length) {
          // if counter !== restaurants.length, that means that the
          // restaurant exists in the restaurants array
          state.restaurantsSelected.splice(counter, 1);
        } else {
          state.restaurantsSelected.push(action.payload);
        }
      }
    },
    changeDepartureTime(state, action: PayloadAction<string>) {
      state.departureTime = action.payload;
    },
    setTotalProfit(state, action: PayloadAction<number>) {
      state.totalProfit = action.payload;
    },
    updateBuyerState(state, action: PayloadAction<number[]>) {
      state.buyerProgress = action.payload;
    },
    resetTransporter(state) {
      state.restaurantsSelected = temp;
      state.departureTime = formatAMPM(new Date(), 5);
      state.totalProfit = 0;
      state.buyerProgress = [0, 0, 0, 0, 0];
    },
  },
});

export const {
  addOrRemoveRestaurant,
  changeDepartureTime,
  setTotalProfit,
  updateBuyerState,
  resetTransporter,
} = transporterSlice.actions;
export default transporterSlice.reducer;
