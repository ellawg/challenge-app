import React from 'react';
import { AppAuth } from 'expo-app-auth';
import { StyleSheet, View, ActivityIndicator, Image, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  config = {
    issuer: 'https://accounts.google.com',
    scopes: ['openid', 'profile'],
    /* This is the CLIENT_ID generated from a Firebase project */
    clientId: '603386649315-vp4revvrcgrcjme51ebuhbkbspl048l9.apps.googleusercontent.com',
  };

  storageKey = '@ChallengeMe:GoogleOAuthKey';

  signOut = async () => {
    const authState = await this.getCachedAuthAsync();
    const token = authState.accessToken;
    await this.signOutAsync(token);
    this.props.navigation.navigate('login');
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
      /*eslint-disable*/
      alert(`Failed to revoke token: ${message}`);
      /*eslint-enable*/
    }
  };

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

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View style={{ flex: 1, alignSelf: 'flex-start', marginTop: '10%', marginLeft: '4%' }}>
        <Button
          title="<"
          type="clear"
          buttonStyle={{ borderWidth: 0, maxWidth: '100%' }}
          titleStyle={{ fontSize: 30 }}
          onPress={() => this.props.navigation.goBack()}
        />
        <Button
          title="Sign Out"
          type="clear"
          buttonStyle={{ borderWidth: 0, maxWidth: '100%' }}
          titleStyle={{ fontSize: 30 }}
          onPress={() => this.signOut()}
        />
      </View>
    );
  }
}
