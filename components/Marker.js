import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import MapView, { Callout } from 'react-native-maps';

/* Must be used inside <Mapview> to create marker
PROPS
id: int 
title: string
description: string 
latLang {latitude: float, longitude: float}
img: path to image
icon: path to icon
*/

export default class CustomMarker extends Component {
  showPopUp() {
    /* If the prop popUp is added the marker will show a popup */
    if (this.props.popUp) {
      return (
        <Callout
          style={{ flex: 1 }}
          onPress={() => {
            alert('Du skickas nu vidare till nästa skärm');
            {
              /*this.props.navigation.navigate('challenge + {this.props.id}')*/
            }
          }}>
          <View style={styles.popUpInfo}>
            <Text style={{ fontSize: 20 }}>{this.props.title}</Text>
            <Image style={styles.img} source={this.props.img} />
            <Text>{this.props.description}</Text>
          </View>
        </Callout>
      );
    }
  }

  render() {
    return (
      <MapView.Marker
        draggable={this.props.draggable}
        coordinate={this.props.latLang}
        key={this.props.id}>
        <Image style={styles.icon} source={this.props.icon} />
        {this.showPopUp()}
      </MapView.Marker>
    );
  }
}

const styles = StyleSheet.create({
  img: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'contain',
  },
  icon: {
    width: 60,
    height: 60,
    alignSelf: 'center',
  },
  popUpInfo: {
    height: 200,
    width: 200,
  },
});
