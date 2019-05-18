import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import MapView, { Callout } from 'react-native-maps';
import { Icon, Tooltip } from 'react-native-elements';

export default class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 42.882004,
      longitude: 74.582748,
      error: null,
    };
  }

  componentDidMount() {
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
          <MapView.Marker
            coordinate={{ latitude: this.state.latitude - 0.007, longitude: this.state.longitude }}>
            <Tooltip
              height={200}
              width={200}
              popover={
                <TouchableOpacity
                  style={{ height: 180, width: 180 }}
                  onPress={e => {
                    alert('Du skickas nu vidare till nästa skärm');
                  }}>
                  <Icon reverse name="ambulance" type="font-awesome" color="black" />
                  <Text style={{ color: 'white' }}>Jump over the ambulance</Text>
                </TouchableOpacity>
              }
              backgroundColor="black">
              <Icon reverse name="ambulance" type="font-awesome" color="black" />
            </Tooltip>
          </MapView.Marker>

          {/*Rendering a list of markers
          {this.state.markers.map(marker => (
            <MapView.Marker
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
            />
          ))} */}
        </MapView>
        <View style={styles.fab}>
          <Icon reverse name="user" type="font-awesome" color="#C31818" />
          <Icon reverse name="plus" type="font-awesome" color="#C31818" />
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
