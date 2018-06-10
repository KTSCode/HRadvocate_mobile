import React from 'react';
import {Text, View, Dimensions, StyleSheet} from 'react-native';
import DatePicker from 'react-native-datepicker';

const TimePicker = ({value, label, required, onChangeText, minTime, maxTime, onCloseModal}) => {
  return (
    <View style={styles.section}>
      <Text style={styles.labelStyle}>
        {label}
        {required && <Text style={{color: 'red'}}>*</Text>}
      </Text>
      <DatePicker
        style={styles.textInput}
        date={value}
        mode="time"
        placeholder="select time"
        format="hh:mm a"
        minDate={minTime}
        maxDate={maxTime}
        confirmBtnText="Done"
        cancelBtnText="Cancel"
        showIcon={false}
        is24Hour={false}
        customStyles={{
          dateTouchBody: {
            height: 35,
          },
          // dateIcon: {
          //   width: 25,
          //   height: 25,
          //   marginRight: 6,
          // },
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
        onCloseModal={onCloseModal}
      />
    </View>
  );
};

var {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 16,
    flexWrap: 'wrap',
  },
  textInput: {
    height: 35,
    width: 100,
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

export default TimePicker;
