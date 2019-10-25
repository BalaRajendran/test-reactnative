import React, { Component } from 'react';
import Wallpaper from './Wallpaper';
import Dimensions from 'Dimensions';
import uuid from 'uuid/v4';
import styles from './style';
import {
  View,
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
          {/* <AdMobBanner
            adSize="fullBanner"
            adUnitID="ca-app-pub-2768988214935130/8410873681"
            // testDevices={[AdMobBanner.simulatorId]}
            onAdFailedToLoad={error => console.log(error)}
          /> */}

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

