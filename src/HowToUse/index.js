import {Image} from 'react-native';
import React from 'react';
import splash from './../splash.png';
import Onboarding from 'react-native-onboarding-swiper'; // 0.4.0

export default class App extends React.Component {
  render() {
    return (
      <Onboarding
        onSkip={() => this.props.navigation.navigate('Home')}
        onDone={() => this.props.navigation.navigate('Home')}
        pages={[
          {
            backgroundColor: '#fff',
            image: <Image source={{splash}} />,
            title: 'Onboarding',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
          {
            backgroundColor: '#fe6e58',
            image: <Image source={{splash}} />,
            title: 'The Title',
            subtitle: 'This is the subtitle that sumplements the title.',
          },
          {
            backgroundColor: '#999',
            image: <Image source={{splash}} />,
            title: 'Triangle',
            subtitle: "Beautiful, isn't it?",
          },
        ]}
      />
    );
  }
}
