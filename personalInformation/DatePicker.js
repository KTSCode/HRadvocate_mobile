import React from 'react';
import {Text, View, Dimensions, StyleSheet} from 'react-native';
import DatePicker from 'react-native-datepicker';

const MyDatePicker = ({value, label, required, onChangeText}) => {
  const {textInput, labelStyle, section} = styles;

    return (
      <View style={section}>
        <Text style={labelStyle}>
          {label}
          {required && <Text style={{color: 'red'}}>*</Text>}
        </Text>
        <DatePicker
          style={textInput}
          date={value}
          mode="date"
          placeholder="select date"
          format="MM-DD-YYYY"
          minDate="01-01-1990"
          maxDate="12-31-2018"
          confirmBtnText="Done"
          cancelBtnText="Cancel"
          customStyles={{
            dateTouchBody: {
            height: 35,
          },
           dateIcon: {
             width: 25,
             height: 25,
             marginRight: 6
           },
           dateInput: {
             height: 35,
             borderWidth: 0,
             alignItems: 'flex-start',
           },
           dateText: {
            color: 'black',
            fontSize: 16,
          },
          }}
          onDateChange={onChangeText}
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
    height: 35,
    width: width * 0.6,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 2,
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
});

export default MyDatePicker;
