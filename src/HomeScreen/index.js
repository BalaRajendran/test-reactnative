import React, { Component } from 'react';
import IconNG from 'react-native-vector-icons/FontAwesome';
import Image from 'react-native-image-progress';
import RNFetchBlob from 'rn-fetch-blob';
import uuid from 'uuid/v1';
import Header from './../Components/Header';
import NoDataFound from './NoDataFound';
import ImageView from 'react-native-image-view';
import Dialog, {
  DialogTitle,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  DialogContent,
} from 'react-native-popup-dialog';
import {
  Modal,
  StatusBar,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
  BackHandler,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  ToastAndroid,
} from 'react-native';
import Share from 'react-native-share';
import axios from 'axios';
import {
  Container,
  Content,
  Card,
  List,
  ListItem,
  Text,
  Left,
  Body,
  Button,
  Fab,
  Right,
  View,
} from 'native-base';
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true,
      isLoading: true,
      progress: 0,
      loading: false,
      data: '',
      onPopup: false,
      image: '',
      isImageViewVisible: false,
      analysiswith: '',
      username: '',
    };
  }
  componentDidMount() {
    if (Platform.OS == 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }
    let username;
    let links;
    const getUsername = async getUsername => {
      try {
        username = await AsyncStorage.getItem('username');

        if (!username) {
          this.props.navigation.navigate('Welcome');
        } else {
          links = await AsyncStorage.getItem('links')
          this.setState({ username: username.split('@@')[0] });
          // console.log(username)
          // console.log(links)
          axios
            .post(
              links.split("@@")[0],
              { username },
            )
            .then(response => {
              // console.log(response)
              this.setState({
                data: response.data,
                isLoading: false,
              });
            })
            .catch(error => {
              console.error(error);
            });
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUsername();
  }

  componentWillUnmount() {
    if (Platform.OS == 'android') {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        this.handleBackButton,
      );
    }
  }
  actualDownload = url => {
    let dirs = RNFetchBlob.fs.dirs;
    RNFetchBlob.config({
      path: dirs['SDCardDir'] + '/WhatsApp_Textanalysis/' + uuid() + '.png',
      fileCache: true,
    })
      .fetch('GET', url, {})
      .progress((received, total) => {
        this.setState({ progress: received / total });
      })
      .then(res => {
        console.log(res.path());
        ToastAndroid.showWithGravity(
          'Image saved to the gallery',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      });
  };

  async downloadFile(url) {
    ToastAndroid.showWithGravity(
      'Downloading',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to memory to download the file ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.actualDownload(url);
      } else {
        ToastAndroid.showWithGravity(
          'You need to give storage permission to download the file',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }
    } catch (err) {
      console.warn(err);
    }
  }
  handleBackButton() {
    Alert.alert(
      'Exit',
      'Do you want to exit ?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            return false;
          },
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            global.firstLaunch = 'false';
            BackHandler.exitApp();
          },
        },
      ],
      { cancelable: false },
    );
    return true;
  }
  handleShare(url, name) {
    const fs = RNFetchBlob.fs;
    let imagePath = null;
    RNFetchBlob.config({
      fileCache: true,
    })
      .fetch('GET', url)
      .then(resp => {
        imagePath = resp.path();
        return resp.readFile('base64');
      })
      .then(base64Data => {
        var message =
          this.state.username +
          'analyse with ' +
          name +
          ' wants to share an image with you, Download the app via ' +
          'https://play.google.com/store/apps/details?id=com.farmingarms.balaji.farmingarms';
        const shareOptions = {
          title: 'Share via',
          message,
          url: 'data:image/png;base64,' + base64Data,
          social: Share.Social,
        };
        Share.open(shareOptions)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            err && console.log(err);
          });
      });
  }
  handlePopup = () => {
    this.setState({
      onPopup: !this.state.onPopup,
    });
  };
  handlePicture(url, name) {
    this.setState({
      image: url,
      analysiswith: name,
      isImageViewVisible: true,
    });
  }
  render() {
    const images = [
      {
        source: {
          uri: this.state.image,
        },
        title: 'Paris',
        width: 806,
      },
    ];
    if (this.state.isLoading) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: '#f0f0f0',
            elevation: 1,
          }}>
          <StatusBar backgroundColor={'#D63138'} barStyle="light-content" />
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.isLoading}
            onRequestClose={() => {
              console.log('Modal has been closed.');
            }}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.6)',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size={'large'} color={'red'} />
            </View>
          </Modal>
        </View>
      );
    } else {
      return (
        <Container>
          <ImageView
            images={images}
            imageIndex={0}
            onClose={() => this.setState({ isImageViewVisible: false })}
            isVisible={this.state.isImageViewVisible}
            renderFooter={currentImage => (
              <View
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  color: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{ color: 'white' }}>{this.state.analysiswith}</Text>
              </View>
            )}
          />
          <Dialog
            width={300}
            overlayBackgroundColor="#000"
            dialogAnimation={
              new SlideAnimation({
                slideFrom: 'bottom',
              })
            }
            visible={this.state.onPopup}
            onTouchOutside={this.handlePopup}
            dialogTitle={<DialogTitle title="Notes" />}
            footer={
              <DialogFooter>
                <DialogButton
                  text="Close"
                  onPress={() => {
                    this.setState({
                      onPopup: false,
                    });
                  }}
                />
              </DialogFooter>
            }>
            <DialogContent>
              <Text>iu</Text>
            </DialogContent>
          </Dialog>
          <Header onhandlePopup={this.handlePopup} {...this.props} />
          {this.state.data == '' ? (
            <NoDataFound />
          ) : (
              <Content>
                {this.state.data.map((list, i) => (
                  <Card key={i}>
                    <List>
                      <ListItem avatar noBorder>
                        <Left>
                          <TouchableOpacity
                            onPress={this.handlePicture.bind(
                              this,
                              list.image,
                              list.analysiswith,
                            )}>
                            <Image
                              source={{ uri: list.image }}
                              style={{
                                height: 60,
                                width: 60,
                                backgroundColor: 'white',
                                borderRadius: 2,
                                marginRight: 12,
                              }}
                              indicator={true}
                              resizeMode={'contain'}
                            />
                          </TouchableOpacity>
                        </Left>
                        <Body>
                          <Text note numberOfLines={1}>
                            Analysis with ...
                        </Text>
                          <Text>{list.analysiswith}</Text>
                        </Body>
                        <Right>
                          <List>
                            <ListItem noBorder>
                              <Button
                                onPress={() =>
                                  this.handleShare(list.image, list.analysiswith)
                                }
                                transparent>
                                <IconNG
                                  style={{ color: 'grey' }}
                                  size={29}
                                  name="share-square"
                                />
                              </Button>
                              <Button
                                transparent
                                onPress={() => this.downloadFile(list.image)}
                                style={{ marginLeft: 10 }}>
                                <IconNG
                                  size={29}
                                  style={{ color: 'grey' }}
                                  name="arrow-circle-down"
                                />
                              </Button>
                            </ListItem>
                          </List>
                        </Right>
                      </ListItem>
                    </List>
                  </Card>
                ))}
              </Content>
            )}
          <Fab
            style={{ backgroundColor: '#B53F8F' }}
            position="bottomRight"
            onPress={() => this.props.navigation.navigate('NewAnalysis')}>
            <IconNG name="plus-circle" size={12} style={{ color: 'white' }} />
          </Fab>
        </Container>
      );
    }
  }
}
