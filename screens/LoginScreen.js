import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

export default class LoginScreen extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.loginText}>Hej Looogiiin</Text>
        <Button
          type="outline"
          buttonStyle={{
            borderWidth: 1,
            borderColor: 'black',
            borderTopLeftRadius: 1,
            borderStyle: 'solid',
            maxWidth: '50%',
          }}
          title="Go to map"
          titleStyle={{ color: 'black' }}
          onPress={() => this.props.navigation.navigate('map')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginText: {
    fontSize: 20,
  },
  button: {
    color: 'black',
  },
});
