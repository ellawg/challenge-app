import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Input, ButtonGroup, Button } from 'react-native-elements';

export default class LoginScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ImageBackground
            style={{ flex: 1, width: undefined, backgroundColor: 'green' }}
            source={require('../assets/images/coolcroc.jpg')}
            resizeMode="contain">
            <Button
              style={{ top: '30%', left: '4%' }}
              title="<"
              type="clear"
              buttonStyle={{ borderWidth: 0, maxWidth: '10%' }}
              titleStyle={{ fontSize: 30 }}
              onPress={() => this.props.navigation.goBack()}
            />
          </ImageBackground>
        </View>
        <View style={{ flex: 2, margin: 45, marginTop: 20 }}>
          <Text style={styles.titleText}>Challenge name</Text>
          <Text style={styles.labelText}>Level</Text>
          <Text style={styles.labelText}>Description</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Button
            title="Nailed it"
            onPress={() => this.props.navigation.navigate('confirm', { confirmState: 'nailed' })}
          />
          <Button
            titleStyle={{ color: 'black' }}
            buttonStyle={{
              borderWidth: 1,
              borderColor: 'black',
              borderTopLeftRadius: 1,
              borderStyle: 'solid',
              backgroundColor: 'white',
            }}
            title="Bailed it"
            onPress={() => this.props.navigation.navigate('confirm', { confirmState: 'bailed' })}
            confirmState={'bailed'}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 20,
    textTransform: 'uppercase',
    margin: 5,
  },
  labelText: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 12,
    textTransform: 'uppercase',
    marginTop: 25,
  },
});
