import React, { Component } from 'react';
import { name as appName } from './app.json';
import { AppRegistry, View, Text, Dimensions, StyleSheet } from 'react-native';

class App extends Component {

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>as</Text>
      </View>
    );
  }
}
AppRegistry.registerComponent(appName, () => App);
