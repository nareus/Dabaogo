import {createBottomTabNavigator} from 'react-navigation-tabs';

import HomeScreen from '../scenes/home/home';
import SettingsScreen from '../scenes/settings/settings';

const TabNavigatorConfig = {
  initialRouteName: 'Home',
  header: null,
  headerMode: 'none',
};

const RouteConfigs = {
  Home:{
    screen:HomeScreen,
  },
  Settings:{
    screen:SettingsScreen,
  },
};

const AppNavigator = createBottomTabNavigator(RouteConfigs, TabNavigatorConfig);

export default AppNavigator;