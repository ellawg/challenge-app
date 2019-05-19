import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import MapView from 'react-native-maps';
import { Icon, Tooltip } from 'react-native-elements';

export class CustomMarker extends Component {
  render() {
    return (
      <MapView.Marker coordinate={this.props.latLang} key={this.props.id}>
        <Tooltip
          height={200}
          width={200}
          popover={
            <TouchableOpacity
              style={{
                flex: 1,
                height: 180,
                width: 180,
              }}
              onPress={() => {
                alert('Du skickas nu vidare till nästa skärm');
                {
                  /*this.props.navigation.navigate('challenge + {this.props.id}')*/
                }
              }}>
              <Text style={{ color: 'white', fontSize: 20 }}>{this.props.title}</Text>
              <Image
                style={{ flex: 1, height: null, width: null, resizeMode: 'contain' }}
                source={this.props.img}
              />

              <Text style={{ color: 'white' }}>{this.props.description}</Text>
            </TouchableOpacity>
          }
          backgroundColor="black">
          <Icon reverse name={this.props.icon} type="font-awesome" color="black" />
        </Tooltip>
      </MapView.Marker>
    );
  }
}

const styles = StyleSheet.create({});
