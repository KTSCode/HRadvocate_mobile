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
  const button_color = props.disabled ? {backgroundColor: '#9B9B9B'} : {};
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={[styles.button, bStyle, button_color]}
        onPress={props.onPress}
        disabled={props.disabled ? true : false}>
        <Text style={[styles.buttonText, tStyle]}>{props.text}</Text>
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

  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.1,
    padding: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#1E98C7',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.95,
    height: 32,

  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
export default Button;
