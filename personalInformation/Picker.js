import React from 'react';
import {View, Text, StyleSheet, Dimensions, TextInput} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const Picker = ({
  label,
  required,
  items,
  value,
  modifiable,
  onChangeText,
  placeholder,
}) => {
  return (
    <View style={styles.section}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={{color: 'red'}}>*</Text>}
      </Text>
      <RNPickerSelect
        style={{viewContainer: {justifyContent: 'center'}}}
        items={items}
        onValueChange={onChangeText}
        value={value}
        placeholder={placeholder}>
        <TextInput
          value={value}
          editable={modifiable}
          onChangeText={onChangeText}
          style={styles.textInput}
        />
        <View style={styles.icon} />
      </RNPickerSelect>
    </View>
  );
};

var {height, width} = Dimensions.get('window');

var styles = StyleSheet.create({
  label: {
    fontSize: 16,
    flexWrap: 'wrap',
  },
  textInput: {
    height: 35,
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
    height: 50,
    paddingRight: width * 0.05,
    paddingLeft: width * 0.05,
  },
  icon: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderTopWidth: 10,
    borderTopColor: 'black',
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
    width: 0,
    height: 0,
    top: 12.5,
    right: 10,
  },
});

export default Picker;
