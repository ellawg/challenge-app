import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

export default class ButtonComponent extends React.Component {
  render() {
    return <Button style={styles.button} title={this.props.buttonTitle}  type="outline" />;
  }
}

const styles = StyleSheet.create({
  button: {
  },
});
