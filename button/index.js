import React from 'react';
var {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} = require('react-native');

const Button = props => {
  const bStyle = props.buttonStyle ? props.buttonStyle : {};
  const tStyle = props.textStyle ? props.textStyle : {};

  return (
    <View style={{alignSelf: 'stretch'}}>
      <TouchableOpacity
        style={[styles.buttonStyle, bStyle]}
        onPress={props.onPress}>
        <Text style={[styles.buttonTextStyle, tStyle]}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  );
};

var {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  buttonStyle: {
    height: 35,
    borderRadius: 4,
    marginLeft: 20,
    marginRight: 20,
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
    backgroundColor: '#5686DA',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  buttonTextStyle: {
    fontSize: width * 0.045,
    color: 'white',
    alignSelf: 'center',
    paddingRight: 20,
    paddingLeft: 20,
  },
});
export default Button;
