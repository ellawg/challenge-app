import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import MapScreen from '../screens/MapScreen';
import LoadingScreen from '../screens/LoadingScreen';
import CreateChallengeScreen from '../screens/CreateChallengeScreen';

const AppNavigator = createStackNavigator({
  create: CreateChallengeScreen,
  splash: SplashScreen,
  login: LoginScreen,
  map: MapScreen,
  loading: LoadingScreen,
});

export default createAppContainer(AppNavigator);
