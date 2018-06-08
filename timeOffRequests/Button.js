import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Dimensions} from 'react-native';

const Button = ({goTo}) => {
  return(
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={() => goTo('Request Page')}>
        <Text style={styles.buttonText}>Request Time Off</Text>
      </TouchableOpacity>
    </View>
  );
};


var {height, width} = Dimensions.get("window");

var styles = StyleSheet.create({
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
