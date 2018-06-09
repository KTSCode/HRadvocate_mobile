import React from 'react';
import {TextInput, Text, View, StyleSheet,Dimensions} from 'react-native';

const Input = ({
  label,
  value,
  onChangeText,
  secureTextEntry,
  required,
  modifiable}) => {
  const {textInput, labelStyle, section} = styles;
  return (
    <View style={section}>
      <Text style={labelStyle}>
        {label}
        {required && <Text style={{color: 'red'}}>*</Text>}
      </Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        autoCorrect={false}
        style={textInput}
        value={value}
        editable={modifiable}
        onChangeText={onChangeText}
        multiline={true}
        numberOfLines={4}
      />
    </View>
  );
};

var {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 16,
    flexWrap: 'wrap',
  },
  textInput: {
    //height: 35,
    width: width * 0.6,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 2,
    fontSize: 16,
    marginLeft: 10,
    paddingLeft: 10,
    alignSelf: 'center',
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    //height: 50,
    paddingRight: width * 0.05,
    paddingLeft: width * 0.05,
    zIndex:0,
  },
});

export default Input;
