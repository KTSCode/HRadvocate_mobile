import React from 'react';
import {View, StyleSheet, Text, ScrollView, Alert} from 'react-native';
import {Card, ListItem} from 'react-native-elements';
import TimerCountdown from 'react-native-timer-countdown';

import HeaderBar from '../headerBar/index';
import SectionHeader from '../sectionHeader/index';
import Button from '../button/index';

const shiftOrganizer = (schedule, all_shifts) => {
  const DotW = ['Sun', 'Mon', 'Wed', 'Tues', 'Thurs', 'Fri', 'Sat'];
  var return_shifts = [];
  const cur_date = new Date();
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
    if(timeFromNow(s.date, s.end) > 0) {
      s.day = DotW[new Date(s.date + 'T' + convertTime(s.start)).getDay()];
      return_shifts.push(s);
    }
  })
  return return_shifts;
};
const Notifications = props => {
  //TODO add errors
  const {clocked, failed, message} = props.screenProps.timeclock;
  const dispatch = props.screenProps.dispatch;
  const {schedule} = props.screenProps.employee.data;
  const all_shifts = props.screenProps.employee.data.shifts;
  const shifts = shiftOrganizer(schedule, all_shifts);
  const countdown_time = clocked
    ? timeFromNow(shifts[0].date, shifts[0].end)
    : timeFromNow(shifts[0].date, shifts[0].start);
  const rightDate = (day, date) => {
    return (
      <View style={{width: 45}}>
        <Text style={styles.upcomingDateDay}> {day} </Text>
        <Text style={styles.upcomingDateDate}> {date.match(/\d+$/)[0]} </Text>
      </View>
    );
  };
  return (
    <View style={StyleSheet.absoluteFill}>
      <HeaderBar
        navigation={props.navigation}
        company={props.screenProps.company.data.name}
      />
      {clocked ? (
        <SectionHeader title="Your Next Shift Ends In:" top="true" />
      ) : (
        <SectionHeader title="Your Next Shift Starts In:" top="true" />
      )}
      <View style={styles.countdownContainer}>
        <TimerCountdown
          initialSecondsRemaining={countdown_time}
          allowFontScaling={true}
          style={styles.countdownText}
        />
      </View>
      <SectionHeader title="Clock In/Out" />
      <View style={{padding: 20}}>
        {!clocked && (
          <Button
            onPress={() => {
              dispatch({type: 'CLOCK_IN'});
            }}
            text="Clock In"
            buttonStyle={{height: 60}}
            textStyle={{fontSize: 25}}
          />
        )}
        {clocked && (
          <Button
            onPress={() => {
              dispatch({type: 'CLOCK_OUT'});
            }}
            text="Clock Out"
            buttonStyle={{height: 60, backgroundColor: 'red'}}
            textStyle={{fontSize: 25}}
          />
        )}
      </View>
      <SectionHeader title="Upcoming Shifts" />
      <ScrollView style={styles.notificationsContainer}>
        {shifts.map((s, i) => {
          return (
            <ListItem
              key={i}
              leftIcon={{name: 'schedule'}}
              title={s.location.toUpperCase()}
              subtitle={s.start + ' - ' + s.end}
              rightIcon={rightDate(s.day, s.date)}
              rightTitle={i == 0 ? 'Next Shift' : ' '}
            />
          );
        })}
      </ScrollView>
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
  const adjusted_time = temp_date.getTime() + (60000 * temp_date.getTimezoneOffset());
  return adjusted_time - Date.now();
};

const styles = StyleSheet.create({
  notificationsContainer: {
    flexDirection: 'column',
  },
  countdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#DFDFDF',
  },
  countdownText: {
    color: '#3F4952',
    fontSize: 80,
    fontWeight: 'bold',
  },
  upcomingDateDay: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  upcomingDateDate: {
    color: '#3F4952',
    textAlign: 'center',
  },
});

export default Notifications;
