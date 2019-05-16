import { createAppContainer, createStackNavigator } from 'react-navigation';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';

const AppNavigator = createStackNavigator({
  splash: SplashScreen,
  login: LoginScreen,
});

export default createAppContainer(AppNavigator);
