import React, {Component} from 'react';
import {View, Text} from 'react-native';
import DatePicker from '../commonComponents/DatePicker';

class RequestPage extends Component {
  state = {
    status: '',
    note: '',
    requestedOn: '',
    startDate: '',
    endDate: '',
    hours: '',
  };

  render(){
    return(
      <DatePicker
        value={this.state.startDate}
        onChangeText={value => console.log(value)}
      />
    );
  }
}

export default RequestPage;
