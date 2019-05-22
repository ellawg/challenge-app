import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Input, ButtonGroup, Button } from 'react-native-elements';

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
          <Text style={styles.titleText}>Create a challenge</Text>
          <Text style={styles.labelText}>Challenge name</Text>
          <View>
            <Input placeholder="Name" />
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
          <Input
            style={{
              justifyContent: 'center',
            }}
            placeholder="Describe challenge"
          />
        </View>
        <Button style={{ alignSelf: 'center', bottom: 40 }} title="Submit" />
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
  selectedButtonStyle: {
    backgroundColor: 'black',
  },
});