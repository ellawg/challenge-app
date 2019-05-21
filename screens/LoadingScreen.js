import React from 'react';
import { StyleSheet, Text, Button, View, ActivityIndicator } from 'react-native';
import firebase from 'firebase'

export default class LoadingScreen extends React.Component {

  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user){
        this.props.navigation.navigate('map')
      }
      else {
        this.props.navigation.navigate('login')
      }
    })
  }

  render() {
    return (
      <View style={styles.conatiner}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
