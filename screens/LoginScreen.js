import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import ButtonComponent from '../components/ButtonComponent';

export default class LoginScreen extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.loginText}>Hej Looogiiin</Text>
        <Button title="Go to map" />
        <ButtonComponent buttonTitle="Login" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginText: {
    fontSize: 20,
  },
});
