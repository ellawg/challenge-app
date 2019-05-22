import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import { Button, Avatar, Input } from 'react-native-elements';

export default class ProfileScreen extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" enabled style={styles.background}>
        <View style={{ flex: 1, alignSelf: 'flex-start', marginTop: '10%', marginLeft: '4%' }}>
          <Button
            title="<"
            type="clear"
            buttonStyle={{ borderWidth: 0, maxWidth: '100%' }}
            titleStyle={{ fontSize: 30 }}
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
        <View style={styles.container}>
          <View style={{ flex: 1 }}>
            <Text style={styles.nameHead}>Linda Lovelace</Text>
          </View>
          <View style={{ flex: 3, flexDirection: 'column', alignItems: 'center' }}>
            <Avatar
              source={require('../assets/images/robot-prod.png')}
              showEditButton
              size={'xlarge'}
              style={styles.avatar}
              resizeMode="contain"
            />
          </View>
          <View style={{ flex: 2, marginBottom: '2%', marginTop: '2%' }}>
            <TextInput
              numberOfLines={4}
              placeholder="Add some information about yourself..."
              fontSize={16}
              scrollEnabled
              multiline
            />
          </View>
          <View style={{ flex: 3 }}>
            <Text style={styles.completedHead}>COMPLETED CHALLENGES</Text>
            <Text style={styles.bodyText}>Crazy awesome challenges! Frekkin rad shit..</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
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
    flex: 9,
    width: '70%',
  },
  nameHead: {
    color: '#282829',
    fontSize: 32,
  },
  avatar: {
    flex: 5,
    height: undefined,
    width: '80%',
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
