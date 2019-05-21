import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';

export default class SplashScreen extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.splashText}>Hej Splashhhhhhhh</Text>
        <Button title="Go to login" onPress={() => this.props.navigation.navigate('login')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  splashText: {
    fontSize: 20,
  },
});
