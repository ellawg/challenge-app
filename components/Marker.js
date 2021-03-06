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
          onPress={() =>
            this.props.navigation.navigate('challenge', {
              title: this.props.title,
              description: this.props.description,
              img: this.props.img,
              level: this.props.level,
              id: this.props.id,
              icon: this.props.icon,
              latLang: this.props.latLang,
              nails: this.props.nails,
              bails: this.props.bails,
            })
          }>
          <View style={styles.popUpInfo}>
            <Text style={{ fontSize: 20, alignSelf: 'center' }}>{this.props.title}</Text>
            <Image style={styles.img} source={{ uri: this.props.img }} />
            <Text style={{ alignSelf: 'center' }}>{'Tap to take challenge'}</Text>
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
    width: 43,
    height: 57,
    alignSelf: 'center',
  },
  popUpInfo: {
    height: 200,
    width: 200,
  },
});
