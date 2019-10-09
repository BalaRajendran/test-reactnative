import React, { Component } from 'react';
import { Image, View } from 'react-native';
// import {
//   AdMobBanner,
//   AdMobInterstitial,
//   PublisherBanner,
//   AdMobRewarded
// } from 'react-native-admob';
import splash from './splash.png';

export default class LaunchScreen extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    header: null,
  };
  componentDidMount() {
    if (global.firstLaunch === 'true') {
      this.props.navigation.navigate('Home');
    } else {
      this.timeoutHandle = setTimeout(() => {
        this.props.navigation.navigate('Home');
      }, 3000);
      global.firstLaunch = 'true';
    }
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <AdMobBanner
          bannerSize="fullBanner"
          adUnitID="ca-app-pub-2768988214935130/3833965312"
          testDeviceID="EMULATOR"
          didFailToReceiveAdWithError={this.bannerError} /> */}
        <Image
          source={splash}
          style={{
            width: null,
            height: null,
            flex: 1,
          }}
        />
      </View>
    );
  }
}
