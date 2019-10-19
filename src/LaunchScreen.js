import React, { Component } from 'react';
import { Image, AsyncStorage, View } from 'react-native';
import splash from './splash.png';
import Axios from 'axios';

export default class LaunchScreen extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    header: null,
  };

  async componentDidMount() {
    const fetchLinks = await Axios.get('https://firebasestorage.googleapis.com/v0/b/whatsapp-text-analysis.appspot.com/o/links.txt?alt=media&token=ddf95a82-78b2-42ab-b793-62fa69ca0640');
    await AsyncStorage.setItem(
      'links',
      fetchLinks.data,
    )
    const links = await AsyncStorage.getItem('links')
    console.log(links.split("@@"))

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
