import React from 'react';
import * as firebase from 'firebase';
import 'firebase/firestore';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import { AppAuth } from 'expo-app-auth';

export default class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  config = {
    issuer: 'https://accounts.google.com',
    scopes: ['openid', 'profile'],
    /* This is the CLIENT_ID generated from a Firebase project */
    clientId: '603386649315-vp4revvrcgrcjme51ebuhbkbspl048l9.apps.googleusercontent.com',
  };

  storageKey = '@ChallengeMe:GoogleOAuthKey';

  async componentDidMount() {
    const authState = await this.getCachedAuthAsync();
    if (authState) {
      if (!this.checkIfTokenExpired(authState)) {
        await this.checkUserExists(authState);
      } else {
        await this.refreshAuthAsync(authState.refreshToken);
        if (!this.checkIfTokenExpired(authState)) {
          console.log('token refreshed');
        }
      }
    }
    this.setState({ loading: false });
  }

  cacheAuthAsync = authState => {
    return AsyncStorage.setItem(this.storageKey, JSON.stringify(authState));
  };

  /* Before we start our app, we should check to see if a user is signed-in or not */
  getCachedAuthAsync = async () => {
    /* First we will try and get the cached auth */
    const value = await AsyncStorage.getItem(this.storageKey);
    /* Async Storage stores data as strings, we should parse our data back into a JSON */
    const authState = JSON.parse(value);
    if (authState) {
      /* If our data exists, than we should see if it's expired */
      if (this.checkIfTokenExpired(authState)) {
        /*
         * The session has expired.
         * Let's try and refresh it using the refresh token that some
         * OAuth providers will return when we sign-in initially.
         */
        return; //this.refreshAuthAsync(authState.refreshToken);
      } else {
        return authState;
      }
    }
    return null;
  };

  /*
   * You might be familiar with the term "Session Expired", this method will check if our session has expired.
   * An expired session means that we should reauthenticate our user.
   * You can learn more about why on the internet: https://www.quora.com/Why-do-web-sessions-expire
   * > Fun Fact: Charlie Cheever the creator of Expo also made Quora :D
   */
  checkIfTokenExpired = ({ accessTokenExpirationDate }) => {
    return new Date(accessTokenExpirationDate) < new Date();
  };

  /*
   * Some OAuth providers will return a "Refresh Token" when you sign-in initially.
   * When our session expires, we can exchange the refresh token to get new auth tokens.
   * > Auth tokens are not the same as a Refresh token
   *
   * Not every provider (very few actually) will return a new "Refresh Token".
   * This just means the user will have to Sign-In more often.
   */
  refreshAuthAsync = async refreshToken => {
    const authState = await AppAuth.refreshAsync(this.config, refreshToken);
    console.log('refreshAuthAsync', authState);
    await this.cacheAuthAsync(authState);
    return authState;
  };

  checkUserExists = async authState => {
    let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
      headers: { Authorization: `Bearer ${authState.accessToken}` },
    });

    let response = await userInfoResponse.json();
    let user = await this.getUser(response.id);
    if (user) {
      this.props.navigation.navigate('map', { userid: response.id });
    } else {
      this.props.navigation.navigate('createUser', { googleData: response });
    }
    this.setState({ loading: false });
  };

  getUser = async id => {
    let db = await firebase.firestore();
    let user = await db
      .collection('users')
      .doc(id)
      .get()
      .then(docSnapshot => {
        if (docSnapshot.exists) {
          return docSnapshot.data().username;
        } else {
          return false;
        }
      });
    return user;
  };

  render() {
    if (this.state.loading) {
      return (
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#282829',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
    return (
      <TouchableOpacity
        style={styles.background}
        onPress={() => this.props.navigation.navigate('login')}>
        <View style={{ flex: 2 }} />
        <View style={{ flex: 3, flexDirection: 'column', alignItems: 'center' }}>
          <Image
            style={{ flex: 1, height: undefined, width: '80%' }}
            source={require('../assets/images/challenge-me-logo.png')}
            resizeMode="contain"
          />
        </View>
        <View style={{ flex: 2, alignItems: 'center' }}>
          <Text style={styles.challengeText}>challenge yourself</Text>
          <Text style={styles.challengeText}>challenge others</Text>
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.tapText}>tap to get started</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#282829',
    flex: 1,
    flexDirection: 'column',
  },
  challengeText: {
    fontSize: 16,
    height: undefined,
    width: '80%',
    color: '#FDFCFA',
    fontStyle: 'italic',
  },
  tapText: {
    textAlign: 'center',
    color: '#929287',
    fontSize: 16,
  },
});
