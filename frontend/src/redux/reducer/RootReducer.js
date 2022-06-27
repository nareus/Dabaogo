import {combineReducers} from 'redux';
import authReducer from './AuthReducer';
import userReducer from './UserReducer';

export default combineReducers({
  auth: authReducer,
  user: userReducer,
});
