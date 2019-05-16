import { createAppContainer, createStackNavigator } from 'react-navigation';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import MapScreen from '../screens/MapScreen';

const AppNavigator = createStackNavigator({
  splash: SplashScreen,
  login: LoginScreen,
  map: MapScreen,
});

export default createAppContainer(AppNavigator);
