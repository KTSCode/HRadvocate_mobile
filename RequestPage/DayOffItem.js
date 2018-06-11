import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import TimePicker from '../commonComponents/TimePicker';
import moment from 'moment';

class DayOffItem extends Component {

  //original times are meant to distinguish original scheduled times from
  //updated hours that the user has selected
  //these are used so that the user cannot go past this range when
  //selecting the hours for that day
  //the open and bordeColor keys are used to display additional
  //information when component is clicked
  //by default, the time range pickers are not displayed to the user
  //user must click on component to see these

  state = {
    dateObject: this.props.dateObject,
    date: this.props.date,
    startTime: this.props.startTime,
    endTime: this.props.endTime,
    originalStartTime: this.props.originalStartTime,
    originalEndTime: this.props.originalEndTime,
    hours: this.props.hours,
    open: false,
    borderColor: '#DFDFDF',
  };

//get new hours from start and end times
  getHours() {
    var startAMPM = this.state.startTime.slice(-2, -1).toLowerCase();
    var endAMPM = this.state.endTime.slice(-2, -1).toLowerCase();
    var startTime = moment(this.state.startTime, 'hh:mm ' + startAMPM);
    var endTime = moment(this.state.endTime, 'hh:mm ' + endAMPM);
    var duration = moment.duration(endTime.diff(startTime));
    var hours = parseInt(duration.asMinutes()) / 60;
    if (hours < 0) {
      hours = hours + 12;
    }
    return hours;
  }

  //is called when the hour range is updates in order to update the hours
  //and start and end times for a particular day
  updateParentState() {
    var newDateObject = {
      date: moment(this.state.date, 'MM-DD-YYYY').format('MM-DD-YYYY'),
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      hours: this.getHours(),
      originalStartTime: this.state.originalStartTime,
      originalEndTime: this.state.originalEndTime,
    };
    this.props.updateParentState(this.state.dateObject, newDateObject);
    this.setState({dateObject: newDateObject});
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => {
          this.setState({open: !this.state.open});
          if(!this.state.open && this.state.borderColor === '#DFDFDF'){
            this.setState({borderColor: 'white'})
          }else{
            this.setState({borderColor: '#DFDFDF'})
          }
        }}>
        <View>
          {this.props.work &&
            <View style={[styles.sectionContainer, {borderColor: this.state.borderColor}]}>
              <Text style={styles.dateText}>{moment(this.state.date, 'MM-DD-YYYY').format('dddd, MMMM Do')}</Text>
              <Text style={styles.hoursText}>{this.props.hours} hours</Text>
            </View>
          }
          {!this.props.work &&
            <View style={styles.sectionContainer}>
              <Text style={[styles.dateText,{color: '#BCBBBC'}]}>{moment(this.state.date, 'MM-DD-YYYY').format('dddd, MMMM Do')}</Text>
              <Text style={[styles.hoursText,{color: '#BCBBBC'}]}>{this.props.hours} hours</Text>
            </View>
          }
          {this.props.work && this.state.open &&
            <View>
              <View style={styles.timeSectionContainer}>
                <TimePicker
                  value={this.state.startTime}
                  label="From"
                  required={true}
                  minTime={this.props.originalStartTime}
                  maxTime={this.state.endTime}
                  onChangeText={startTime => this.setState({startTime}, () => this.updateParentState())}
                />
                <TimePicker
                  value={this.state.endTime}
                  label="To"
                  required={true}
                  minTime={this.state.startTime}
                  maxTime={this.props.originalEndTime}
                  onChangeText={endTime => this.setState({endTime}, () => this.updateParentState())}
                />
              </View>
            </View>
          }
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width,
    height: height * 0.07,
    borderBottomWidth: 1,
    borderColor: '#DFDFDF',
    paddingLeft: width * 0.05,
    paddingRight: width * 0.05,
  },
  timeSectionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: width,
    height: height * 0.07,
    borderBottomWidth: 1,
    borderColor: '#DFDFDF',
  },
  dateText: {
    fontSize: 16,
  },
  hoursText: {
    fontSize: 16,
  },
});

export default DayOffItem;
