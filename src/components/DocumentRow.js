import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, Text, Thumbnail, Button, ListItem, Left, Body} from 'native-base';

import {SwipeRow} from 'react-native-swipe-list-view';
import moment from 'moment';

export default class DocumentRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      vigenceDate: this.remainTime(this.props.item.vigencia),
    };
  }
  remainTime(value) {
    let now = moment();
    //let timeDiff = moment(value).utcOffset(120).endOf('day');
    //var a = moment([2008, 9]);
    let b = moment(value);
    let c = b.diff(now, 'days');
    console.log('Time DIIF', c);
    //let dur = moment.duration(timeDiff);
    //moment.format("MMM Do YY")
    //moment.duration(timeDiff, "days").humanize();
    return c;
  }

  render() {
    console.log("PROPS-Button",this.props)
    return (
      <SwipeRow leftOpenValue={0} rightOpenValue={-70}>
        <View style={styles.standaloneRowBack}>
          <Button style={styles.standaloneRowBackButton}>
            <Icon
              type="Feather"
              active
              name="share-2"
              style={styles.backTextWhite}
            />
          </Button>
        </View>
        <View style={styles.standaloneRowFront}>
          <ListItem
            onPress={() =>
              this.props.callback(['documents', this.props.item])
            }>
            <Body>
              <Text >Official Document</Text>
            </Body>
          </ListItem>
        </View>
      </SwipeRow>
    );
  }
}
const styles = StyleSheet.create({
  standaloneRowFront: {
    backgroundColor: '#fff',
    height: 90,
  },
  standaloneRowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  standaloneRowBackButton: {
    backgroundColor: '#FF2D2D',
    width: 70,
    height: 90,
    paddingLeft: 5,
  },
  backTextWhite: {
    color: '#FFF',
  },
});