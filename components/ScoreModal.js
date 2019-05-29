import React from 'react';
import { Modal, Text, TouchableHighlight, View, Alert } from 'react-native';
import { Button, Slider } from 'react-native-elements';

export default class CustomModal extends React.Component {
  sendProps = () => {
    const listInfo = this.state.inputText;
    this.props.callbackFromParent(listInfo);
  };

  constructor(props) {
    super(props);
    this.state = { modalVisible: false, inputText: 'Tell us what happened' };
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  render() {
    const total = this.props.nails + this.props.bails;
    const nails = this.props.nails;
    const bails = this.props.bails;
    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType="slide"
          transparent
          formSheet
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View
            style={{
              marginTop: '20%',
              backgroundColor: 'white',
              height: '80%',
              margin: '5%',
              borderRadius: '10%',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.8,
              shadowRadius: 2,
            }}>
            <View style={{ margin: '10%', maxHeight: '90%' }}>
              <Text
                style={{
                  fontStyle: 'italic',
                  fontWeight: 'bold',
                  fontSize: 20,
                  textTransform: 'uppercase',
                  margin: 5,
                }}>
                Scoreboard
              </Text>
              <Text
                style={{
                  fontFamily: 'Raleway-SemiBold',
                  fontSize: 12,
                  textTransform: 'uppercase',
                  marginTop: 25,
                }}>
                Nailed it
              </Text>
              <Text>
                {nails} out of {total}
              </Text>
              <Slider thumbTintColor={'black'} animateTransitions value={nails / total} disabled />

              <Text
                style={{
                  fontFamily: 'Raleway-SemiBold',
                  fontSize: 12,
                  textTransform: 'uppercase',
                  marginTop: 25,
                }}>
                Bailed it
              </Text>
              <Text>
                {bails} out of {total}
              </Text>
              <Slider thumbTintColor={'black'} animateTransitions value={bails / total} disabled />
              <View
                style={{
                  width: '100%',
                  marginBottom: '3%',
                  marginTop: '5%',
                }}>
                <Button
                  title="Done"
                  style={{ maxWidth: '100%' }}
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
        <TouchableHighlight
          underlayColor={'white'}
          style={{ height: '100%' }}
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text style={{ color: '#6d6d6d', justifyContent: 'center', fontStyle: 'italic' }}>
            Tap to see scoreboard
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}
