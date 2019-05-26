import React from 'react';
import { StyleSheet, View, ActivityIndicator, Image, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import { Permissions, ImagePicker } from 'expo';
import { AppAuth } from 'expo-app-auth';
import * as firebase from 'firebase';
import 'firebase/firestore';
import uuid from 'uuid';
import ImageComponent from '../components/ImageComponent';
import VideoComponent from '../components/VideoComponent';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      permittedCameraRoll: false,
      image: false,
      uploading: false,
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
        this.checkUserExists(authState);
      }
    }
  }

  signInAsync = async () => {
    const authState = await AppAuth.authAsync(this.config);
    await this.cacheAuthAsync(authState);
    if (this.checkIfTokenExpired(authState)) {
    } else {
      this.checkUserExists(authState);
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

  //IMAGE/VIDEO UPLOAD
  maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  maybeRenderImage = () => {
    let { image } = this.state;
    if (!image) {
      return;
    }

    return (
      <View
        style={{
          marginTop: 30,
          width: 250,
          borderRadius: 3,
          elevation: 2,
        }}>
        <View
          style={{
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
            shadowColor: 'rgba(0,0,0,1)',
            shadowOpacity: 0.2,
            shadowOffset: { width: 4, height: 4 },
            shadowRadius: 5,
            overflow: 'hidden',
          }}>
          <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
        </View>
      </View>
    );
  };

  render() {
    return (
      <View
        style={{
          flexDirection: 'column',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Button title="Sign in with Google" onPress={() => this.signInAsync()} />
        {/*<View style={{ width: '100%', height: '70%' }}>
          <ImageComponent
            userid={'102210254945080113294'}
            profile
          />
      </View>*/}
      </View>
    );
  }
}

async function uploadImageAsync(uri) {
  //userid: 103617752635945553386
  //markerid: 032abb98-c794-4b39-b673-b09f2ace2ec4
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const ref = firebase
    .storage()
    .ref()
    .child(uuid.v4());
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
}

const styles = StyleSheet.create({
  loginText: {
    fontSize: 20,
  },
  butt: {
    fontSize: 20,
  },
});
