import { createAppContainer, createStackNavigator } from 'react-navigation';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import CreateUserScreen from '../screens/CreateUserScreen';
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
    challenge: {
      screen: ChallengeScreen,
    },
    create: {
      screen: CreateChallengeScreen,
    },
    confirm: {
      screen: ConfirmChallengeScreen,
    },
    login: {
      screen: LoginScreen,
    },
    createUser: {
      screen: CreateUserScreen,
    },
    map: {
      screen: MapScreen,
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
