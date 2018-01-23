import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

import { FormLabel, FormInput } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Requst Time Off',
  };
  constructor(props){
    super(props)
    this.state = {date:"2016-05-15"}
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <FormLabel>Name</FormLabel>
        <FormInput />
        <FormLabel>Reason</FormLabel>
        <FormInput />
        <FormLabel>Date</FormLabel>
        <DatePicker
          style={styles.date}
          date={this.state.date}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate="2016-05-01"
          maxDate="2016-06-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateInput: {
              marginLeft: 30
            }
            // ... You can check the source to find the other keys.
          }}
          onDateChange={(date) => {this.setState({date: date})}}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#FFF',
  },
  date: {
    width: 350,
    marginTop:20,
  }
});
