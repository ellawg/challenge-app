import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import MapScreen from '../screens/MapScreen';
import LoadingScreen from '../screens/LoadingScreen';

const AppNavigator = createStackNavigator({
  splash: SplashScreen,
  login: LoginScreen,
  map: MapScreen,
  loading: LoadingScreen
});

export default createAppContainer(AppNavigator);
