import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import MapView from 'react-native-maps';
import CustomMarker from '../components/Marker';

const { width, height } = Dimensions.get('window');
const aspectRatio = width / height;
const latitudeDelta = 0.0022; //zoomlevel
const longitudeDelta = latitudeDelta * aspectRatio;
export default class CreateChallengeScreen extends React.Component {
  constructor() {
    super();
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
          name: 'stairs',
          style: styles.iconChosen,
          image: require('../assets/images/Stairs.png'),
        },
        { name: 'rail', style: styles.icon, image: require('../assets/images/robot-dev.png') },
        { name: 'ramp', style: styles.icon, image: require('../assets/images/robot-prod.png') },
      ],
      chosenMarker: require('../assets/images/Stairs.png'),
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
        chosenMarker = marker.image;
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
            mapType={'hybrid'}
            region={this.state.region}
            onRegionChange={region => this.onRegionChange()}
            loadingEnabled
            onPress={e => {
              this.setMarker(e);
            }}>
            <CustomMarker latLang={this.state.marker.coordinate} icon={this.state.chosenMarker} />
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
              style={{ alignSelf: 'center', marginBottom: 40, width: '80%' }}
              title="Submit challenge"
              onPress={() => {
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
