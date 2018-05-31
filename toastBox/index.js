import React from 'react';
var {StyleSheet, View, Text, Image, Dimensions} = require('react-native');
import {Card} from 'react-native-material-ui';

const ToastBox = props => {
  const icons = {
    error: require('../images/error.png'),
    info: require('../images/info.png'),
  };
  // TODO rename styles to be generic
  // TODO remove inline styles
  return (
    <View style={{alignSelf: 'stretch'}}>
      <Card>
        <View style={[styles.Error, {borderColor: props.color}]}>
          <View style={{paddingRight: 15}}>
            <Image source={icons[props.icon]} style={{height: 40, width: 40}} />
          </View>
          <View style={{justifyContent: 'center'}}>
            <Text style={[styles.ErrorText, {color: props.color}]}>
              {props.title}
            </Text>
            {props.text && (
              <Text style={styles.ErrorCaption}>{props.text}</Text>
            )}
          </View>
        </View>
      </Card>
    </View>
  );
};

var {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  Error: {
    flexDirection: 'row',
    padding: 10,
    alignSelf: 'stretch',
    margin: 0,
    borderWidth: 2,
  },
  ErrorText: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#EE3E4B',
  },
  ErrorCaption: {
    fontSize: 14,
    textAlign: 'center',
  },
});
export default ToastBox;
