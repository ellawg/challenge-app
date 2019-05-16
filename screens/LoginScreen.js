import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';

export default class LoginScreen extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.loginText}>Hej Looogiiin</Text>
        <Button title="Go to map" onPress={() => this.props.navigation.navigate('map')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginText: {
    fontSize: 20,
  },
});
