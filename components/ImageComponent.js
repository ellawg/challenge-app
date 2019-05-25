import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Permissions, ImagePicker } from 'expo';
import * as firebase from 'firebase';
import 'firebase/firestore';
import uuid from 'uuid';

export default class ImageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      loading: true,
      data: {},
      challenges: {},
      challengers: {},
    };
  }

  async componentDidMount() {
    if (this.props.profile) {
      let user = await this.getData(this.props.userid, 'users');
      let profilePic = user.image;
      this.setState({ image: profilePic });
      this.setState({ data: user });
      this.setState({ loading: false });
    }
    if (this.props.marker) {
      let marker = await this.getData(this.props.markerid, 'markers');
      let challengePic = marker.image;
      this.setState({ image: challengePic });
      this.setState({ data: marker });
      this.setState({ loading: false });
    }
    if (this.props.challengeproof) {
      let marker = await this.getData(this.props.markerid, 'markers');
      let user = await this.getData(this.props.userid, 'users');
      let challenges = user.challenges;
      let challengers = marker.challengers;
      this.setState({ challenges });
      this.setState({ challengers });
      this.setState({ image: 'image' });
      this.setState({ loading: false });
      console.log(this.state.challenges);
      console.log(this.state.challengers);
    }
  }

  getData = async (id, coll) => {
    let db = await firebase.firestore();
    let user = await db
      .collection(coll)
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
        if (this.props.marker || this.props.profile) {
          let coll = '';
          let docu = '';
          if (this.props.profile) {
            coll = 'users';
            docu = this.props.userid;
          }
          if (this.props.marker) {
            coll = 'markers';
            docu = this.props.markerid;
          }
          this.setState({
            data: {
              ...this.state.data,
              image: uploadUrl,
            },
          });
          this.setState({
            data: Object.assign({}, this.state.data, {
              image: uploadUrl,
            }),
          });
          let thedata = this.state.data;
          let db = await firebase.firestore();
          db.collection(coll)
            .doc(docu)
            .set(thedata)
            .catch(function(error) {
              console.error('Error adding document: ', error);
            });
        } else {
          let db = await firebase.firestore();
          let marker = this.props.markerid;
          let challenges = {
            nailed: {},
            bailed: {},
          };
          if (this.props.nailorbail === 'nail') {
            challenges.nailed = { [marker]: uploadUrl };
          } else {
            challenges.bailed = { [marker]: uploadUrl };
          }
          console.log(challenges);
          db.collection('users')
            .doc(this.props.userid)
            .set({ challenges }, { merge: true })
            .catch(function(error) {
              console.error('Error adding document: ', error);
            });
          let user = this.props.userid;
          let challengers = {
            nailed: {},
            bailed: {},
          };
          if (this.props.nailorbail === 'nail') {
            challengers.nailed = { [user]: uploadUrl };
          } else {
            challengers.bailed = { [user]: uploadUrl };
          }
          db.collection('markers')
            .doc(this.props.markerid)
            .set({ challengers }, { merge: true })
            .catch(function(error) {
              console.error('Error adding document: ', error);
            });
        }
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

  //IMAGE/VIDEO UPLOAD
  maybeRenderImage = () => {
    let { image } = this.state;

    return (
      <View
        style={{
          width: '100%',
          height: '100%',
        }}>
        <Avatar
          onPress={() => this.pickImage()}
          source={{ uri: image }}
          style={{ width: '100%', height: '100%', borderRadius: 5, overflow: 'hidden' }}
          showEditButton
          size={'xlarge'}
        />
      </View>
    );
  };

  render() {
    if (this.state.loading) {
      return (
        <View
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 5,
            backgroundColor: 'rgba(0,0,0,0.4)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
    return <View>{this.maybeRenderImage()}</View>;
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

const styles = StyleSheet.create({});
