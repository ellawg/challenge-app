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
    profile: {
      screen: ProfileScreen,
    },
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
    map: {
      screen: MapScreen,
    },
  },
  {
    headerMode: 'none',
  }
);

export default createAppContainer(AppNavigator);
