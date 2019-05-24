import { createAppContainer, createStackNavigator } from 'react-navigation';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import MapScreen from '../screens/MapScreen';
import ChallengeScreen from '../screens/ChallengeScreen';
import CreateChallengeScreen from '../screens/CreateChallengeScreen';
import ConfirmChallengeScreen from '../screens/ConfirmChallengeScreen';

const AppNavigator = createStackNavigator(
  {
    map: {
      screen: MapScreen,
    },
    challenge: {
      screen: ChallengeScreen,
    },
    confirm: {
      screen: ConfirmChallengeScreen,
    },
    splash: {
      // `SplashScreen` is a React component that will be the splash screen of the app.
      screen: SplashScreen,
    },
    create: {
      screen: CreateChallengeScreen,
    },
    login: {
      screen: LoginScreen,
    },
  },
  {
    headerMode: 'none',
  }
);

export default createAppContainer(AppNavigator);
