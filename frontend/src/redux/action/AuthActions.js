import {TOGGLE_AUTH_STATE} from '../../styles/types';

export const toggleAuthState = bool => ({
  type: TOGGLE_AUTH_STATE,
  payload: bool,
});
