import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
//import { ThemeProvider } from 'react-native-elements';
import { Input } from 'react-native-elements';

const theme = {
  Button: { type: 'outline' },
};

export default class SplashScreen extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.titleText}>Create a challenge</Text>
        <Text style={styles.labelText}>Challenge name</Text>
        <Input placeholder="Give your challenge a name" />
        <Text style={styles.labelText}>Level</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
    fontFamily: 'Raleway-SemiBoldItalic',
    fontSize: 20,
    textTransform: 'uppercase',
  },
  labelText: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 12,
    textTransform: 'uppercase',
  },
});
