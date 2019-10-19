import React, { Component } from 'react';
import { name as appName } from './app.json';
import { AppRegistry, View, Text, Dimensions, StyleSheet } from 'react-native';
import Index from './src/Navigation';
import firebase from 'react-native-firebase';
import NetInfo from '@react-native-community/netinfo';
console.disableYellowBox = true;
const { app } = firebase.storage();
global.firstLaunch = 'First Launch';
const { width } = Dimensions.get('window');
function MiniOfflineSign() {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
    </View>
  );
}
class App extends Component {
  constructor() {
    super();
    this.state = {
      networkStatus: true,
    };
  }
  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this._handleConnectivityChange,
    );

    NetInfo.isConnected.fetch().done(isConnected => {
      this.setState({ networkStatus: isConnected });
    });
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this._handleConnectivityChange,
    );
  }

  _handleConnectivityChange = isConnected => {
    this.setState({ networkStatus: isConnected });
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Index />
        {!this.state.networkStatus && <MiniOfflineSign />}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    bottom: 0,
  },
  offlineText: { color: '#fff' },
});
AppRegistry.registerComponent(appName, () => App);
