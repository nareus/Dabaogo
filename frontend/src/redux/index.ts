import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice';
import transporterReducer from './transporterSlice';
import userReducer from './userSlice';
import restaurantReducer from './restaurantsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transporter: transporterReducer,
    user: userReducer,
    restaurants: restaurantReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
