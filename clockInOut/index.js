import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Card, ListItem} from 'react-native-elements';
import TimerCountdown from 'react-native-timer-countdown';
import DropdownAlert from 'react-native-dropdownalert';
import HeaderBar from '../headerBar/index';
import ToastBox from '../toastBox/index';
import SectionHeader from '../sectionHeader/index';
import SubHeader from '../commonComponents/SubHeader'
import Button from '../button/index';

const Notifications = props => {
  //TODO add errors
  const {
    clocked,
    clock_in_button,
    countdown,
    failed,
    message,
  } = props.screenProps.timeclock;
  const dispatch = props.screenProps.dispatch;
  const {schedule} = props.screenProps.employee.data;
  const {clockRangeMins} = props.screenProps.company.data;
  const all_shifts = props.screenProps.employee.data.shifts;
  const shifts = shiftOrganizer(schedule, all_shifts);
  const countdown_time = getCountdownTime(
    shifts[0].date,
    shifts[0].end,
    shifts[0].start,
    countdown,
    clocked,
  );
  const rightDate = (day, date) => {
    return (
      <View style={{width: 55}}>
        <Text style={styles.upcomingDateDay}> {day} </Text>
        <Text style={styles.upcomingDateDate}> {date.match(/\d+$/)[0]} </Text>
      </View>
    );
  };

  //TODO use this for geo-fencing and any clock in/out errors that could occur
  //<ToastBox
  //  color="#EE3E4B"
  //  title="You Can't Clock In Yet"
  //  text="Please Try Again Later"
  //  icon="error"
  //  style={{padding: 15}}
  ///>
  return (
    <View style={StyleSheet.absoluteFill}>
      <HeaderBar
        navigation={props.navigation}
        company={props.screenProps.company.data.name}
        newNotificationCount={
          props.screenProps.employee.data.newNotifications.length
        }
      />

      <SectionHeader title="Clock In/Out" top="true" />
      <View style={{alignItems: 'center', paddingTop: 40}}>
      {clocked ? (
        <Text style={{fontSize: 18}}> Your Next Shift Ends In:  </Text>
      ) : (
        <Text style={{fontSize: 18}}> Your Next Shift Starts In:  </Text>
      )}

      </View>
      <View style={styles.countdownContainer}>
        <TouchableOpacity
          onPress={() => dispatch({type: 'SET_COUNTDOWN', time: 10000})}
          onLongPress={() =>
            dispatch({type: 'SET_COUNTDOWN', time: clockRangeMins * 61000})
          }>
          <TimerCountdown
            initialSecondsRemaining={countdown_time >= 0 ? countdown_time : 0}
            onTick={secs => {
              if (secs < clockRangeMins * 60000 && !clock_in_button) {
                dispatch({type: 'CLOCK_IN_ENABLED', time: secs});
              }
              if (secs >= clockRangeMins * 60000 && clock_in_button) {
                dispatch({type: 'CLOCK_IN_DISABLED', time: secs});
              }
            }}
            allowFontScaling={true}
            style={styles.countdownText}
          />
        </TouchableOpacity>
      </View>
      <View style={{padding: 20}}>
        {!clocked && (
          <View>
            <Button
              onPress={() => {
                dispatch({
                  type: 'CLOCK_IN',
                  time: Date.now(),
                });
                this.dropdown.alertWithType('success', 'Success','You have successfully clocked in!');
              }}
              disabled={!clock_in_button}
              text="Clock In"
              buttonStyle={{height: 60}}
              textStyle={{fontSize: 16}}
            />
          </View>
        )}
        {clocked && (
          <Button
            onPress={() => {
              dispatch({
                type: 'CLOCK_OUT',
                time: Date.now(),
              });
              this.dropdown.alertWithType('success', 'Success','You have successfully clocked out!');
            }}
            text="Clock Out"
            buttonStyle={{height: 60, backgroundColor: 'red'}}
            textStyle={{fontSize: 16}}
          />
        )}
      </View>
      <SubHeader title="Upcoming Shifts" />
      <ScrollView style={styles.notificationsContainer}>
        {shifts.map((s, i) => {
          return (
            <ListItem
              key={i}
              leftIcon={{name: 'schedule'}}
              title={s.location.toUpperCase()}
              subtitle={s.start + ' - ' + s.end}
              rightIcon={rightDate(s.day, s.date)}
              rightTitle={
                // I'm sorry about this
                i == 0 ? (clocked ? 'Current Shift' : 'Next Shift') : ' '
              }
              rightTitleStyle={styles.NextShiftText}
            />
          );
        })}
      </ScrollView>
      <DropdownAlert messageNumOfLines={12} ref={ref => this.dropdown = ref} />
    </View>
  );
};

//Converts standard time strings to militiary time
const convertTime = time_str => {
  var time = time_str;
  var hours = Number(time.match(/^(\d+)/)[1]);
  var minutes = Number(time.match(/:(\d+)/)[1]);
  var AMPM = time.match(/[A-Z]M/)[0];
  if (AMPM == 'PM' && hours < 12) hours = hours + 12;
  if (AMPM == 'AM' && hours == 12) hours = hours - 12;
  var sHours = hours.toString();
  var sMinutes = minutes.toString();
  if (hours < 10) sHours = '0' + sHours;
  if (minutes < 10) sMinutes = '0' + sMinutes;
  return sHours + ':' + sMinutes + ':00';
};

const timeFromNow = (date, time) => {
  const temp_date = new Date(date + 'T' + convertTime(time));
  const adjusted_time =
    temp_date.getTime() + 60000 * temp_date.getTimezoneOffset();
  return adjusted_time - Date.now();
};

const shiftOrganizer = (schedule, all_shifts) => {
  const DotW = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
  var return_shifts = [];
  //const cur_date = new Date();
  // add the next weeks worth of scheduled shifts to return_shifts
  for (var i = 0; i < 7; i++) {
    var temp_date = new Date(Date.now() + i * 24 * 60 * 60 * 1000);
    if (schedule[temp_date.getDay()].work) {
      var temp_shift = schedule[temp_date.getDay()];
      temp_shift.date = temp_date.toISOString().split('T')[0];
      temp_shift.day = DotW[temp_date.getDay()];
      return_shifts.push(schedule[temp_date.getDay()]);
    }
  }
  // Adds all upcoming scheduled shifts
  all_shifts.forEach(s => {
    if (timeFromNow(s.date, s.end) > 0) {
      s.day = DotW[new Date(s.date + 'T' + convertTime(s.start)).getDay()];
      return_shifts.push(s);
    }
  });
  return return_shifts;
};

const getCountdownTime = (date, end, start, cd, clkd) => {
  if (cd > 0) return cd;
  else if (clkd) return timeFromNow(date, end);
  else return timeFromNow(date, start);
};

const styles = StyleSheet.create({
  notificationsContainer: {
    flexDirection: 'column',
  },
  countdownContainer: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    color: 'white',
  },
  countdownText: {
    color: 'blue',
    fontSize: 60,
    fontWeight: 'bold',
  },
  upcomingDateDay: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  upcomingDateDate: {
    color: 'white',
    textAlign: 'center',
  },
  NextShiftText: {
    color: '#339933',
    fontWeight: 'bold',
  },
});

export default Notifications;
