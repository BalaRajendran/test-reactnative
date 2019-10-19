import React, {Component} from 'react';
import {View, Text} from 'native-base';
import Share from 'react-native-share';

export default class ShareApp extends Component {
  componentDidMount() {
    this.check();
  }
  check = () => {
    var url;
    var message;
    url =
      'https://play.google.com/store/apps/details?id=com.farmingarms.balaji.farmingarms';
    message = 'Share this app';
    const shareOptions = {
      title: 'Share via',
      message,
      url,
      social: Share.Social,
    };
    Share.open(shareOptions)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };
  redirect = () => {
    this.props.navigation.navigate('Home');
  };
  render() {
    return (
      <View>
        <Text>{this.redirect()}</Text>
      </View>
    );
  }
}
