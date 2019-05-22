import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import { AppAuth, ImagePicker } from 'expo-app-auth';
import * as firebase from 'firebase';
import 'firebase/firestore';

export default class LoginScreen extends React.Component {
  /*
   * Notice that Sign-In / Sign-Out aren't operations provided by this module.
   * We emulate them by using authAsync / revokeAsync.
   * For instance if you wanted an "isAuthenticated" flag, you would observe your local tokens.
   * If the tokens exist then you are "Signed-In".
   * Likewise if you cannot refresh the tokens, or they don't exist, then you are "Signed-Out"
   */
  async componentDidMount() {
    const authState = await this.getCachedAuthAsync();
    if (authState) {
      if (this.checkIfTokenExpired(authState)) {
      } else {
        this.props.navigation.navigate('map');
      }
    }
  }

  config = {
    issuer: 'https://accounts.google.com',
    scopes: ['openid', 'profile'],
    /* This is the CLIENT_ID generated from a Firebase project */
    clientId: '603386649315-vp4revvrcgrcjme51ebuhbkbspl048l9.apps.googleusercontent.com',
  };

  storageKey = '@ChallengeMe:GoogleOAuthKey';

  signInAsync = async () => {
    const authState = await AppAuth.authAsync(this.config);
    await this.cacheAuthAsync(authState);
    if (this.checkIfTokenExpired(authState)) {
    } else {
      this.writeUserToFB(authState);
      this.props.navigation.navigate('map');
    }
  };

  /* Let's save our user tokens so when the app resets we can try and get them later */
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

  /*
   * To sign-out we want to revoke our tokens.
   * This is what high-level auth solutions like FBSDK are doing behind the scenes.
   */
  signOut = async () => {
    const authState = await this.getCachedAuthAsync();
    const token = authState.accessToken;
    this.signOutAsync(token);
  };
  signOutAsync = async accessToken => {
    try {
      await AppAuth.revokeAsync(this.config, {
        token: accessToken,
        isClientIdProvided: true,
      });
      /*
       * We are removing the cached tokens so we can check on our auth state later.
       * No tokens = Not Signed-In :)
       */
      await AsyncStorage.removeItem(this.storageKey);
      return null;
    } catch ({ message }) {
      alert(`Failed to revoke token: ${message}`);
    }
  };

  writeUserToFB = async authState => {
    let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
      headers: { Authorization: `Bearer ${authState.accessToken}` },
    });

    let response = await userInfoResponse.json();
    let db = await firebase.firestore();
    db.collection('users')
      .doc(response.id)
      .set({
        id: response.id,
        name: response.name,
        pic: response.picture,
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
  };

  uploadVideo = async () => {
    var storage = firebase.storage();
    var storageRef = storage.ref();
  };

  state = {
    image: null,
  };

  render() {
    let { image } = this.state;
    return (
      <View>
        <Text style={styles.loginText}>Hej Looogiiin</Text>
        <Button title="Go to map" onPress={() => this.props.navigation.navigate('map')} />
        <Button
          title="<"
          type="clear"
          buttonStyle={{ borderWidth: 0, maxWidth: '10%' }}
          titleStyle={{ fontSize: 30 }}
        />
        <Button title="Sign in" onPress={() => this.signInAsync()} />
        <Button title="Sign out" onPress={() => this.signOut()} />
        <Button title="Pick an image from camera roll" onPress={this._pickImage} />
      </View>
    );
  }
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
}

const styles = StyleSheet.create({
  loginText: {
    fontSize: 20,
  },
});
