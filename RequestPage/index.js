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
import DropdownAlert from 'react-native-dropdownalert';
import MyDatePicker from '../commonComponents/DatePicker';
import Picker from '../commonComponents/Picker';
import HeaderBar from '../headerBar/index';
import SectionHeader from '../sectionHeader/index';
import SubHeader from '../commonComponents/SubHeader';
import DayOffItem from './DayOffItem';
import Input from '../commonComponents/Input';

class RequestPage extends Component {

  //component level state that is used to create request and manage component logic
  state = {
    //all created requests start off as pending
    //these six fields are used to create a request object
    status: 'pending',
    note: '',
    requestedOn: '',
    startDate: '',
    endDate: '',
    hours: 0,
    type: '',

    //these components are used to dynamically update minimum and maximum dates
    //this is used so that user can not input a start date that is past the end date
    //and vice versa
    startDateMin: moment().add(1, 'days').format('MM-DD-YYYY'),
    endDateMin: moment().add(1, 'days').format('MM-DD-YYYY'),
    startDateMax: '',
    //date array is used to store all the information for each requested day
    //it stores the date, hours, start time and end time for each day as an object
    //and each object is stored in the array
    //the date array is iterated over to display this information to the user
    dateArray: [],
  };

  //function that is called when the user submits their request
  submit() {
    //if one of the fields is missing, creates error message
    //notifies user and returns without submitting
    if (!this.state.type || !this.state.startDate || !this.state.endDate) {
      var error = 'Please fill out all Required Fields.\n'
      if (!this.state.startDate){
        error += 'Missing Field: Start Date\n';
      }
      if (!this.state.endDate){
        error += 'Missing Field: End Date\n';
      }
      if (!this.state.type){
        error += 'Missing Field: Type\n';
      }
      this.dropdown.alertWithType('error', 'Error', error);
      return;
    }
    //if 0 hours have been requested, notifies user and returns without submitting
    if(this.state.hours === 0) {
      this.dropdown.alertWithType(
        'error',
        'Error',
        'No hours have been requested.');
      return;
    }

    //picker returns value differently than how it is stored
    //in the jSON file so this value is parsed
    //and different information needed about it is returned

    //first letter of picker is returned to get information about it
    var type = this.state.type[0].toLowerCase();
    //info returned from this
    //ie. Sick Day, sickDay and sickDay: {available: 60, pending: 20, used: 50}
    var {typeName, objectName, typeObject} = this.getTypeInfo(type);

    //if there are enough available hours for this request

    if (typeObject.available >= this.state.hours) {

      //get the request info from the component level state
      var request = {
        status: this.state.status,
        note: this.state.note,
        requestedOn: moment().format('MM-DD-YYYY'),
        startDate: moment(this.state.startDate, 'MM-DD-YYYY').format('MM-DD-YYYY'),
        endDate: moment(this.state.endDate, 'MM-DD-YYYY').format('MM-DD-YYYY'),
        type: typeName,
        hours: this.state.hours,
      };

      //subtracts the requested hours from balances and adds to pending
      var newBalances = {
        available: typeObject.available - this.state.hours,
        pending: typeObject.pending + this.state.hours,
        approved:typeObject.approved,
        used: typeObject.used,
      }

      //calls action creator to update requests(adds request to request Array)in redux
      this.props.requestUpdate(request);
      //calls hours action creator to update balances object with new hours
      this.props.hoursUpdate({prop: objectName, value: newBalances});
      //notifies the user of a successful request
      this.dropdown.alertWithType('success', 'Success', 'Your request has been sent!');
    } else{
      //notifies the user if they did not have enough hours to complete the request
      this.dropdown.alertWithType('error', 'Error', 'You do not have enough ' + typeName + ' hours for this request!');
    }
  }

  //function used to retreive information from  picker value
  //as described above
  //ie. from the letter s, it retrieves
  //Sick Day, sickDay and sickDay: {available: 60, pending: 20, used: 50}
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

  //creates date object from the date passed to it
  //checks to see what day of the week that day is
  //and uses that to see whether or not a shift is scheduled
  //in the schedule array in the Json file
  getDateObject(currentDate) {
    var date = moment(currentDate, 'MM-DD-YYYY').format('MM-DD-YYYY');
    var dayofTheWeekIndex = this.getDayOfTheWeekIndeces(
      moment(currentDate, 'MM-DD-YYYY').format('dddd'));
    var shiftDay = this.props.schedule[dayofTheWeekIndex];
    var hours = 0;
    //if a shift is scheduled for the day
    //uses start and end time to calculate hours
    if (shiftDay.work) {
      hours = this.getShiftHours(shiftDay);
    }
    //returns Date object with shift info
    //original time is used to distinguish from
    //the custom hours set by the user

    return {
      date,
      hours,
      startTime: shiftDay.start,
      endTime: shiftDay.end,
      originalStartTime: shiftDay.start,
      originalEndTime: shiftDay.end,
    };
  }


  //every time there is a change in the date range (date picker was updated)
  //or time range for a work day (time picker was updated)
  //this function is called
  //it updates the dateArray from the component level state

  updateDateArray() {
    if (this.state.startDate !== '' && this.state.endDate !== '') {
      var dateArray = [];
      var hours = 0;
      var currentDate = this.state.startDate;
      var stopDate = this.state.endDate;

      //iterates through current range
      while (currentDate <= stopDate) {

        //checks to see if date is already in current date array
        //if there is, it retrieves it
        var dateObject = this.state.dateArray.find(function(element) {
          return element.date === currentDate;
        })
        //if it is not, it creates a day object for that day
        if (typeof dateObject === 'undefined'){
          dateObject = this.getDateObject(currentDate);
        }
        //adds the day to the new Array
        //and updates total hours
        hours += dateObject.hours;
        dateArray.push(dateObject);
        //adds one day to the current day (for iteratiing)
        currentDate = moment(currentDate, 'MM-DD-YYYY')
          .add(1, 'days').format('MM-DD-YYYY');
      }

      //updates dateArray and hours from component level state

      this.setState({dateArray, hours});
    }
  }

  //passed to children components so that if the hours
  //of a specific day change, this component can update

  updateParentState(dateObject, newDateObject) {
    var index = this.state.dateArray.indexOf(dateObject);
    this.state.dateArray[index] = newDateObject;
    this.updateDateArray();
  }


  //translates days of the week to indeces

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


  //uses shift start time and end time to retreive hours

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

  //maps through date array and creates DayOffItem component for each

  renderDateItems() {
    return this.state.dateArray.map(dateObject => {
      return (
        <DayOffItem
          work={!(typeof dateObject.originalStartTime === 'undefined')}
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
      //flex: 1 needed for scroll view
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
            //updates its own values, as well as entire date Array
            //also updates endDateMin so that end Date value can be no
            //less than value of the current Start date

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

            //updates its own values, as well as entire date Array
            //also updates startDateMax so that start Date value can be no
            //more than value of the current End date

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
            //options, display the available hours for each type to the user

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
            //optional input uses multiline text input
            label="Reason"
            value={this.state.note}
            onChangeText={note => this.setState({note})}
            required={false}
            modifiable={true}
          />
        </View>
        {
          //shows user total amount of hours in date range dynamically
        }
        <SubHeader
          title="Amount"
          rightText={'Total: ' + this.state.hours + ' hours'}
        />
        {
          //shows requested date items
          //each date allows the user modify hours for that specific day
        }
        <ScrollView>{this.renderDateItems()}</ScrollView>
        {
          //cancel button shows user message and takes them back to time request page
          //this is done through DropdownAlert onClose function
        }
        <View style={styles.buttonsView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.dropdown.alertWithType('info', 'Info','Request was canceled.')}>
            <Text style={styles.buttonText}> Cancel </Text>
          </TouchableOpacity>
          {
            //submit button calls submit function and shows
            //user success message, it then redirects them back to time request page
            //this is done through DropdownAlert onClose function
          }
          <TouchableOpacity
            style={[styles.button,{backgroundColor: '#339933'}]}
            onPress={()=> this.submit()}>
            <Text style={styles.buttonText}> Submit </Text>
          </TouchableOpacity>
        </View>

        <DropdownAlert
          messageNumOfLines={12}
          onClose={data => {
            if (data.type !== 'error'){
              this.props.navigation.navigate('Time Off')
            }}}
          closeInterval={1500}
          ref={ref => this.dropdown = ref} />
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

//gets information from redux
const mapStateToProps = state => {
  const {shifts, timeOffRequests, schedule} = state.employee.data;
  const {floatingHoliday, PTO, sickDay} = state.employee.data.timeOffBalances;

  return {shifts, timeOffRequests, schedule, floatingHoliday, PTO, sickDay};
};

//second arguments are to access action creators
export default connect(mapStateToProps, {requestUpdate, hoursUpdate})(RequestPage);
