import React from 'react';

export default class SplashScreen extends React.Component {
  render() {
    return <Text style={styles.splashText}>Hej Splashhh</Text>;
  }
}

const styles = StyleSheet.create({
  splashText: {
    fontSize: 20,
  },
});
