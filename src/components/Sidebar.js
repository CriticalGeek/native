import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Thumbnail,
  Body,
} from 'native-base';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Content bounces={false} style={styles.content}>
          <List style={styles.list}>
            <ListItem thumbnail style={styles.listavatar}>
              <Left>
                <Thumbnail
                  source={{
                    uri:
                      'data:image/jpeg;base64,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',
                  }}
                />
              </Left>
              <Body>
                <Text note style={styles.white}>
                  Company name
                </Text>
                <Text style={styles.white}>Jhon Connor</Text>
              </Body>
            </ListItem>
            <ListItem
              button
              noBorder
              style={styles.listitem}
              onPress={() => this.props.navigation.navigate('Companies')}>
              <Left>
                <Icon
                  type="Feather"
                  active
                  name="briefcase"
                  style={styles.icon}
                />
                <Text>Companies in plant</Text>
              </Left>
            </ListItem>
            <ListItem
              button
              noBorder
              style={styles.listitem}
              onPress={() => this.props.navigation.navigate('Qr')}>
              <Left>
                <Icon type="Feather" active name="clock" style={styles.icon} />
                <Text>Contractor entry and exit</Text>
              </Left>
            </ListItem>
            <ListItem
              button
              noBorder
              style={styles.listitem}
              onPress={() => this.props.navigation.navigate('Qr')}>
              <Left>
                <Icon
                  type="Feather"
                  active
                  name="alert-triangle"
                  style={styles.icon}
                />
                <Text>Report an incident</Text>
              </Left>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#fff',
    position: 'relative',
    flex: 1,
    top: 0,
    marginLeft: -18,
  },
  list: {
    width: '100%',
  },
  listitem: {
    padding: 20,
  },
  listavatar: {
    padding: 20,
    backgroundColor: '#000',
  },
  white: {
    color: '#fff',
  },
  icon: {
    color: '#777',
    fontSize: 26,
    width: 30,
    marginRight: 24,
  },
});
