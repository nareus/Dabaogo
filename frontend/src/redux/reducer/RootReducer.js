import {combineReducers} from 'redux';
import authReducer from './AuthReducer';
import transporterReducer from './TransporterReducer';
import userReducer from './UserReducer';

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  transporter: transporterReducer,
});
