import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { Icon } from 'react-native-elements';
import * as firebase from 'firebase';
import CustomMarker from '../components/Marker';
import 'firebase/firestore';

const zoomLevel = 0.0822;
const img = require('../assets/images/Testbild.jpg');
const icon = require('../assets/images/Stairs.png');

export default class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: zoomLevel,
        longitudeDelta: zoomLevel,
      },
      markers: [],
      error: null,
    };
  }

  setUserPosition = async () => {
    /*Sets the position to the users position*/
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: zoomLevel,
            longitudeDelta: zoomLevel,
          },
          error: null,
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
    );
  };

  componentDidMount = async () => {
    this.setUserPosition();
    this.fetchMarkerFromFB();
  };

  setMarkers(markers) {
    this.setState({
      markers,
    });
  }

  fetchMarkerFromFB = async () => {
    let db = await firebase.firestore();
    let newMarkers = [];

    let markers = await db
      .collection('markers')
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          newMarkers.push(doc.data());
        });
        return newMarkers;
      })
      .catch(function(error) {
        console.log('Error getting documents: ', error);
      });
    this.setMarkers(markers);
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          showsUserLocation
          loadingEnabled>
          {this.state.markers.map(marker => (
            <CustomMarker
              popUp
              key={marker.id}
              title={marker.title}
              latLang={marker.latLang}
              description={marker.description}
              icon={icon}
              img={img}
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
              this.props.navigation.navigate('create');
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
