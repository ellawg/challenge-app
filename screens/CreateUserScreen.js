import React from 'react';
import { StyleSheet, TextInput, Text, View, ActivityIndicator, Image, AsyncStorage } from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';
import { Permissions, ImagePicker } from 'expo';
import { AppAuth } from 'expo-app-auth';
import * as firebase from 'firebase';
import 'firebase/firestore';
import uuid from 'uuid';

export default class CreateUserScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      username: '',
    };
  }

  writeUserToFB = async () => {
    let userdata = this.props.navigation.state.params.googleData;
    let db = await firebase.firestore();
    let usernames = await this.getUsernames();
    var i;
    for (i in usernames) {
      let username = usernames[i];
      if (username === this.state.username) {
        this.setState({ errorMessage: 'Username already exists' });
        return;
      } else {
        db.collection('users')
          .doc(userdata.id)
          .set({
            id: userdata.id,
            name: userdata.name,
            pic: userdata.picture,
            username: this.state.username,
          })
          .catch(function(error) {
            console.error('Error adding document: ', error);
          });
        this.props.navigation.navigate('map', { userid: userdata.id });
      }
    }
  };

  getUsernames = async () => {
    let db = await firebase.firestore();
    let usernameslist = [];
    let usernames = await db
      .collection('users')
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          let userdata = doc.data();
          if (userdata.username) {
            usernameslist.push(userdata.username);
          }
        });
        return usernameslist;
      });
    return usernames;
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>So it's your first time here, huh? Choose your nick.</Text>
        <TextInput
          style={{
            justifyContent: 'center',
          }}
          placeholder="Username"
          name="username"
          onChangeText={username => this.setState({ username })}
          value={this.state.username}
        />
        <Text>{this.state.errorMessage}</Text>
        <Button title="Submit" onPress={() => this.writeUserToFB()} />
      </View>
    );
  }
}
