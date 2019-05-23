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
    login: {
      screen: LoginScreen,
    },
    map: {
      screen: MapScreen,
    },
    create: {
      screen: CreateChallengeScreen,
    },
    challenge: {
      screen: ChallengeScreen,
    },
    profile: {
      screen: ProfileScreen,
    },
    confirm: {
      screen: ConfirmChallengeScreen,
    },
  },
  {
    headerMode: 'none',
  }
);

export default createAppContainer(AppNavigator);
