import React, {Component} from 'react';
import {Image, View, Dimensions} from 'react-native';
import nodata from './../nodata.png';

const {width} = Dimensions.get('window');

export default class NoDataFound extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Image
          source={nodata}
          style={{
            resizeMode: 'center',
            width,
            flex: 1,
          }}
        />
      </View>
    );
  }
}
