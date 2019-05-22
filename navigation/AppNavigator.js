import { createAppContainer, createStackNavigator } from 'react-navigation';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import MapScreen from '../screens/MapScreen';

const AppNavigator = createStackNavigator(
  {
    splash: {
      // `SplashScreen` is a React component that will be the splash screen of the app.
      screen: SplashScreen,
    },
    login: {
      screen: LoginScreen,
    },
    map: {
      screen: MapScreen,
    },
  },
  {
    headerMode: 'none',
  }
);

export default createAppContainer(AppNavigator);
