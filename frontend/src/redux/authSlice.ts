import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    toggleState: false,
  },
  reducers: {
    toggleAuthState(state, action: PayloadAction<boolean>) {
      state.toggleState = action.payload;
    },
  },
});

export const {toggleAuthState} = authSlice.actions;
export default authSlice.reducer;
