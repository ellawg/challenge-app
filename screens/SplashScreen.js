import React from 'react';

import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

export default class SplashScreen extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.background}
        onPress={() => this.props.navigation.navigate('login')}>
        <View style={{ flex: 2 }} />
        <View style={{ flex: 3, flexDirection: 'column', alignItems: 'center' }}>
          <Image
            style={{ flex: 1, height: undefined, width: '80%' }}
            source={require('../assets/images/challenge-me-logo.png')}
            resizeMode="contain"
          />
        </View>
        <View style={{ flex: 2, alignItems: 'center' }}>
          <Text style={styles.challengeText}>challenge yourself</Text>
          <Text style={styles.challengeText}>challenge others</Text>
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.tapText}>tap to get started</Text>
        </View>
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
  challengeText: {
    fontSize: 16,
    height: undefined,
    width: '80%',
    color: '#FDFCFA',
    fontStyle: 'italic',
  },
  tapText: {
    textAlign: 'center',
    color: '#929287',
    fontSize: 16,
  },
});
