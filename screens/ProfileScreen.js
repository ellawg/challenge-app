import React from 'react';
import { Button, Avatar, Input } from 'react-native-elements';
import { Permissions, ImagePicker } from 'expo';
import { AppAuth } from 'expo-app-auth';
import * as firebase from 'firebase';
import 'firebase/firestore';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  AsyncStorage,
} from 'react-native';
import uuid from 'uuid';
import CustomModal from '../components/Modal.js';
import ImageComponent from '../components/ImageComponent';

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      permittedCameraRoll: false,
      image: null,
      uploading: false,
      submissionData: '',
    };
  }

  componentCallback = modalData => {
    this.setState({ submissionData: modalData });
  };

  getUser = async id => {
    let db = await firebase.firestore();
    let user = await db
      .collection('users')
      .doc('103617752635945553386')
      .get()
      .then(docSnapshot => {
        if (docSnapshot.exists) {
          return docSnapshot.data().pic;
        } else {
          return false;
        }
      });
    return user;
  };

  async componentWillMount() {
    let profilePic = await this.getUser();
    this.state.image = profilePic;
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
    let { image } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" enabled style={styles.background}>
        <View style={{ flex: 1, alignSelf: 'flex-start', marginTop: '10%', marginLeft: '4%' }}>
          <Button
            title="<"
            type="clear"
            buttonStyle={{ borderWidth: 0, maxWidth: '100%' }}
            titleStyle={{ fontSize: 30 }}
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
        <View style={styles.container}>
          <View style={{ flex: 1 }}>
            <Text style={styles.nameHead}>Belinda Lovelace</Text>
          </View>
          <View style={{ flex: 3, alignItems: 'center' }}>
            <ImageComponent userid="103617752635945553386" />
          </View>

          <View style={{ flex: 2, marginBottom: '2%', marginTop: '2%' }}>
            <CustomModal
              placeholder={'Upload some information about yourself'}
              callbackFromParent={this.componentCallback}
            />
          </View>
          <View style={{ flex: 3 }}>
            <Text style={styles.completedHead}>COMPLETED CHALLENGES</Text>
            <Text style={styles.bodyText}>Crazy awesome challenges! Frekkin rad shit..</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
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
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  container: {
    flex: 9,
    width: '70%',
  },
  nameHead: {
    color: '#282829',
    fontSize: 32,
  },
  avatar: {
    flex: 5,
    height: undefined,
    width: '80%',
  },
  bodyText: {
    fontSize: 16,
    height: undefined,
    textAlign: 'left',
    color: '#282829',
    fontStyle: 'italic',
  },
  completedHead: {
    color: '#282829',
    fontSize: 22,
  },
});
