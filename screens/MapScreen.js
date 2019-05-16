import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import MapView from 'react-native-maps';
import { Icon, Overlay } from 'react-native-elements';

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
          style={{ flex: 1, zIndex: -1 }}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation>
          <MapView.Marker
            coordinate={{ latitude: this.state.latitude + 0.002, longitude: this.state.longitude }}
            title={'Rail'}
            description={'Burn the decks for 5 sek'}
          />
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
    zIndex: 1,
  },
});
