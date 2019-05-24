import { createAppContainer, createStackNavigator } from 'react-navigation';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import CreateUserScreen from '../screens/CreateUserScreen';
import MapScreen from '../screens/MapScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChallengeScreen from '../screens/ChallengeScreen';
import CreateChallengeScreen from '../screens/CreateChallengeScreen';
import PlaceChallengeScreen from '../screens/PlaceChallengeScreen';
import ConfirmChallengeScreen from '../screens/ConfirmChallengeScreen';

const AppNavigator = createStackNavigator(
  {
    splash: {
      // `SplashScreen` is a React component that will be the splash screen of the app.
      screen: SplashScreen,
    },
    map: {
      screen: MapScreen,
    },
    challenge: {
      screen: ChallengeScreen,
    },
    create: {
      screen: CreateChallengeScreen,
    },
    place: {
      screen: PlaceChallengeScreen,
      params: { title: '', description: '', images: [''], level: '' },
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

    profile: {
      screen: ProfileScreen,
    },

  },
  {
    headerMode: 'none',
  }
);

export default createAppContainer(AppNavigator);
