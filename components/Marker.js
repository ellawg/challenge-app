import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import MapView from 'react-native-maps';
import { Icon, Tooltip } from 'react-native-elements';

/* Must be used inside <Mapview> to create marker
PROPS
id: int 
title: string
description: string 
latLang {latitude: float, longitude: float}
img: path to image
icon: path to icon
*/

export class CustomMarker extends Component {
  render() {
    return (
      <MapView.Marker coordinate={this.props.latLang} key={this.props.id}>
        <Tooltip
          height={200}
          width={200}
          backgroundColor="black"
          popover={
            <TouchableOpacity
              style={styles.popUpInfo}
              onPress={() => {
                alert('Du skickas nu vidare till nästa skärm');
                {
                  /*this.props.navigation.navigate('challenge + {this.props.id}')*/
                }
              }}>
              <Text style={[styles.textColor, styles.titleSize]}>{this.props.title}</Text>
              <Image style={styles.img} source={this.props.img} />

              <Text style={styles.textColor}>{this.props.description}</Text>
            </TouchableOpacity>
          }>
          <Image source={this.props.icon} style={styles.icon} />
        </Tooltip>
      </MapView.Marker>
    );
  }
}

const styles = StyleSheet.create({
  textColor: {
    color: 'white',
  },
  titleSize: {
    fontSize: 20,
  },
  img: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'contain',
  },
  icon: {
    width: 60,
    height: 60,
  },
  popUpInfo: {
    flex: 1,
    height: 180,
    width: 180,
  },
});
