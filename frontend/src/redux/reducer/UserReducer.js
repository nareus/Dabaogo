import {USER_LOGIN, USER_LOGOUT} from '../action/UserActions';

const initialState = {
  isLoggedIn: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN: {
      const {
        userId,
        password,
        phoneNumber,
        email,
        firstName,
        lastName,
        currOrderId,
        isTransporter,
      } = action.payload;
      return {
        isLoggedIn: true,
        userId,
        password,
        phoneNumber,
        email,
        firstName,
        lastName,
        currOrderId,
        isTransporter,
      };
    }
    case USER_LOGOUT: {
      return {
        isLoggedIn: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
