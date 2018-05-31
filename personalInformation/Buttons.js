import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Dimensions} from 'react-native';

const Buttons = () => {
  const {buttonsView, button, buttonText} = styles;
  return(
    <View style={buttonsView}>
      <TouchableOpacity style={button}>
        <Text style={buttonText}> Cancel </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[button,{backgroundColor: '#339933'}]}>
        <Text style={buttonText}> Save </Text>
      </TouchableOpacity>
    </View>
  );
};

var {height, width} = Dimensions.get('window');
var styles = StyleSheet.create({
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  buttonsView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5
  },
  button: {
    width: width * 0.3,
    borderRadius: 4,
    margin: 5,
    height: 35,
    backgroundColor: '#3F4952',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Buttons;
