import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Image, AsyncStorage } from 'react-native';
import { Button, Avatar } from 'react-native-elements';
import { Permissions, ImagePicker } from 'expo';
import { AppAuth } from 'expo-app-auth';
import * as firebase from 'firebase';
import 'firebase/firestore';
import uuid from 'uuid';

export default class ImageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      loading: true,
      user: {},
    };
  }

  config = {
    issuer: 'https://accounts.google.com',
    scopes: ['openid', 'profile'],
    /* This is the CLIENT_ID generated from a Firebase project */
    clientId: '603386649315-vp4revvrcgrcjme51ebuhbkbspl048l9.apps.googleusercontent.com',
  };

  storageKey = '@ChallengeMe:GoogleOAuthKey';

  async componentWillMount() {
    if (this.props.userid) {
      let user = await this.getUser(this.props.userid);
      let profilePic = user.pic;
      this.setState({ user });
      this.setState({ image: profilePic });
      this.setState({ loading: false });
    }
  }

  getUser = async id => {
    let db = await firebase.firestore();
    let user = await db
      .collection('users')
      .doc(id)
      .get()
      .then(docSnapshot => {
        if (docSnapshot.exists) {
          return docSnapshot.data();
        } else {
          return false;
        }
      });
    return user;
  };

  //IMAGE/VIDEO UPLOAD
  maybeRenderImage = () => {
    let { image } = this.state;
    if (!image) {
      return (
        <View style={{
            width: 250,
            height: 250,
            borderRadius: 3,
            elevation: 2,
          }}>
          <Avatar
            onPress={() => this.pickImage()}
            source={{ uri: image }}
            style={{ width: 250, height: 250 }}
            showEditButton
            size={'xlarge'}
          />
        </View>
      );
    }

    return (
      <View
        style={{
          width: 250,
          borderRadius: 3,
          elevation: 2,
        }}>
        <View
          style={{
            borderTopRightRadius: 5,
            shadowOffset: { width: 4, height: 4 },
            shadowRadius: 5,
            overflow: 'hidden',
          }}>
          <Avatar
            onPress={() => this.pickImage()}
            source={{ uri: image }}
            style={{ width: '100%', height: 250 }}
            showEditButton
            size={'xlarge'}
          />
        </View>
      </View>
    );
  };

  pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      this.setState({ permittedCameraRoll: true });
    } else {
      /*eslint-disable*/
      alert('Camera Roll permission not granted, we will need it!');
      /*eslint-enable*/
    }
    if (this.state.permittedCameraRoll) {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        mediaTypes: 'All',
      });

      this.handleImagePicked(pickerResult);
    }
  };

  handleImagePicked = async pickerResult => {
    try {
      this.setState({ loading: true });

      if (!pickerResult.cancelled) {
        let uploadUrl = await uploadImageAsync(pickerResult.uri);
        this.setState({ image: uploadUrl });
        let db = await firebase.firestore();
        db.collection('users')
          .doc(this.props.userid)
          .set({
            id: this.props.userid,
            name: this.state.user.name,
            pic: uploadUrl,
            username: this.state.user.name,
          })
          .catch(function(error) {
            console.error('Error adding document: ', error);
          });
      }
    } catch (e) {
      console.log(e);
      /*eslint-disable*/
      alert('Upload failed, sorry :(');
      /*eslint-enable*/
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    if (this.state.loading) {
      return (
        <View
          style={{
            flexDirection: 'column',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: 250,
              height: 250,
              borderRadius: 3,
              elevation: 2,
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator color="#fff" animating size="large" />
          </View>
        </View>
      );
    }
    return (
      <View
        style={{
          flexDirection: 'column',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {this.maybeRenderImage()}
      </View>
    );
  }
}

async function uploadImageAsync(uri) {
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

});
