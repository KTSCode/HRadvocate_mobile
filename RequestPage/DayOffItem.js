import React, {Component} from 'react';
import {View, Text, Dimensions, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import TimePicker from '../commonComponents/TimePicker';
import Picker from '../personalInformation/Picker';

class DayOffItem extends Component {

  state = {startTime: this.props.startTime, endTime: this.props.endTime, open: false};

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this.setState({open: !this.state.open})}>
        <View>
          <View style={styles.sectionContainer}>
            <Text style={styles.dateText}>{this.props.date}</Text>
            <Text style={styles.hoursText}>{this.props.hours} hours</Text>
          </View>
          {this.props.work && this.state.open &&
            <View>
              <View style={styles.sectionContainer}>
                <TimePicker
                  value={this.state.startTime}
                  label="From"
                  required={true}
                  minTime={this.props.startTime}
                  maxTime={this.state.endTime}
                  onChangeText={startTime => this.setState({startTime})}
                />
                <TimePicker
                  value={this.state.endTime}
                  label="To"
                  required={true}
                  minTime={this.state.startTime}
                  maxTime={this.props.endTime}
                  onChangeText={endTime => this.setState({endTime})}
                />
              </View>
              <View style={styles.sectionContainer}>
                <Picker
                  label="Time Off Type"
                  value={this.state.type}
                  required={true}
                  modifiable={true}
                  placeholder={{
                    label: 'Select a time off type...',
                    value: ''}}
                  items={[
                    {
                      label: 'PTO (' + '2r' + ' hours available)',
                      value: 'PTO',
                    },
                    {
                      label: 'Sick Day (' + '8r' + ' hours available)',
                      value: 'Sick Day',
                    },
                    {
                      label: 'Floating Holiday (' + '3r' + ' hours available)',
                      value: 'Floating Holiday',
                    },

                  ]}
                  onChangeText={type => this.setState({type})}
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
    height: height * .05,
    borderBottomWidth: 1,
    borderColor: '#DFDFDF',
    paddingLeft: width * .05,
    paddingRight: width * .05,
  },

  dateText: {
    fontSize: 16,
  },
  hoursText: {
    fontSize: 16,
  },
});

export default DayOffItem;
