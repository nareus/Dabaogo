import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import AuthNavigator from './authNavigator';
import AppNavigator from './appNavigator';

const RootNavigator = createSwitchNavigator(
  {
    Auth: AuthNavigator,
    App: AppNavigator,
  },
  {
    initialRouteName: 'Auth',
  },
);

export default createAppContainer(RootNavigator);