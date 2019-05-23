import { createAppContainer, createStackNavigator } from 'react-navigation';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import MapScreen from '../screens/MapScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChallengeScreen from '../screens/ChallengeScreen';
import CreateChallengeScreen from '../screens/CreateChallengeScreen';
import ConfirmChallengeScreen from '../screens/ConfirmChallengeScreen';

const AppNavigator = createStackNavigator(
  {
    splash: {
      // `SplashScreen` is a React component that will be the splash screen of the app.
      screen: SplashScreen,
    },
    confirm: {
      screen: ConfirmChallengeScreen,
    },
    create: {
      screen: CreateChallengeScreen,
    },
    login: {
      screen: LoginScreen,
    },
    map: {
      screen: MapScreen,
    },
    challenge: {
      screen: ChallengeScreen,
    },
    profile: {
      screen: ProfileScreen,
    },
  },
  {
    headerMode: 'none',
  }
);

export default createAppContainer(AppNavigator);
