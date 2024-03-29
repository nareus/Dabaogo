import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IUser {
  userId: number;
  password: string;
  phoneNumber: number;
  email: string;
  firstName: string;
  lastName: string;
  currOrderId: number;
  isTransporter: number;
  location: string;
}

// const emptyUser: IUser = {
//   userId: -1,
//   password: '',
//   phoneNumber: 0,
//   email: '',
//   firstName: '',
//   lastName: '',
//   currOrderId: 0,
//   isTransporter: 0,
//   location: '',
// };

// This is 
const emptyUser: IUser = {
  userId: 1,
  password: 'sdadsadasdsa',
  phoneNumber: 93214321,
  email: 'defaultUser@gmail.com',
  firstName: 'Default',
  lastName: 'User',
  currOrderId: 0,
  isTransporter: 0,
  location: 'Tembusu College',
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    user: emptyUser,
  },
  reducers: {
    userLogin(state, action: PayloadAction<IUser>) {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    userLogout(state) {
      state.isLoggedIn = false;
      state.user = emptyUser;
    },
    updateUser(state, action: PayloadAction<IUser>) {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
  },
});

export const {userLogin, userLogout, updateUser} = userSlice.actions;
export default userSlice.reducer;
