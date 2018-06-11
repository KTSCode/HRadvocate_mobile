import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import moment from 'moment';
import {requestUpdate, hoursUpdate} from './actions';
import MyDatePicker from '../commonComponents/DatePicker';
import Picker from '../commonComponents/Picker';
import HeaderBar from '../headerBar/index';
import SectionHeader from '../sectionHeader/index';
import SubHeader from '../commonComponents/SubHeader';
import DayOffItem from './DayOffItem';
import Input from '../commonComponents/Input';

class RequestPage extends Component {
  state = {
    status: 'pending',
    note: '',
    requestedOn: '',
    startDate: '',
    endDate: '',
    hours: 0,
    type: '',
    startDateMin: moment().add(1, 'days').format('MM-DD-YYYY'),
    endDateMin: moment().add(1, 'days').format('MM-DD-YYYY'),
    startDateMax: '',
    dateArray: [],
  };

  submit() {
    if (!this.state.type || !this.state.startDate || !this.state.endDate) {
      console.log('Missing Fields!');
      return;
    }
    if(this.state.hours === 0) {
      console.log('No hours requested!');
      return;
    }

    var type = this.state.type[0].toLowerCase();
    var {typeName, objectName, typeObject} = this.getTypeInfo(type);

    if (typeObject.available >= this.state.hours) {
      var request = {
        status: this.state.status,
        note: this.state.note,
        requestedOn: moment().format('MM-DD-YYYY'),
        startDate: moment(this.state.startDate, 'MM-DD-YYYY').format('MM-DD-YYYY'),
        endDate: moment(this.state.endDate, 'MM-DD-YYYY').format('MM-DD-YYYY'),
        type: typeName,
        hours: this.state.hours,
      };

      var newBalances = {
        available: typeObject.available - this.state.hours,
        pending: typeObject.pending + this.state.hours,
        approved:typeObject.approved,
        used: typeObject.used,
      }

      this.props.requestUpdate(request);
      this.props.hoursUpdate({prop: objectName, value: newBalances})
      this.props.navigation.navigate('Time Off');

    }
  }

  getTypeInfo(type) {
    var typeName;
    var objectName;
    var typeObject;

    switch (type) {
      case 'p': {
        typeName = 'Paid Time Off';
        objectName = 'PTO';
        typeObject = this.props.PTO;
        return {typeName, objectName, typeObject};
      }
      case 's': {
        typeName = 'Sick Day';
        objectName = 'sickDay';
        typeObject = this.props.sickDay;
        return {typeName, objectName, typeObject};
      }
      case 'f': {
        typeName = 'Floating Holiday';
        objectName = 'floatingHoliday';
        typeObject = this.props.floatingHoliday;
        return {typeName, objectName, typeObject};
      }
    }
  }

  getDateObject(currentDate) {
    var date = moment(currentDate, 'MM-DD-YYYY').format('MM-DD-YYYY');
    var dayofTheWeekIndex = this.getDayOfTheWeekIndeces(
      moment(currentDate, 'MM-DD-YYYY').format('dddd'));
    var shiftDay = this.props.schedule[dayofTheWeekIndex];
    var hours = 0;
    if (shiftDay.work) {
      hours = this.getShiftHours(shiftDay);
    }
    return {
      date,
      hours,
      startTime: shiftDay.start,
      endTime: shiftDay.end,
      originalStartTime: shiftDay.start,
      originalEndTime: shiftDay.end,
    };
  }

  updateDateArray() {
    if (this.state.startDate !== '' && this.state.endDate !== '') {
      var dateArray = [];
      var hours = 0;
      var currentDate = this.state.startDate;
      var stopDate = this.state.endDate;
      while (currentDate <= stopDate) {
        var dateObject = this.state.dateArray.find(function(element) {
          return element.date === currentDate;
        })
        if (typeof dateObject === 'undefined'){
          dateObject = this.getDateObject(currentDate);
        }
        hours += dateObject.hours;
        dateArray.push(dateObject);
        currentDate = moment(currentDate, 'MM-DD-YYYY')
          .add(1, 'days').format('MM-DD-YYYY');
      }
      this.setState({dateArray, hours});
    }
  }

  updateParentState(dateObject, newDateObject) {
    var index = this.state.dateArray.indexOf(dateObject);
    this.state.dateArray[index] = newDateObject;
    this.updateDateArray();
  }

  getDayOfTheWeekIndeces(dayOfTheWeek) {
    const dayofTheWeekIndeces = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };
    return dayofTheWeekIndeces[dayOfTheWeek];
  }

  getShiftHours(shiftDay) {
    var startAMPM = shiftDay.start.slice(-2, -1).toLowerCase();
    var endAMPM = shiftDay.end.slice(-2, -1).toLowerCase();
    var startTime = moment(shiftDay.start, 'hh:mm ' + startAMPM);
    var endTime = moment(shiftDay.end, 'hh:mm ' + endAMPM);
    var duration = moment.duration(endTime.diff(startTime));
    var hours = parseInt(duration.asMinutes()) / 60;
    if (hours < 0) {
      hours = hours + 12;
    }
    return hours;
  }

  renderDateItems() {
    return this.state.dateArray.map(dateObject => {
      return (
        <DayOffItem
          work={!(dateObject.hours === 0)}
          key={dateObject.date}
          date={dateObject.date}
          startTime={dateObject.startTime}
          endTime={dateObject.endTime}
          originalStartTime={dateObject.originalStartTime}
          originalEndTime={dateObject.originalEndTime}
          hours={dateObject.hours}
          dateObject={dateObject}
          updateParentState={this.updateParentState.bind(this)}
        />
      );
    });
  }

  render() {
    return(
      <View style={{ flex: 1 }}>
        <HeaderBar
          navigation={this.props.navigation}
          company={this.props.screenProps.company.data.name}
          newNotificationCount={
            this.props.screenProps.employee.data.newNotifications.length
          }
        />
        <SectionHeader title="Time Off" top="true" />
        <SubHeader title="Create Request" />
        <View style={{paddingTop: 10, paddingBottom: 10}}>
        <MyDatePicker
          label="Start Date"
          value={this.state.startDate}
          required={true}
          modifiable={true}
          onChangeText={startDate => {
            this.setState({startDate}, () => this.updateDateArray());
            this.setState({endDateMin: startDate});
          }}
          minDate={this.state.startDateMin}
          maxDate={this.state.startDateMax}
        />
        <MyDatePicker
          label="End Date"
          value={this.state.endDate}
          required={true}
          modifiable={true}
          onChangeText={endDate => {
            this.setState({endDate}, () => this.updateDateArray());
            this.setState({startDateMax: endDate});
          }}
          minDate={this.state.endDateMin}
        />
        <Picker
          label="Type"
          value={this.state.type}
          required={true}
          modifiable={true}
          placeholder={{
            label: 'Select a time off type...',
            value: ''}}
          items={[
            {
              label: 'PTO (' + this.props.PTO.available + ' hours available)',
              value: 'PTO (' + this.props.PTO.available + ' hours)',
            },
            {
              label: 'Sick Day (' + this.props.sickDay.available + ' hours available)',
              value: 'Sick Day (' + this.props.sickDay.available + ' hours)',
            },
            {
              label: 'Floating Holiday (' + this.props.floatingHoliday.available + ' hours available)',
              value: 'Floating Holiday (' + this.props.floatingHoliday.available + ' hours)',
            },

          ]}
          onChangeText={type => this.setState({type})}
        />
        <Input
          label="Reason"
          value={this.state.note}
          onChangeText={note => this.setState({note})}
          required={false}
          modifiable={true}
        />
        </View>
        <SubHeader
          title="Amount"
          rightText={'Total: ' + this.state.hours + ' hours'}
        />
        <ScrollView>{this.renderDateItems()}</ScrollView>
        <View style={styles.buttonsView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Time Off')}>
            <Text style={styles.buttonText}> Cancel </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button,{backgroundColor: '#339933'}]}
            onPress={()=> this.submit()}>
            <Text style={styles.buttonText}> Submit </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

var {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  buttonsView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
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
})

const mapStateToProps = state => {
  const {shifts, timeOffRequests, schedule} = state.employee.data;
  const {floatingHoliday, PTO, sickDay} = state.employee.data.timeOffBalances;

  return {shifts, timeOffRequests, schedule, floatingHoliday, PTO, sickDay};
};

export default connect(mapStateToProps, {requestUpdate, hoursUpdate})(RequestPage);
