import {TOGGLE_HOME_STATE} from '../../styles/types';

export const toggleHomeState = bool => ({
  type: TOGGLE_HOME_STATE,
  payload: bool,
});
