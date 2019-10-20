import { Image } from 'react-native';
import React from 'react';
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
            image: <Image source={require("./images/1.png")} />,
            title: 'Step-1',
            subtitle: 'Open Your Whatsapp Chat Page and Click “3 Vertical Dot” Menu icon',
          },
          {
            backgroundColor: '#fe6e58',
            image: <Image source={require("./images/2.png")} />,
            title: 'Step-2',
            subtitle: 'Here just click “More” and choose “Export Chat” option',
          },
          {
            backgroundColor: '#999',
            image: <Image source={require("./images/3.png")} />,
            title: 'Step-3',
            subtitle: "It will give you further 2 option “Without Media” or “Include Media”, choose any of them and go ahead",
          },
          {
            backgroundColor: '#fff',
            image: <Image source={require("./images/4.png")} />,
            title: 'Step-4',
            subtitle: "Now send this WhatsApp chat to “Google Drive”",
          },
          {
            backgroundColor: '#fe6e58',
            image: <Image source={require("./images/5.png")} />,
            title: 'Step-5',
            subtitle: "Go to WhatsApp Text Analysis, Click New Option and enter your partner name, After select your WhatsApp Docunment from Drive",
          },
        ]}
      />
    );
  }
}
