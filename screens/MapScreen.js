import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import MapView, { Callout } from 'react-native-maps';
import { Icon, Tooltip } from 'react-native-elements';

export default class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      error: null,
      markers: [
        {
          id: 1,
          title: 'Sick jump',
          description: 'Do a sick jump over the hood of the ambulance',
          latLang: {
            latitude: 37.793972,
            longitude: -122.425,
          },
          img: require('../assets/images/Testbild.jpg'),
          icon: 'ambulance',
        },
        {
          id: 2,
          title: 'Bite the apple',
          description: 'Ride the rails outside the Apple store',
          latLang: {
            latitude: 37.773972,
            longitude: -122.431297,
          },
          img: require('../assets/images/Testbild2.jpg'),
          icon: 'apple',
        },
      ],
    };
  }

  componentDidMount() {
    /*Sets the position to the users position*/
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation>
          {this.state.markers.map(marker => (
            <MapView.Marker coordinate={marker.latLang} key={marker.id}>
              <Tooltip
                height={200}
                width={200}
                popover={
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      height: 180,
                      width: 180,
                      flexDirection: 'column',
                    }}
                    onPress={e => {
                      alert('Du skickas nu vidare till nästa skärm');
                    }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>{marker.title}</Text>
                    <Image
                      style={{ flex: 1, height: null, width: null, resizeMode: 'contain' }}
                      source={marker.img}
                    />

                    <Text style={{ color: 'white' }}>{marker.description}</Text>
                  </TouchableOpacity>
                }
                backgroundColor="black">
                <Icon reverse name={marker.icon} type="font-awesome" color="black" />
              </Tooltip>
            </MapView.Marker>
          ))}
        </MapView>
        <View style={styles.fab}>
          <Icon
            onPress={e => {
              alert('Användarprofilen');
            }}
            reverse
            name="user"
            type="font-awesome"
            color="#C31818"
          />
          <Icon
            onPress={e => {
              alert('Skapa utmaning');
            }}
            reverse
            name="plus"
            type="font-awesome"
            color="#C31818"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
});
