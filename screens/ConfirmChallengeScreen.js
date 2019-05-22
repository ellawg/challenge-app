import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { ThemeProvider, Button } from 'react-native-elements';

export default class LoginScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, marginTop: '10%', marginLeft: '4%' }}>
        <Button
          title="<"
          type="clear"
          buttonStyle={{ borderWidth: 0, maxWidth: '15%' }}
          titleStyle={{ fontSize: 30 }}
          onPress={() => this.props.navigation.goBack()}
        />
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Nailed it, huh?</Text>
            <Text style={styles.text}>Prove it</Text>
          </View>
          <View style={styles.inputContainer}>
            <Button
              title="+"
              type="outline"
              titleStyle={{ color: 'black' }}
              buttonStyle={{
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: 'black',
                borderTopLeftRadius: 1,
                borderStyle: 'solid',
                maxWidth: '50%',
              }}
            />
            <TextInput style={{ height: 40, borderColor: 'black', borderWidth: 1 }} />
          </View>
        </View>
        <Button style={styles.bottom} title="UPLOAD" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: '30%',
    marginLeft: '10%',
  },
  text: {
    fontSize: 35,
    textTransform: 'uppercase',
    fontFamily: 'raleway-mediumitalic',
  },
  inputContainer: {
    height: '70%',
    width: '100%',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  bottom: {
    alignSelf: 'center',
    bottom: 30,
  },
});
