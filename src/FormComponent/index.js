import React, { Component } from 'react';
import Wallpaper from './Wallpaper';
import DocumentPicker from 'react-native-document-picker';
import Dimensions from 'Dimensions';
import uuid from 'uuid/v1';
import Header from './../Components/Header';
import IconNG from 'react-native-vector-icons/FontAwesome';
import styles from './style';
import RNFetchBlob from 'rn-fetch-blob';
import axios from 'axios';
import firebase from 'react-native-firebase';
import base64 from 'react-native-base64';
import {
  AsyncStorage,
  Modal,
  View,
  ActivityIndicator,
  TouchableOpacity,
  PermissionsAndroid,
  Text,
  ToastAndroid,
  Animated,
  Easing,
  Image,
  TextInput,
} from 'react-native';
import usernameImg from './images/username.png';
const DEVICE_WIDTH = Dimensions.get('window').width;
const MARGIN = 40;
const dirs = RNFetchBlob.fs.dirs;
global.imageLink = 'sample';
global.textLink = 'sample';
export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      documentLoading: false,
      text: '',
      analysiswith: '',
      progress: 0,
      imagelink: '',
      textlink: '',
      text1: '',
    };
    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
    this._onPress = this._onPress.bind(this);
  }
  _onPress(e) {
    e.preventDefault();
    if (this.state.isLoading) return;
    if (this.state.analysiswith == '') {
      ToastAndroid.showWithGravity(
        'Username Required',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      return false;
    } else if (!/^[a-zA-Z. ]{2,50}$/.test(this.state.analysiswith)) {
      ToastAndroid.showWithGravity(
        'Enter Valid Username',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      return false;
    } else if (this.state.text == '') {
      if (this.state.documentLoading) {
        ToastAndroid.showWithGravity(
          'Document Still Loading',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      } else {
        ToastAndroid.showWithGravity(
          'Docunment Required',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }
      return false;
    }
    this.setState({ isLoading: true });
    Animated.timing(this.buttonAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();

    const finalSubmit = async finalSubmit => {
      const username = await AsyncStorage.getItem('username');
      const links = await AsyncStorage.getItem('links');
      const name = uuid();
      var analysiswith = this.state.analysiswith;
      var obj = {
        name1:
          username
            .split('@@')[0]
            .charAt(0)
            .toUpperCase() + username.split('@@')[0].slice(1),
        name2:
          analysiswith
            .split('@@')[0]
            .charAt(0)
            .toUpperCase() + analysiswith.split('@@')[0].slice(1),
        texts: this.state.text,
      };
      global.textLink = 0;
      global.imageLink = 0;
      var path = dirs['SDCardDir'] + '/WhatsApp_Textanalysis/test.png';
      var self = this;
      firebase
        .storage()
        .ref(`/documents/${name}.txt`)
        .putFile(dirs['SDCardDir'] + '/WhatsApp_Textanalysis/test.txt')
        .on(firebase.storage.TaskEvent.STATE_CHANGED, function (snapshot) {
          if (
            snapshot.state === firebase.storage.TaskState.SUCCESS &&
            global.textLink == 0
          ) {
            global.textLink = 1;
          } else if (
            snapshot.state === firebase.storage.TaskState.SUCCESS &&
            global.textLink == 1
          ) {
            global.textLink = snapshot.downloadURL;
            axios
              .post(
                links.split("@@")[1],
                obj,
              )
              .then(function (res) {
                global.sentimentLink = res.data.data.sentiments[0]
                RNFetchBlob.fs
                  .writeFile(path, res.data.data.message[0], 'base64')
                  .then(res => {
                    firebase
                      .storage()
                      .ref(`/images/${name}.png`)
                      .putFile(path)
                      .on(
                        firebase.storage.TaskEvent.STATE_CHANGED,
                        snapshot => {
                          if (
                            snapshot.state ===
                            firebase.storage.TaskState.SUCCESS &&
                            global.imageLink == 0
                          ) {
                            global.imageLink = 1;
                          } else if (
                            snapshot.state ===
                            firebase.storage.TaskState.SUCCESS &&
                            global.imageLink == 1
                          ) {
                            global.imageLink = snapshot.downloadURL;
                            const send = {
                              name: username
                                .split('@@')[0]
                                .charAt(0)
                                .toUpperCase() + username.split('@@')[0].slice(1),
                              analysiswith: analysiswith,
                              textLink: global.textLink,
                              imageLink: global.imageLink,
                              sentimentReport: global.sentimentLink,
                              text: self.state.text
                            }
                            const obj1 = {
                              name: username,
                              analysiswith: analysiswith,
                              text: global.textLink,
                              image: global.imageLink,
                            };
                            axios
                              .post(
                                links.split("@@")[2],
                                obj1,
                              )
                              .then(function (res1) {
                                self._onGrow();
                                self.setState({ isLoading: false });
                                self.buttonAnimated.setValue(0);
                                self.growAnimated.setValue(0);
                                self.props.navigation.navigate('FinalScreen', send);
                              })
                              .catch(err => {
                                self.setState({ isLoading: false });
                                ToastAndroid.showWithGravity(
                                  'Try Again Later...',
                                  ToastAndroid.SHORT,
                                  ToastAndroid.BOTTOM,
                                );
                              })
                          }
                        },
                      )
                      .catch(err => {
                        ToastAndroid.showWithGravity(
                          'Try Again Later...',
                          ToastAndroid.SHORT,
                          ToastAndroid.BOTTOM,
                        );
                      });
                  });
              })
              .catch(err => {
                ToastAndroid.showWithGravity(
                  'Try Again Later...',
                  ToastAndroid.SHORT,
                  ToastAndroid.BOTTOM,
                );
              });
          }
        })
    };
    finalSubmit();
  }
  _onGrow() {
    Animated.timing(this.growAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();
  }

  handleDocunment = () => {
    const uploadDocunment = async finalSubmit => {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to memory to download the file ',
        },
      );
      if (granted != PermissionsAndroid.RESULTS.GRANTED) {
        ToastAndroid.showWithGravity(
          'You need to give storage permission to download the file',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
        return false;
      }
      try {
        DocumentPicker.pick({
          type: [DocumentPicker.types.plainText],
        }).then(res => {
          this.setState({ documentLoading: true });
          var path = dirs['SDCardDir'] + '/WhatsApp_Textanalysis/test.txt';
          RNFetchBlob.fs.readFile(res.uri, 'base64').then(text1 => {
            RNFetchBlob.fs.writeFile(path, text1, 'base64').then(res => {
              this.setState({
                text: base64.decode(text1),
                text1,
                documentLoading: false,
              });
              ToastAndroid.showWithGravity(
                'Click Submit to Analyse',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
              );
            });
          });
        });
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          ToastAndroid.showWithGravity(
            'File not Selected',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
        } else {
          throw err;
        }
      }
    };
    uploadDocunment();
  };
  render() {
    const changeWidth = this.buttonAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [DEVICE_WIDTH - MARGIN, DEVICE_WIDTH - MARGIN],
    });
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, MARGIN],
    });
    let button = <Text style={styles.text}>Analysis My Text</Text>;
    if (this.state.documentLoading) {
      button = <ActivityIndicator size={'large'} color={'red'} />;
    } else {
      button = <Text style={styles.text}>Analysis My Text</Text>;
    }
    return (
      <Wallpaper>
        <Header {...this.props} />
        <View behavior="padding" style={styles.container}>
          <View style={styles.inputWrapper}>
            <Image source={usernameImg} style={styles.inlineImg1} />
            <TextInput
              style={styles.input}
              placeholder="Analysis With"
              autoCorrect={false}
              onChangeText={analysiswith => this.setState({ analysiswith })}
              autoCapitalize="sentences"
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
            />
          </View>
          <TouchableOpacity onPress={this.handleDocunment}>
            <View style={styles.picker}>
              <Text style={styles.pickertexk}>Select WhatsApp Docunment</Text>
              <IconNG name="upload" style={styles.inlineImg} />
            </View>
          </TouchableOpacity>
          <View
            style={{
              // flex: 1,
              backgroundColor: '#f0f0f0',
              elevation: 1,
            }}>
            <Modal
              animationType="slide"
              transparent={true}
              onRequestClose={() => {
                console.log('Modal has been closed.');
              }}
              visible={this.state.isLoading}
            >
              <View
                visible={this.state.isLoading}
                style={{
                  flex: 1,
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator
                  size={'large'}
                  color={'red'} />
              </View>
            </Modal>
          </View>
          <View
            visible={!this.state.isLoading}
            style={{
              flex: 1,
              elevation: 1,
            }}>
            <Animated.View style={{
              width: changeWidth
            }}>
              <TouchableOpacity
                style={styles.button}
                onPress={this._onPress}>
                {button}
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </Wallpaper >
    );
  }
}
