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

const transporterSlice = createSlice({
  name: 'transporter',
  initialState: {
    restaurantsSelected: temp,
    departureTime: formatAMPM(new Date()),
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
  },
});

function formatAMPM(date: Date) {
  var hours = date.getHours();
  var minutes = date.getMinutes() + 5;
  console.log(minutes);
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? 0 + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

export const {addOrRemoveRestaurant, changeDepartureTime} =
  transporterSlice.actions;
export default transporterSlice.reducer;
