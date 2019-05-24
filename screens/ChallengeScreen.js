import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

import MapView from 'react-native-maps';
import { Button } from 'react-native-elements';
import * as firebase from 'firebase';
import CustomMarker from '../components/Marker';
import 'firebase/firestore';

const zoomLevel = 0.0822;
const img = require('../assets/images/Testbild.jpg');
const icon = require('../assets/images/Stairs.png');

export default class LoginScreen extends React.Component {
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
    const { navigation } = this.props;
    const title = navigation.getParam('title');
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ImageBackground
            style={{ flex: 1, width: undefined, backgroundColor: 'green' }}
            source={require('../assets/images/coolcroc.jpg')}
            resizeMode="contain">
            <Button
              style={{ top: '30%', left: '4%' }}
              title="<"
              type="clear"
              buttonStyle={{ borderWidth: 0, maxWidth: '10%' }}
              titleStyle={{ fontSize: 30 }}
              onPress={() => this.props.navigation.goBack()}
            />
          </ImageBackground>
        </View>
        <View style={{ flex: 2, margin: 45, marginTop: 20 }}>
          <Text style={styles.titleText}>Challenge name</Text>
          <Text>{title}</Text>
          <Text style={styles.labelText}>Level</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>

          <Button
            title="See who nailed this challenge"
            titleStyle={{ fontSize: 12, color: 'black' }}
            buttonStyle={{ backgroundColor: 'lightgray' }}
          />
        </View>
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
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            margin: '5%',
          }}>

          <Button
            title="Nailed it"
            onPress={() => this.props.navigation.navigate('confirm', { confirmState: 'nailed' })}
          />
          <Button
            titleStyle={{ color: 'black' }}
            buttonStyle={{
              borderWidth: 1,
              borderColor: 'black',
              borderTopLeftRadius: 1,
              borderStyle: 'solid',
              backgroundColor: 'white',
            }}
            title="Bailed it"
            onPress={() => this.props.navigation.navigate('confirm', { confirmState: 'bailed' })}
            confirmState={'bailed'}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 20,
    textTransform: 'uppercase',
    margin: 5,
  },
  labelText: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 12,
    textTransform: 'uppercase',
    marginTop: 25,
  },
});
