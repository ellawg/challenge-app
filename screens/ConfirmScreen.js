import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider, Button } from 'react-native-elements';

export default class LoginScreen extends React.Component {
  render() {
    return (
      <View>
        <Button
          title="<"
          type="clear"
          buttonStyle={{ borderWidth: 0, maxWidth: '10%' }}
          titleStyle={{ fontSize: 30 }}
          onPress={() => this.props.navigation.goBack()}
        />
        <Text>Nailed it, huh?</Text>
        <Text>Prove it</Text>
        <Button title="UPLOAD" />
      </View>
    );
  }
}
