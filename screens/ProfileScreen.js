import React from 'react';
import { Button, Avatar, Input, Icon } from 'react-native-elements';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  AsyncStorage,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { Permissions, ImagePicker, Video } from 'expo';
import { AppAuth } from 'expo-app-auth';
import * as firebase from 'firebase';
import 'firebase/firestore';

import uuid from 'uuid';
import CustomModal from '../components/Modal.js';
import ImageComponent from '../components/ImageComponent';

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      permittedCameraRoll: false,
      user: {},
      uploading: true,
      submissionData: '',
      userid: 0,
    };
  }

  componentCallback = modalData => {
    this.setState({ submissionData: modalData });
  };

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

  async componentDidMount() {
    const { navigation } = this.props;
    const userid = navigation.getParam('userid');
    this.setState({ userid });
    let user = await this.getUser(userid);
    this.setState({ user });
    console.log(user);
    this.setState({ uploading: false });
  }

  pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      this.state.permittedCameraRoll = true;
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
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        let uploadUrl = await uploadImageAsync(pickerResult.uri);
        this.setState({ image: uploadUrl });
      }
    } catch (e) {
      console.log(e);
      /*eslint-disable*/
      alert('Upload failed, sorry :(');
      /*eslint-enable*/
    } finally {
      this.setState({ uploading: false });
    }
  };

  render() {
    let nails = [];
    let bails = [];
    if (this.state.user.challenges) {

      for (var property in this.state.user.challenges) {
        if (property === 'nailed') {
          let nailedobj = this.state.user.challenges[property];
          for (var key in nailedobj) {
            let vid = nailedobj[key];
            let mark = key;
            nails.push(
              <View key={property} style={styles.videoView}>
                <Text style={styles.labelText}>{mark}</Text>
                <Video
                  source={{ uri: vid }}
                  rate={1.0}
                  volume={1.0}
                  isMuted
                  resizeMode="cover"
                  shouldPlay
                  isLooping
                  style={{ width: '100%', height: '100%' }}
                />
              </View>
            )
          }
        } else {
          let bailedobj = this.state.user.challenges[property];
          for (var key2 in bailedobj) {
            let vid = bailedobj[key2];
            let mark = key2;
            bails.push(
              <View key={property} style={styles.videoView}>
                <Text style={styles.labelText}>{mark}</Text>
                <Video
                  source={{ uri: vid }}
                  rate={1.0}
                  volume={1.0}
                  isMuted
                  resizeMode="cover"
                  shouldPlay
                  isLooping
                  style={{ width: '100%', height: '100%' }}
                />
              </View>
            )
          }
        }
      }
    }

    if (this.state.uploading) {
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
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: '5%',
            justifyContent: 'space-between',
          }}>
          <Button
            title="<"
            type="clear"
            style={{ width: 50, height: 50 }}
            buttonStyle={{
              borderWidth: 0,
              maxWidth: '100%',
              backgroundColor: 'transparent',
            }}
            titleStyle={{ fontSize: 30, color: 'black' }}
            onPress={() => this.props.navigation.goBack()}
          />
          <TouchableOpacity
            style={{ marginRight: 20, alignSelf: 'center' }}
            onPress={() => this.props.navigation.navigate('settings')}>
            <Icon name="cog" type="font-awesome" />
          </TouchableOpacity>
        </View>
        <KeyboardAvoidingView behavior="padding" enabled style={styles.background}>
          <View style={styles.container}>
            <View style={{ flex: 1 }}>
              <Text style={styles.titleText}>{this.state.user.username}</Text>
            </View>
            <View style={{ flex: 3, height: undefined, width: undefined }}>
              <ImageComponent userid={this.state.user.id} profile />
            </View>

            <View style={{ flex: 3, marginTop: '2%' }}>
              <CustomModal
                placeholder={'Upload some information about yourself'}
                callbackFromParent={this.componentCallback}
              />
            </View>
            <View style={{ flex: 6, marginBottom:0 }}>
              <ScrollView>
                <Text style={styles.labelText}>NAILED CHALLENGES</Text>
                {nails}
                <Text style={styles.labelText}>BAILED CHALLENGES</Text>
                {bails}
              </ScrollView>
            </View>
          </View>
        </KeyboardAvoidingView>
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
  background: {
    backgroundColor: '#FDFCFA',
    flex: 9,
    flexDirection: 'column',
    alignItems: 'center',
  },
  container: {
    flex: 9,
    width: '70%',
  },
  avatar: {
    flex: 5,
    height: undefined,
    width: '80%',
  },
  completedHead: {
    color: '#282829',
    fontSize: 22,
  },
  titleText: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 20,
    textTransform: 'uppercase',
    margin: 5,
  },
  labelText: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 13,
    textTransform: 'uppercase',
    marginTop: '5%',
  },
  videoView: {
    height: 200
  }
});
