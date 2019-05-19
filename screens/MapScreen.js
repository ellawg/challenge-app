import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import MapView from 'react-native-maps';
import { Icon } from 'react-native-elements';
import { CustomMarker } from '../components/Marker';

export default class MapScreen extends Component {
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
            latitude: 59.334591,
            longitude: 18.06324,
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
            longitudeDelta: 0.0922,
          }}
          showsUserLocation>
          {this.state.markers.map(marker => (
            <CustomMarker
              key={marker.id}
              title={marker.title}
              latLang={marker.latLang}
              description={marker.description}
              icon={marker.icon}
              img={marker.img}
            />
          ))}
        </MapView>
        <View style={styles.fab}>
          <Icon
            onPress={() => {
              alert('Till profilsidan');
              {
                /*this.props.navigation.navigate('user')*/
              }
            }}
            reverse
            name="user"
            type="font-awesome"
            color="#C31818"
          />
          <Icon
            onPress={() => {
              alert('Skapa utmaning');
              /*this.props.navigation.navigate('createChallenge')*/
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
