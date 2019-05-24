import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import MapView from 'react-native-maps';
import * as firebase from 'firebase';
import CustomMarker from '../components/Marker';
import 'firebase/firestore';

const { width, height } = Dimensions.get('window');
const aspectRatio = width / height;
const latitudeDelta = 0.0022; //zoomlevel
const longitudeDelta = latitudeDelta * aspectRatio;

export default class PlaceChallengeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta,
        longitudeDelta,
      },
      marker: { coordinate: { latitude: 0, longitude: 0 } },
      markerStyles: [
        {
          name: 'Stairs',
          style: styles.iconChosen,
          image: require('../assets/images/Stairs.png'),
        },
        { name: 'Rail', style: styles.icon, image: require('../assets/images/Rail.png') },
        { name: 'Jump', style: styles.icon, image: require('../assets/images/Jump.png') },
      ],
      chosenMarker: { name: 'Stairs', image: require('../assets/images/Stairs.png') },
      error: null,
    };
  }
  e;
  setUserPosition = async () => {
    /*Sets the position to the users position*/
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta,
            longitudeDelta,
          },
          marker: {
            coordinate: position.coords,
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
  };

  setMarker(e) {
    this.setState({
      marker: {
        coordinate: e.nativeEvent.coordinate,
      },
    });
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  markerSelected(chosen) {
    let markerStyles = [];
    let chosenMarker = null;
    this.state.markerStyles.map(marker => {
      if (marker.name === chosen) {
        markerStyles.push({
          name: marker.name,
          style: styles.iconChosen,
          image: marker.image,
        });
        chosenMarker = { name: marker.name, image: marker.image };
      } else {
        markerStyles.push({
          name: marker.name,
          style: styles.icon,
          image: marker.image,
        });
      }
    });
    this.setState({ markerStyles, chosenMarker });
  }

  sendToDb = async () => {
    let latLang = {
      latitude: this.state.marker.coordinate.latitude,
      longitude: this.state.marker.coordinate.longitude,
    };
    let db = await firebase.firestore();
    let id = this.props.navigation.getParam('id');
    db.collection('markers')
      .doc(id)
      .set(
        {
          id,
          title: this.props.navigation.getParam('title'),
          description: this.props.navigation.getParam('description'),
          latLang,
          icon: this.state.chosenMarker.name,
          level: this.props.navigation.getParam('level'),
        },
        { merge: true }
      )
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Button
          style={{ top: '30%', left: '4%' }}
          title="<"
          type="clear"
          buttonStyle={{ borderWidth: 0, maxWidth: '10%', backgroundColor: 'transparent' }}
          titleStyle={{ fontSize: 30, color: 'black' }}
          onPress={() => this.props.navigation.goBack()}
        />
        <View style={{ flex: 1, marginTop: 50 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.titleText}>Where?</Text>
            <Text style={styles.labelText}>Tap the map to change location</Text>
          </View>
          <MapView
            style={{ flex: 7 }}
            region={this.state.region}
            onRegionChange={region => this.onRegionChange()}
            loadingEnabled
            onPress={e => {
              this.setMarker(e);
            }}>
            <CustomMarker
              latLang={this.state.marker.coordinate}
              icon={this.state.chosenMarker.image}
            />
          </MapView>

          <View style={{ flex: 2, flexDirection: 'row', marginTop: 15, alignSelf: 'center' }}>
            {this.state.markerStyles.map(marker => (
              <TouchableOpacity key={marker.name} onPress={() => this.markerSelected(marker.name)}>
                <Image source={marker.image} style={marker.style} />
              </TouchableOpacity>
            ))}
          </View>
          <View style={{ flex: 2 }}>
            <Button
              style={{ alignSelf: 'center', marginBottom: '5%', width: '80%' }}
              title="Submit challenge"
              onPress={() => {
                this.sendToDb();
                this.props.navigation.navigate('map');
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
    flex: 1,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 20,
    textTransform: 'uppercase',
    marginLeft: 45,
    marginBottom: 5,
  },
  labelText: {
    flex: 1,
    alignSelf: 'flex-end',
    fontFamily: 'Raleway-SemiBold',
    fontSize: 12,
    textTransform: 'uppercase',
    marginLeft: 45,
    marginTop: 5,
  },
  icon: {
    width: 60,
    height: 60,
  },
  iconChosen: {
    width: 80,
    height: 80,
  },
});
