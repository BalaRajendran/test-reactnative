import React, {Component} from 'react';
import IconNG from 'react-native-vector-icons/FontAwesome';
import {Header, Left, Body, Title, Button, Right, Icon} from 'native-base';

export default class HeaderClass extends Component {
  render() {
    const name = this.props.navigation.state.routeName;
    return (
      <Header style={{backgroundColor: '#B53F8F'}}>
        <Left>
          {name == 'Home' ? (
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('DrawerOpen')}>
              <Icon name="menu" />
            </Button>
          ) : (
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('Home')}>
              <Icon name="arrow-back" />
            </Button>
          )}
        </Left>
        <Body>
          <Title>Text Analysis</Title>
        </Body>
        {name == 'Home' ? (
          <Right>
            <Button transparent onPress={this.props.onhandlePopup}>
              <IconNG
                name="question-circle"
                size={27}
                style={{color: 'white'}}
              />
            </Button>
          </Right>
        ) : (
          <Right />
        )}
      </Header>
    );
  }
}
