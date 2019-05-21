import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import { ThemeProvider } from 'react-native-elements';

const theme = {
  Button: { type: 'outline' },
};

export default class SplashScreen extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.splashText}>Hej Splashhhhhhhh</Text>
        <ThemeProvider theme={theme}>
          <Button title="Go to login" onPress={() => this.props.navigation.navigate('login')} />
        </ThemeProvider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  splashText: {
    fontSize: 20,
  },
});
