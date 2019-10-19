import React, { Component } from 'react';
import Wallpaper from './Wallpaper';
import Dimensions from 'Dimensions';
import Header from './../Components/Header';
import IconNG from 'react-native-vector-icons/FontAwesome';
import uuid from 'uuid/v4';
import styles from './style';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded
} from 'react-native-admob'
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
  Image,
  TextInput,
  AsyncStorage,
  Alert,
} from 'react-native';
import spinner from './images/loading.gif';
import usernameImg from './images/username.png';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
      isLoading: false,
      avatarSource: null,
      videoSource: null,
      progress: 0,
      username: '',
    };
    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
  }

  _onPress = e => {
    e.preventDefault();
    if (this.state.username == '') {
      Alert.alert(
        'Text Analysis',
        'Username Required',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false },
      );
      return false;
    } else if (!/^[a-zA-Z. ]{2,50}$/.test(this.state.username)) {
      Alert.alert(
        'Text Analysis',
        'Enter Valid Username',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false },
      );
      return false;
    }
    // console.log(this.state.username);
    if (this.state.isLoading) return;
    this.setState({ isLoading: true });
    Animated.timing(this.buttonAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();

    setTimeout(() => {
      this._onGrow();
    }, 2000);
    const saveUserId = async userId => {
      try {
        var data = await AsyncStorage.setItem(
          'username',
          this.state.username + '@@' + uuid(),
        );
        this.props.navigation.navigate('HowToUse');
        this.setState({ isLoading: false });
        this.buttonAnimated.setValue(0);
        this.growAnimated.setValue(0);
      } catch (error) {
        Alert.alert(
          'Text Analysis',
          'Try Again Later',
          [
            {
              text: 'OK',
              onPress: () => console.log('OK Pressed'),
            },
          ],
          { cancelable: false },
        );
      }
    };
    setTimeout(() => {
      saveUserId();
    }, 2300);
  };

  _onGrow() {
    Animated.timing(this.growAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();
  }
  render() {
    const changeWidth = this.buttonAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [DEVICE_WIDTH - MARGIN, MARGIN],
    });
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, MARGIN],
    });

    return (
      <Wallpaper>
        <View behavior="padding" style={styles.welcomecontainer}>
          <AdMobBanner
            adSize="fullBanner"
            adUnitID="ca-app-pub-2768988214935130/8410873681"
            // testDevices={[AdMobBanner.simulatorId]}
            onAdFailedToLoad={error => console.log(error)}
          />

          <Text style={styles.texthead}>WhatsApp Analysis</Text>
          <View style={styles.inputWrapper}>
            <Image source={usernameImg} style={styles.inlineImg1} />
            <TextInput
              style={styles.input}
              placeholder="User Name..."
              autoCorrect={false}
              onChangeText={username => this.setState({ username })}
              autoCapitalize={true}
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.container1}>
            <Animated.View style={{ width: changeWidth }}>
              <TouchableOpacity
                style={styles.button}
                onPress={this._onPress}
                activeOpacity={1}>
                {this.state.isLoading ? (
                  <Image source={spinner} style={styles.image} />
                ) : (
                    <Text style={styles.text}>Click to Small Tour</Text>
                  )}
              </TouchableOpacity>
              <Animated.View
                style={[styles.circle, { transform: [{ scale: changeScale }] }]}
              />
            </Animated.View>
          </View>
        </View>
      </Wallpaper>
    );
  }
}

// import React, { Component } from 'react';
// import {
//   Button,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';
// import {
//   AdMobBanner,
//   AdMobInterstitial,
//   AdMobRewarded,
//   PublisherBanner,
// } from "react-native-admob";

// const BannerExample = ({ style, title, children, ...props }) => (
//   <View {...props} style={[styles.example, style]}>
//     <Text style={styles.title}>{title}</Text>
//     <View>{children}</View>
//   </View>
// );

// const bannerWidths = [200, 250, 320];

// export default class Example extends Component {
//   constructor() {
//     super();
//     this.state = {
//       fluidSizeIndex: 0,
//     };
//   }

//   componentDidMount() {
//     AdMobRewarded.setTestDevices([AdMobRewarded.simulatorId]);
//     AdMobRewarded.setAdUnitID('ca-app-pub-2768988214935130/5864601394');

//     AdMobRewarded.addEventListener('rewarded', reward =>
//       console.log('AdMobRewarded => rewarded', reward),
//     );
//     AdMobRewarded.addEventListener('adLoaded', () =>
//       console.log('AdMobRewarded => adLoaded'),
//     );
//     AdMobRewarded.addEventListener('adFailedToLoad', error =>
//       console.warn(error),
//     );
//     AdMobRewarded.addEventListener('adOpened', () =>
//       console.log('AdMobRewarded => adOpened'),
//     );
//     AdMobRewarded.addEventListener('videoStarted', () =>
//       console.log('AdMobRewarded => videoStarted'),
//     );
//     AdMobRewarded.addEventListener('adClosed', () => {
//       console.log('AdMobRewarded => adClosed');
//       AdMobRewarded.requestAd().catch(error => console.warn(error));
//     });
//     AdMobRewarded.addEventListener('adLeftApplication', () =>
//       console.log('AdMobRewarded => adLeftApplication'),
//     );

//     AdMobRewarded.requestAd().catch(error => console.warn(error));

//     AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
//     AdMobInterstitial.setAdUnitID('ca-app-pub-2768988214935130/4168376341');

//     AdMobInterstitial.addEventListener('adLoaded', () =>
//       console.log('AdMobInterstitial adLoaded'),
//     );
//     AdMobInterstitial.addEventListener('adFailedToLoad', error =>
//       console.warn(error),
//     );
//     AdMobInterstitial.addEventListener('adOpened', () =>
//       console.log('AdMobInterstitial => adOpened'),
//     );
//     AdMobInterstitial.addEventListener('adClosed', () => {
//       console.log('AdMobInterstitial => adClosed');
//       AdMobInterstitial.requestAd().catch(error => console.warn(error));
//     });
//     AdMobInterstitial.addEventListener('adLeftApplication', () =>
//       console.log('AdMobInterstitial => adLeftApplication'),
//     );

//     AdMobInterstitial.requestAd().catch(error => console.warn(error));
//   }

//   componentWillUnmount() {
//     AdMobRewarded.removeAllListeners();
//     AdMobInterstitial.removeAllListeners();
//   }

//   showRewarded() {
//     AdMobRewarded.showAd().catch(error => console.warn(error));
//   }

//   showInterstitial() {
//     AdMobInterstitial.showAd().catch(error => console.warn(error));
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <ScrollView>
//           <BannerExample title="AdMob - Basic">
//             <AdMobBanner
//               adSize="banner"
//               adUnitID="ca-app-pub-2768988214935130/8410873681"
//               ref={el => (this._basicExample = el)}
//             />
//             <Button
//               title="Reload"
//               onPress={() => this._basicExample.loadBanner()}
//             />
//           </BannerExample>
//           <BannerExample title="Smart Banner">
//             <AdMobBanner
//               adSize="smartBannerPortrait"
//               adUnitID="ca-app-pub-2768988214935130/8410873681"
//               ref={el => (this._smartBannerExample = el)}
//             />
//             <Button
//               title="Reload"
//               onPress={() => this._smartBannerExample.loadBanner()}
//             />
//           </BannerExample>
//           <BannerExample title="Rewarded">
//             <Button
//               title="Show Rewarded Video and preload next"
//               onPress={this.showRewarded}
//             />
//           </BannerExample>
//           <BannerExample title="Interstitial">
//             <Button
//               title="Show Interstitial and preload next"
//               onPress={this.showInterstitial}
//             />
//           </BannerExample>
//           <BannerExample title="DFP - Multiple Ad Sizes">
//             <PublisherBanner
//               adSize="banner"
//               validAdSizes={['banner', 'largeBanner', 'mediumRectangle']}
//               adUnitID="/6499/example/APIDemo/AdSizes"
//               ref={el => (this._adSizesExample = el)}
//             />
//             <Button
//               title="Reload"
//               onPress={() => this._adSizesExample.loadBanner()}
//             />
//           </BannerExample>
//           <BannerExample
//             title="DFP - App Events"
//             style={this.state.appEventsExampleStyle}>
//             <PublisherBanner
//               style={{ height: 50 }}
//               adUnitID="/6499/example/APIDemo/AppEvents"
//               onAdFailedToLoad={error => {
//                 console.warn(error);
//               }}
//               onAppEvent={event => {
//                 if (event.name === 'color') {
//                   this.setState({
//                     appEventsExampleStyle: { backgroundColor: event.info },
//                   });
//                 }
//               }}
//               ref={el => (this._appEventsExample = el)}
//             />
//             <Button
//               title="Reload"
//               onPress={() => this._appEventsExample.loadBanner()}
//               style={styles.button}
//             />
//           </BannerExample>
//           <BannerExample title="DFP - Fluid Ad Size">
//             <View
//               style={[
//                 { backgroundColor: '#f3f', paddingVertical: 10 },
//                 this.state.fluidAdSizeExampleStyle,
//               ]}>
//               <PublisherBanner
//                 adSize="fluid"
//                 adUnitID="/6499/example/APIDemo/Fluid"
//                 ref={el => (this._appFluidAdSizeExample = el)}
//                 style={{ flex: 1 }}
//               />
//             </View>
//             <Button
//               title="Change Banner Width"
//               onPress={() =>
//                 this.setState(prevState => ({
//                   fluidSizeIndex: prevState.fluidSizeIndex + 1,
//                   fluidAdSizeExampleStyle: {
//                     width:
//                       bannerWidths[
//                       prevState.fluidSizeIndex % bannerWidths.length
//                       ],
//                   },
//                 }))
//               }
//               style={styles.button}
//             />
//             <Button
//               title="Reload"
//               onPress={() => this._appFluidAdSizeExample.loadBanner()}
//               style={styles.button}
//             />
//           </BannerExample>
//         </ScrollView>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     marginTop: Platform.OS === 'ios' ? 30 : 10,
//   },
//   example: {
//     paddingVertical: 10,
//   },
//   title: {
//     margin: 10,
//     fontSize: 20,
//   },
// });