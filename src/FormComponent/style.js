const React = require('react-native');
const {Platform, Dimensions} = React;
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

export default {
  container: {
    marginTop: 200,
    flex: 1,
    alignItems: 'center',
  },
  welcomecontainer: {
    marginTop: 300,
    flex: 1,
    alignItems: 'center',
  },
  container1: {
    flex: 1,
    // top: -95,
    alignItems: 'center',
    // justifyContent: 'flex-start',
  },
  texthead: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 27,
    backgroundColor: 'transparent',
    marginBottom: 20,
  },
  pickertexk: {
    marginTop: 10,
    color: 'white',
  },
  inlineImg: {
    position: 'absolute',
    zIndex: 99,
    width: 22,
    height: 22,
    right: 13,
    top: 13,
    color: 'white',
  },
  inlineImg1: {
    position: 'absolute',
    zIndex: 99,
    width: 22,
    height: 22,
    right: 35,
    top: 13,
    color: 'white',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F035E0',
    height: MARGIN,
    borderRadius: 20,
    zIndex: 100,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: DEVICE_WIDTH - 40,
    marginHorizontal: 20,
    paddingLeft: 45,
    borderRadius: 20,
    marginBottom: 30,
    color: '#ffffff',
  },
  picker: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: DEVICE_WIDTH - 40,
    height: 40,
    marginHorizontal: 20,
    paddingLeft: 45,
    borderRadius: 20,
    marginBottom: 30,
    color: '#ffffff',
  },
  circle: {
    height: MARGIN,
    width: MARGIN,
    marginTop: -MARGIN,
    borderWidth: 1,
    borderColor: '#F035E0',
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 99,
    backgroundColor: '#F035E0',
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  image: {
    width: 24,
    height: 24,
  },
};
