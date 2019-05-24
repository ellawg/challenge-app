import React from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native';
import MapView from 'react-native-maps';
import { Button } from 'react-native-elements';
import CustomMarker from '../components/Marker';
import ScoreModal from '../components/ScoreModal';
import 'firebase/firestore';

const zoomLevel = 0.0822;

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

  setlatLang(latLang) {
    this.setState({
      region: {
        latitude: latLang.latitude,
        longitude: latLang.longitude,
        latitudeDelta: zoomLevel,
        longitudeDelta: zoomLevel,
      },
    });
  }
  componentDidMount() {
    const { navigation } = this.props;
    const latLang = navigation.getParam('latLang');
    this.setlatLang(latLang);
  }

  render() {
    const { navigation } = this.props;
    const title = navigation.getParam('title');
    const description = navigation.getParam('description');
    const img = navigation.getParam('img');
    const level = navigation.getParam('level');
    const icon = navigation.getParam('icon');
    const id = navigation.getParam('id');
    let latLang = navigation.getParam('latLang');
    if (latLang === undefined) {
      latLang = { longitude: 0, latitude: 0 };
    }

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 2 }}>
          <ImageBackground
            style={{ flex: 1, width: undefined, backgroundColor: '#6d6d6d' }}
            source={{ uri: img }}>
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
          <Text style={styles.titleText}>{title}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <Text style={styles.labelText}>Level: </Text>
            <Text>{level}</Text>
          </View>

          <Text style={styles.labelText}>Description</Text>
          <ScrollView style={{ height: '100%' }}>
            <Text>{description}</Text>
          </ScrollView>
          <ScoreModal />
        </View>
        <View style={{ flex: 1 }}>
          <MapView
            style={{ flex: 1 }}
            region={this.state.region}
            onRegionChange={this.onRegionChange}
            showsUserLocation
            loadingEnabled>
            <CustomMarker
              popUp
              key={id}
              title={title}
              latLang={latLang}
              description={description}
              icon={icon}
            />
          </MapView>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
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
    fontSize: 13,
    textTransform: 'uppercase',
    marginTop: '5%',
  },
});
