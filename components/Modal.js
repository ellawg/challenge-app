import React from 'react';
import { Modal, Text, TouchableHighlight, View, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';

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
              marginTop: '30%',
              backgroundColor: 'white',
              height: '40%',
              margin: '5%',
              borderRadius: '10%',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.8,
              shadowRadius: 2,
            }}>
            <View style={{ margin: '10%', maxHeight: '90%' }}>
              <View style={{ maxHeight: '60%' }}>
                <Input
                  multiline
                  placeholder={this.state.inputText}
                  onChangeText={inputText => this.setState({ inputText })}
                />
              </View>
              <View
                style={{
                  width: '100%',
                  marginBottom: '3%',
                  marginTop: '5%',
                }}>
                <Button
                  title="Cancel"
                  style={{ maxWidth: '100%' }}
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                />
                <Button
                  title="Submit"
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
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>{this.props.placeholder}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
