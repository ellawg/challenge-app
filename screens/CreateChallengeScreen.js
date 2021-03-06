import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input, ButtonGroup, Button } from 'react-native-elements';
import uuid from 'uuid';
import CustomModal from '../components/Modal.js';
import ImageComponent from '../components/ImageComponent';

export default class CreateChallengeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 1,
      submissionData: '',
      challengeName: '',
      images: [require('../assets/images/coolcroc.jpg')],
      id: uuid.v4(),
    };
    this.updateIndex = this.updateIndex.bind(this);
  }
  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
  }
  componentCallback = modalData => {
    this.setState({ submissionData: modalData });
  };

  done() {
    if (this.state.challengeName && this.state.submissionData) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    const buttons = ['Easy', 'Average', 'Difficult'];
    const { selectedIndex } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ImageComponent markerid={this.state.id} marker />
          <Button
            style={{ top: '0%', left: '0%' }}
            title="<"
            type="clear"
            buttonStyle={{ borderWidth: 0, maxWidth: '10%', backgroundColor: 'transparent' }}
            titleStyle={{ fontSize: 30, color: 'black' }}
            onPress={() => this.props.navigation.goBack()}
          />
        </View>

        <View style={{ flex: 2, margin: 45, marginTop: 20 }}>
          <Text style={styles.titleText}>Create a challenge</Text>
          <Text style={styles.labelText}>Challenge name</Text>
          <View>
            <Input
              placeholder="Name"
              onChangeText={challengeName => this.setState({ challengeName })}
            />
          </View>
          <Text style={styles.labelText}>Level</Text>
          <ButtonGroup
            onPress={this.updateIndex}
            selectedIndex={selectedIndex}
            selectedButtonStyle={styles.selectedButtonStyle}
            buttons={buttons}
            containerStyle={{ height: 50 }}
          />
          <Text style={styles.labelText}>Description</Text>
          <CustomModal
            placeholder={'Describe the challenge'}
            callbackFromParent={this.componentCallback}
          />
        </View>
        <Button
          style={{ alignSelf: 'center', marginBottom: '5%', width: '78%' }}
          title="Next step"
          disabled={this.done()}
          onPress={() => {
            this.props.navigation.navigate('place', {
              id: this.state.id,
              title: this.state.challengeName,
              description: this.state.submissionData,
              images: this.state.images,
              level: buttons[this.state.selectedIndex],
            });
          }}
        />
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
    fontSize: 13,
    textTransform: 'uppercase',
    marginTop: 25,
  },
  selectedButtonStyle: {
    backgroundColor: 'black',
  },
});
