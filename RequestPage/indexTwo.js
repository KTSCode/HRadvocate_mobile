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
import Picker from '../personalInformation/Picker';
import HeaderBar from '../headerBar/index';
import SectionHeader from '../sectionHeader/index';
import SubHeader from '../commonComponents/SubHeader';
import DayOffItem from './DayOffItem';

class RequestPage extends Component {
  state = {
    status: 'pending',
    note: '',
    requestedOn: '',
    startDate: '',
    endDate: '',
    hours: '0',
    type: '',
    minDateStart: moment().add(1,'days').format('MM-DD-YYYY'),
    maxDateStart: moment().add(1,'days').format('MM-DD-YYYY'),
    dateArray: [],
  };

  submit() {
    if(! this.state.type){
      return;
    }
    var typeName = this.state.type[0].toLowerCase();
    var typeObject;
    var objectName;
    switch (typeName) {
      case 'p': {
        typeName= 'PTO';
        objectName ='PTO';
        typeObject = this.props.PTO;
        break;
      }
      case 's': {
        typeName= 'Sick Day';
        objectName ='sickDay';
        typeObject = this.props.sickDay;
        break;
      }
      case 'f': {
        typeName= 'Floating Holiday';
        objectName ='floatingHoliday';
        typeObject = this.props.floatingHoliday;
        break;
      }
    }

    if (typeObject.available >= this.state.hours) {
      var request = {
        status: this.state.status,
        note: '',
        requestedOn: moment().format('MM-DD-YYYY'),
        startDate: moment(this.state.startDate,'MM-DD-YYYY').format('MM-DD-YYYY'),
        endDate: moment(this.state.endDate,'MM-DD-YYYY').format('MM-DD-YYYY'),
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

  getDates() {
    var dateArray = [];
    if (this.state.startDate !== '' && this.state.endDate !== '') {
      var currentDate = this.state.startDate;
      var stopDate = this.state.endDate;
      while (currentDate <= stopDate) {
        dateArray.push(moment(currentDate, 'MM-DD-YYYY'));
        currentDate = moment(currentDate, 'MM-DD-YYYY').add(1, 'days').format('MM-DD-YYYY');
      }
      this.setState({dateArray});
    }
  }

  render() {
    const dayofTheWeekIndeces =
  {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6
    };

    var totalHours= 0;
    var dayOffItems = this.state.dateArray.map(date => {
      var dayofTheWeekIndex = dayofTheWeekIndeces[date.format('dddd')];
      var shiftDay = this.props.schedule[dayofTheWeekIndex];
      var hours = 0;
      if(shiftDay.work) {
        var startAMPM = shiftDay.start.slice(-2,-1).toLowerCase();
        var endAMPM = shiftDay.end.slice(-2,-1).toLowerCase();
        var startTime = moment(shiftDay.start, 'hh:mm ' + startAMPM);
        var endTime = moment(shiftDay.end, 'hh:mm ' + endAMPM);
        var duration = moment.duration(endTime.diff(startTime));
        hours = parseInt(duration.asMinutes()) / 60;
        if (hours < 0) {
          hours = hours + 12;
        }
        totalHours += hours;
      }
      console.log("Helloo shiftday start: " + shiftDay.start)
      return (
        <DayOffItem
          work={shiftDay.work}
          key={date}
          date={date.format('dddd, MMMM Do')}
          startTime={shiftDay.start}
          endTime={shiftDay.end}
          hours={hours}
        />
      );
    });


    return(
      <View style={{ flex: 1 }}>
        <HeaderBar
          navigation={this.props.navigation}
          company={this.props.screenProps.company.data.name}
        />
        <SectionHeader title="Time Off" top="true" />
        <SubHeader title="Create Request" />

        <MyDatePicker
          label="Start Date"
          value={this.state.startDate}
          required={true}
          modifiable={true}
          onChangeText={startDate => {
            this.setState({startDate}, () => this.getDates());
            this.setState({maxDateStart: startDate});
          }}
          onCloseModal={()=> this.setState({hours: totalHours.toString()})}
          minDate={this.state.minDateStart}
        />
        <MyDatePicker
          label="End Date"
          value={this.state.endDate}
          required={true}
          modifiable={true}
          onChangeText={endDate => {
            this.setState({endDate}, () => this.getDates());
          }}
          onCloseModal={()=> this.setState({hours: totalHours.toString()})}
          minDate={this.state.maxDateStart}
        />
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
              label: 'PTO (' + this.props.PTO.available + ' hours available)',
              value: 'PTO',
            },
            {
              label: 'Sick Day (' + this.props.sickDay.available + ' hours available)',
              value: 'Sick Day',
            },
            {
              label: 'Floating Holiday (' + this.props.floatingHoliday.available + ' hours available)',
              value: 'Floating Holiday',
            },

          ]}
          onChangeText={type => this.setState({type})}
        />
        <SubHeader title="Amount" rightText={'Total: ' + this.state.hours + ' hours'} />

        <ScrollView>{dayOffItems}</ScrollView>
        <View style={styles.buttonsView}>
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Time Off')}>
            <Text style={styles.buttonText} > Cancel </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button,{backgroundColor: '#339933'}]} onPress={()=> this.submit()} >
            <Text style={styles.buttonText}> Submit </Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }

}

var {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  buttonsView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5
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
  const {shifts, timeOffRequests,schedule, timeOffBalances} = state.employee.data;
  const {floatingHoliday, PTO, sickDay} = state.employee.data.timeOffBalances;

  return {shifts, floatingHoliday, PTO, sickDay, timeOffRequests, schedule};

};


export default connect(mapStateToProps, {requestUpdate, hoursUpdate})(RequestPage);
