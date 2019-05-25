import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { MarkerAnimated } from 'react-native-maps';
import { Icon } from 'react-native-elements';
import * as firebase from 'firebase';
import CustomMarker from '../components/Marker';
import 'firebase/firestore';

const zoomLevel = 0.0822;

export default class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 59.334591,
        longitude: 18.06324,
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

  componentDidMount() {
    this.setUserPosition();

    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.fetchMarkerFromFB();
    });
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

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

    markers.forEach(function(marker) {
      if (marker.icon === 'Stairs') {
        marker.icon = require('../assets/images/Stairs.png');
      } else if (marker.icon === 'Jump') {
        marker.icon = require('../assets/images/Jump.png');
      } else if (marker.icon === 'Rail') {
        marker.icon = require('../assets/images/Rail.png');
      }
    });
    this.setMarkers(markers);
  };

  setIcon(marker) {
    return require('../assets/images/Stairs.png');
  }

  render() {
    const { navigation } = this.props;
    const userid = navigation.getParam('userid');
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          showsUserLocation
          userLocationAnnotationTitle={'Your position'}
          loadingEnabled>
          {this.state.markers.map(marker => (
            <CustomMarker
              popUp
              key={marker.id}
              id={marker.id}
              title={marker.title}
              latLang={marker.latLang}
              description={marker.description}
              icon={marker.icon}
              img={marker.image}
              navigation={this.props.navigation}
              level={marker.level}
              nails={marker.challengers.nrOfNails}
              bails={marker.challengers.nrOfBails}
            />
          ))}
        </MapView>

        <View style={styles.fab}>
          <Icon
            onPress={() => {
              this.props.navigation.navigate('profile', { userid });
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
