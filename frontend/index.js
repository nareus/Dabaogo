// /**
//  * @format
//  */

import {AppRegistry, LogBox} from 'react-native';
// import App from './App';
import App from './src/index';
import {name as appName} from './app.json';

LogBox.ignoreLogs(['EventEmitter.removeListener']);
AppRegistry.registerComponent(appName, () => App);
