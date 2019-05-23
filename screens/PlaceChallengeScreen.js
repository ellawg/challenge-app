import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Input, ButtonGroup, Button } from 'react-native-elements';
import MapView from 'react-native-maps';
import CustomMarker from '../components/Marker';

const zoomLevel = 0.0022;
const icon = require('../assets/images/Stairs.png');
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0022;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export default class CreateChallengeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      marker: { coordinate: { latitude: 0, longitude: 0 } },
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
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
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
  render() {
    return (
      <View style={{ flex: 1, marginTop: 70 }}>
        <Text style={styles.titleText}>Where?</Text>
        <MapView
          style={{ flex: 7 }}
          region={this.state.region}
          onRegionChange={region => this.onRegionChange()}
          loadingEnabled
          onPress={e => {
            this.setMarker(e);
          }}>
          <CustomMarker latLang={this.state.marker.coordinate} icon={icon} />
        </MapView>
        <Text style={styles.labelText}>Tap the map to change location</Text>
        <View>
          <Button
            style={{ alignSelf: 'center', marginBottom: 40 }}
            title="Submit challenge"
            onPress={() => {
              this.props.navigation.navigate('map');
            }}
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
    marginLeft: 45,
    marginBottom: 5,
  },
  labelText: {
    flex: 2,
    fontFamily: 'Raleway-SemiBold',
    fontSize: 12,
    textTransform: 'uppercase',
    marginLeft: 45,
    marginTop: 5,
  },
});
