import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, Modal, Alert } from 'react-native';
import { Avatar, Button } from 'react-native-elements';
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
      showPopUp: false,
      user: {},
      data: {},
    };
  }

  async componentWillMount() {
    if (this.props.profile) {
      let user = await this.getData(this.props.userid, 'users');
      let profilePic = user.image;
      this.setState({ user });
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
      //console.log(this.state.data);
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

  takePicture = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      this.setState({ permittedCameraRoll: true });
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status === 'granted') {
        this.setState({ permittedCamera: true });
      } else {
        /*eslint-disable*/
        alert('Camera permission not granted, go to settings and turn it on!');
        /*eslint-enable*/
      }
    } else {
      /*eslint-disable*/
      alert('Camera Roll permission not granted, go to settings and turn it on!');
      /*eslint-enable*/
    }

    if (this.state.permittedCamera) {
      let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        mediaTypes: 'All',
      });

      this.handleImagePicked(pickerResult);
    }
    this.showPopUp(false);
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
    this.showPopUp(false);
  };

  handleImagePicked = async pickerResult => {
    try {
      this.setState({ loading: true });

      if (!pickerResult.cancelled) {
        let uploadUrl = await uploadImageAsync(pickerResult.uri);
        this.setState({ image: uploadUrl });
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

  showPopUp(mode) {
    this.setState({ showPopUp: mode });
  }

  popUp() {
    if (this.state.showPopUp) {
      return (
        <Modal
          animationType="slide"
          transparent
          formSheet
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View
            style={{
              marginTop: '30%',
              backgroundColor: 'white',
              height: '40%',
              margin: '5%',
              borderRadius: '10%',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.8,
              shadowRadius: 2,
            }}>
            <View style={{ margin: '10%', maxHeight: '90%' }}>
              <Button
                title="Take picture"
                style={{ maxWidth: '100%', marginBottom: '5%' }}
                onPress={() => {
                  this.takePicture();
                }}
              />
              <Button
                title="Pick from library"
                style={{ maxWidth: '100%', marginBottom: '5%' }}
                onPress={() => {
                  this.pickImage();
                }}
              />
              <Button
                title="Cancel"
                style={{ maxWidth: '100%' }}
                onPress={() => {
                  this.showPopUp(false);
                }}
              />
            </View>
          </View>
        </Modal>
      );
    }
  }
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
          onPress={() => this.showPopUp(true)}
          source={{ uri: image }}
          style={{ width: '100%', height: '100%', overflow: 'hidden' }}
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
    return (
      <View>
        <View>{this.popUp()}</View>
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

const styles = StyleSheet.create({});
