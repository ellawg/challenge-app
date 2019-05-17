import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';

export default class LoadingScreen extends React.Component {
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
