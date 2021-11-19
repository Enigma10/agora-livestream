/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import Test from './components/test'
import Appli from './components/routs';
AppRegistry.registerComponent(appName, () => Appli);
