import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Input, ButtonGroup } from 'react-native-elements';

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
      <View>
        <View style={{ height: '30%' }}>
          <Image
            style={{ height: '100%', width: undefined, backgroundColor: 'green' }}
            source={require('../assets/images/coolcroc.jpg')}
            resizeMode="contain"
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
    margin: 5,
  },
});
