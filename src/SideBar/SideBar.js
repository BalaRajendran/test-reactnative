import React, {Component} from 'react';
import {Image} from 'react-native';
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Segment,
  Body,
  Left,
  Right,
  Badge,
} from 'native-base';
import styles from './style';
const datas = [
  {
    name: 'Home',
    route: 'Home',
    icon: 'phone-portrait',
    bg: '#C5F442',
  },
  {
    name: 'Rate Us',
    route: 'Rateus',
    icon: 'arrow-down',
    bg: '#477EEA',
  },
  {
    name: 'Share',
    route: 'Share',
    icon: 'share',
    bg: '#DA4437',
  },
  {
    name: 'How to use ?',
    route: 'HowToUse',
    icon: 'list',
    bg: '#DA4437',
  },
];

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4,
    };
  }

  render() {
    return (
      <Container>
        <Content
          bounces={false}
          style={{flex: 1, backgroundColor: '#fff', top: -1}}>
          <Image
            source={{
              uri:
                'data:image/png;base64,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',
            }}
            style={styles.drawerCover}
          />
          <Image
            square
            style={styles.drawerImage}
            source={{
              uri:
                'https://raw.githubusercontent.com/GeekyAnts/NativeBase-KitchenSink/master/assets/logo.png',
            }}
          />
          <List
            dataArray={datas}
            renderRow={data => (
              <ListItem
                button
                onPress={() => this.props.navigation.navigate(data.route)}>
                <Left>
                  <Icon
                    active
                    name={data.icon}
                    style={{
                      color: '#B53F8F',
                      fontSize: 26,
                      width: 30,
                    }}
                  />
                  <Text
                    style={{
                      color: '#B53F8F',
                      fontWeight: Platform.OS === 'ios' ? '500' : '400',
                      fontSize: 16,
                      marginLeft: 20,
                    }}>
                    {data.name}
                  </Text>
                </Left>
              </ListItem>
            )}
          />
          <Body>
            <Text style={styles.versionStyle}>Version 1.0</Text>
          </Body>
        </Content>
      </Container>
    );
  }
}

export default SideBar;
