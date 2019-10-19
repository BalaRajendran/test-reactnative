import React, { Component } from 'react';
import Share from 'react-native-share';
import {
  Modal,
  StatusBar,
  ActivityIndicator,
  ScrollView,
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import ImageView from 'react-native-image-view';
import { Button } from 'native-base';
import axios from 'axios';
import Header from './../Components/Header';
import Dimensions from 'Dimensions';
import { LineChart, BarChart } from 'react-native-chart-kit';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchingResult: "false",
      overallImage: '',
      name1: '',
      name2: '',
      sentimentalReport: [],
      maxchat: '',
      minchat: '',
      totalword: '',
      startdate: '',
      enddate: '',
      isImageViewVisible: false,
      date: "",
      mediaCount: [],
      maxChatListCount: [],
      maxChatListDate: [],
      minChatListCount: [],
      minChatListDate: [],
    };
  }
  async componentDidMount() {
    const links = await AsyncStorage.getItem('links')
    let pattern = /\d{2}\/\d{2}\/\d{2}/g;
    let date = this.props.navigation.state.params.text.match(pattern);
    if (date == null) {
      date[0] = null
      date[1] == null
    }
    this.setState({
      name1: this.props.navigation.state.params.name,
      name2: this.props.navigation.state.params.analysiswith,
      overallImage: this.props.navigation.state.params.imageLink,
      startdate: date[0],
      sentimentalReport: this.props.navigation.state.params.sentimentReport,
      enddate: date[date.length - 1],
    })
    const data = {
      link: this.props.navigation.state.params.textLink
    }
    var _this = this
    axios.post(links.split("@@")[3], data)
      .then(function (response) {
        var unsortedchatcount = response.data.unsortedchatcount.replace("]", "").replace("[", "").replace(" ", "").replace(" ", "").split(",")
        for (var i = 0; i < unsortedchatcount.length; i++) unsortedchatcount[i] = parseInt(unsortedchatcount[i]);

        var unsortedchatdate = response.data.unsortedchatdate.replace("]", "").replace("[", "").split(",")
        for (var i = 0; i < unsortedchatdate.length; i++) unsortedchatdate[i] = unsortedchatdate[i].slice(12, 22);

        var sortedchatcount = response.data.sortedchatcount.replace("]", "").replace("[", "").replace(" ", "").replace(" ", "").split(",")
        for (var i = 0; i < sortedchatcount.length; i++) sortedchatcount[i] = parseInt(sortedchatcount[i]);

        var sortedchatdate = response.data.sortedchatdate.replace("]", "").replace("[", "").split(",")
        for (var i = 0; i < sortedchatdate.length; i++) sortedchatdate[i] = sortedchatdate[i].slice(12, 22);

        _this.setState({
          fetchingResult: "true",
          mediaCount: response.data.media == "0" ? 0 : response.data.media.replace("]", "").replace("[", "").split(","),
          totalword: response.data.totalword,
          maxChatListCount: sortedchatcount,
          maxChatListDate: sortedchatdate,
          minChatListCount: unsortedchatcount,
          minChatListDate: unsortedchatdate,
          maxchat: response.data.sortedchatdate.slice(12, 22),
          minchat: response.data.unsortedchatdate.slice(12, 22),
        })
      })
      .catch(function (error) {
        console.log(error);
        _this.setState({
          fetchingResult: "failed",
        })
      });
  }
  handlePicture = () => {
    this.setState({
      isImageViewVisible: true,
    });
  };
  handleShare = () => {
    const fs = RNFetchBlob.fs;
    let imagePath = null;
    RNFetchBlob.config({
      fileCache: true,
    })
      .fetch('GET', this.state.overallImage)
      .then(resp => {
        imagePath = resp.path();
        return resp.readFile('base64');
      })
      .then(base64Data => {
        var message =
          this.state.name1 +
          'analyse with ' +
          this.state.name2 +
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
  render() {
    const images = [
      {
        source: {
          uri: this.state.overallImage,
        },
        title: 'Paris',
        width: 806,
      },
    ];

    if (this.state.fetchingResult == "false") {
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
        <ScrollView>
          <View style={styles.container}>
            {console.log(this.state)}
            <Header onhandlePopup={this.handlePopup} {...this.props} />
            <View style={styles.topContainer}>
              <Text style={styles.textStyle}>
                💘 Chaters Name
              <Text style={styles.totalChatNumber}>
                  {' '}
                  {this.state.name1} & {this.state.name2}
                </Text>
              </Text>
            </View>
            <View style={styles.topContainer}>
              <Text style={styles.textStyle}>
                💘 Total Number Chat Between {this.state.name1} and{' '}
                {this.state.name2}
                <Text style={styles.totalChatNumber}> 1029</Text>
              </Text>
            </View>
            <View style={styles.topContainer}>
              <Text style={styles.textStyle}>
                💘 Maximum Chat on 😍{this.state.maxchat}😍
            </Text>
            </View>
            <View style={styles.topContainer}>
              <Text style={styles.textStyle}>
                💘 Lowest Chat on 😲{this.state.minchat}😲
            </Text>
            </View>
            <View style={styles.topContainer}>
              <Text style={styles.textStyle}>
                💘 Total Number Of Words 😍{this.state.totalword}😍
            </Text>
            </View>
            <View style={styles.topContainer}>
              <Text style={styles.textStyle}>
                💘 Starting Date 😍{this.state.startdate}😍
            </Text>
            </View>
            <View style={styles.topContainer}>
              <Text style={styles.textStyle}>
                💘 Starting Date 😍{this.state.enddate}😍
            </Text>
            </View>
            <View>
              <LineChart
                data={{
                  labels: this.state.maxChatListDate,
                  datasets: [
                    {
                      data: this.state.maxChatListCount,
                    },
                  ],
                }}
                width={Dimensions.get('window').width}
                height={220}
                yAxisLabel={''}
                chartConfig={{
                  backgroundColor: '#e26a00',
                  backgroundGradientFrom: '#fb8c00',
                  backgroundGradientTo: '#ffa726',
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
              <Text style={styles.totalChatNumber1}>Highest chats with date</Text>
            </View>
            {this.state.minChatListDate == 2 && (
              <View>
                <BarChart
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                  }}
                  data={{
                    labels: this.state.minChatListDate,
                    datasets: [
                      {
                        data: this.state.minChatListCount,
                      },
                    ],
                  }}
                  width={Dimensions.get('window').width}
                  height={220}
                  yAxisLabel={''}
                  chartConfig={{
                    backgroundColor: '#e26a00',
                    backgroundGradientFrom: '#fb8c00',
                    backgroundGradientTo: '#ffa726',
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                  }}
                />
                <Text style={styles.totalChatNumber1}>Lowest chats with date</Text>
              </View>
            )}
            {this.state.mediaCount.length == 2 && (
              <View style={{ flex: 1 }}>
                <LineChart
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                  }}
                  data={{
                    labels: [
                      this.state.name1,
                      this.state.name2,
                    ],
                    datasets: [
                      {
                        data: [
                          parseInt(this.state.mediaCount[0]),
                          parseInt(this.state.mediaCount[1])
                        ],
                      },
                    ],
                  }}
                  width={Dimensions.get('window').width}
                  height={220}
                  yAxisLabel={''}
                  chartConfig={{
                    backgroundColor: '#e26a00',
                    backgroundGradientFrom: '#fb8c00',
                    backgroundGradientTo: '#ffa726',
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                  }}
                />
                <Text style={styles.totalChatNumber1}>
                  Media Send by yours
            </Text>
              </View>
            )}
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={this.handlePicture}>
                <View>
                  <BarChart
                    style={{
                      marginVertical: 8,
                      borderRadius: 16,
                    }}
                    data={{
                      labels: [
                        'Anger',
                        'Fear',
                        'Negative',
                        'Positive',
                        'Sadness',
                        'Trust'
                      ],
                      datasets: [
                        {
                          data: [
                            parseInt(this.state.sentimentalReport['anger']),
                            parseInt(this.state.sentimentalReport['fear']),
                            parseInt(this.state.sentimentalReport['negative']),
                            parseInt(this.state.sentimentalReport['positive']),
                            parseInt(this.state.sentimentalReport['sadness']),
                            parseInt(this.state.sentimentalReport['trust'])
                          ],
                        },
                      ],
                    }}
                    width={Dimensions.get('window').width}
                    height={220}
                    yAxisLabel={''}
                    chartConfig={{
                      backgroundColor: '#e26a00',
                      backgroundGradientFrom: '#fb8c00',
                      backgroundGradientTo: '#ffa726',
                      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      style: {
                        borderRadius: 16,
                      },
                    }}
                  />
                </View>
              </TouchableOpacity>
              <Text style={styles.totalChatNumber1}>
                Overall Chart Sentimental Analysis
            </Text>
            </View>
            <Button style={{ marginBottom: 5 }} block success>
              <Text>Save to Gallery</Text>
            </Button>
            <Button block info onPress={() =>
              this.handleShare
            }>
              <Text>Share to your friends</Text>
            </Button>
          </View>

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
        </ScrollView >
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#455a64',
    flex: 1,
  },
  chatContainer: {
    marginTop: 200,
  },
  chatBody1: {
    top: 40,
    // justifyContent: 'center',
    alignItems: 'center',
    // alignContent: 'stretch',
  },
  chatBody2: {
    borderRadius: 10,
    width: DEVICE_WIDTH - 40,
    backgroundColor: '#fff',
    // height: 80,
    color: '#000',
  },
  topContainer: {
    top: 10,
    marginBottom: 10,
  },
  totalChatNumber: {
    // textAlign: 'center',
    // alignSelf: 'stretch',
    fontSize: 30,
    color: '#fff',
  },
  totalChatNumber1: {
    textAlign: 'center',
    alignSelf: 'stretch',
    fontSize: 19,
    color: '#fff',
  },
  textStyle: {
    color: '#fff',
    fontSize: 20,
    left: 15,
  },
  textStyle1: {
    color: '#000',
    fontSize: 20,
    left: 15,
  },
});
