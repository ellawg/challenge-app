import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';

export default class LoginScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Button
          title="Nailed it"
          onPress={() => this.props.navigation.navigate('confirm', { confirmState: 'nailed' })}
        />
        <Button
          title="Bailed it"
          onPress={() => this.props.navigation.navigate('confirm', { confirmState: 'bailed' })}
          confirmState={'bailed'}
        />
      </View>
    );
  }
}
