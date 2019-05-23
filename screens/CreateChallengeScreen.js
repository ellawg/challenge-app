import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import { Input, ButtonGroup, Button } from 'react-native-elements';
import CustomModal from '../components/Modal.js';
export default class CreateChallengeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 1,
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
  }

  render() {
    const buttons = ['Easy', 'Average', 'Difficult'];
    const { selectedIndex } = this.state;

    return (
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset="-500" enabled>
        <View style={{ height: '30%' }}>
          <Button
            title="+"
            type="outline"
            titleStyle={{ color: 'black' }}
            buttonStyle={{
              backgroundColor: '#6D6D6D',
              borderWidth: 1,
              borderColor: 'black',
              borderTopLeftRadius: 1,
              borderStyle: 'solid',
              maxWidth: '100%',
              margin: 0,
              height: '100%',
            }}
          />
        </View>
        <View style={{ margin: '15%' }}>
          <Text style={styles.titleText}>Create a challenge</Text>
          <Text style={styles.labelText}>Challenge name</Text>
          <View>
            <Input placeholder="Give your challenge a name" />
          </View>
          <Text style={styles.labelText}>Level</Text>
          <ButtonGroup
            onPress={this.updateIndex}
            selectedIndex={selectedIndex}
            selectedButtonStyle={styles.selectedButtonStyle}
            buttons={buttons}
            containerStyle={{ height: '10%' }}
          />
          <Text style={styles.labelText}>Description</Text>
          <Input
            style={{
              justifyContent: 'center',
            }}
            placeholder="Describe the challenge. Drag down keyboard when finished."
          />
          <CustomModal />
          <Button
            style={{ alignItems: 'center', justifyContent: 'flex-end', margin: '10%' }}
            title="Submit"
          />
        </View>
      </KeyboardAvoidingView>
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
    margin: 5,
  },
  selectedButtonStyle: {
    backgroundColor: 'black',
  },
});
