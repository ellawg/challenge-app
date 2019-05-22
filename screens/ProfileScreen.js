import React from 'react';

import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

export default class ProfileScreen extends React.Component {
  render() {
    return (
      <View style={styles.background}>
        <View style={styles.container}>
          <View style={{ flex: 1 }} />
          <View style={{ flex: 1 }}>
            <Text style={styles.nameHead}>Linda Lovelace</Text>
          </View>
          <View style={{ flex: 3, flexDirection: 'column', alignItems: 'center' }}>
            <Image
              style={{ flex: 1, height: undefined, width: '80%' }}
              source={require('../assets/images/robot-prod.png')}
              resizeMode="contain"
            />
          </View>
          <View style={{ flex: 2 }}>
            <Text style={styles.bodyText}>Add some information about yourself...</Text>
          </View>
          <View style={{ flex: 2 }}>
            <Text style={styles.completedHead}>COMPLETED CHALLENGES...</Text>
            <Text style={styles.bodyText}>Crazy awesome challenges! Frekkin rad shit..</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FDFCFA',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '70%',
  },
  nameHead: {
    color: '#282829',
    fontSize: 32,
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
