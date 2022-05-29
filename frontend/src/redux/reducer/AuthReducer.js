import {combineReducers} from 'redux';
import {TOGGLE_AUTH_STATE} from '../../styles/types';

// https://www.digitalocean.com/community/tutorials/react-react-native-redux#step-2-creating-a-reducer

const INITIAL_STATE = {
  current: false,
  possible: [false, true],
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_AUTH_STATE:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  auth: authReducer,
});
