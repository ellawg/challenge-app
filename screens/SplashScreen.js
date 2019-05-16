import React from 'react';
import { StyleSheet, Text, Button, View, TouchableOpacity, Image } from 'react-native';

export default class SplashScreen extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.background}
        onPress={() => this.props.navigation.navigate('login')}>
        <View style={{ flex: 1 }} />
        <View>
          <Image Source={require('../assets/images/challenge-me-logo.png')} />
        </View>
        <View style={{ flex: 1, flexDirection: 'column' }} />
        <Text style={styles.splashText}>CHALLENGE ME</Text>
        <Text style={styles.splashText}>CHALLENGE ME</Text>
        <Text style={styles.splashText}>CHALLENGE ME</Text>
        <Text>Callenge Yourself</Text>
        <Text>Callenge Others</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#282829',
    flex: 1,
    flexDirection: 'column',
  },
  splashText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#FDFCFA',
  },
});
