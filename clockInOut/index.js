import React from 'react';
import {View, StyleSheet, Text, ScrollView, Alert} from 'react-native';
import {Card, ListItem} from 'react-native-elements';
import TimerCountdown from 'react-native-timer-countdown';

import HeaderBar from '../headerBar/index';
import SectionHeader from '../sectionHeader/index';
import Button from '../button/index';

const Notifications = props => {
  const shifts = [
    {
      location: 'office',
      startTime: '9:00 AM',
      endTime: '5:00 PM',
      day: 'Fri',
      date: '18',
    },
    {
      location: 'office',
      startTime: '9:00 AM',
      endTime: '5:00 PM',
      day: 'Mon',
      date: '21',
    },
    {
      location: 'office',
      startTime: '9:00 AM',
      endTime: '5:00 PM',
      day: 'Tues',
      date: '22',
    },
    {
      location: 'office',
      startTime: '9:00 AM',
      endTime: '5:00 PM',
      day: 'Wed',
      date: '23',
    },
    {
      location: 'office',
      startTime: '9:00 AM',
      endTime: '5:00 PM',
      day: 'Thurs',
      date: '24',
    },
    {
      location: 'office',
      startTime: '9:00 AM',
      endTime: '5:00 PM',
      day: 'Fri',
      date: '18',
    },
    {
      location: 'office',
      startTime: '9:00 AM',
      endTime: '5:00 PM',
      day: 'Mon',
      date: '21',
    },
    {
      location: 'office',
      startTime: '9:00 AM',
      endTime: '5:00 PM',
      day: 'Tues',
      date: '22',
    },
    {
      location: 'office',
      startTime: '9:00 AM',
      endTime: '5:00 PM',
      day: 'Wed',
      date: '23',
    },
    {
      location: 'office',
      startTime: '9:00 AM',
      endTime: '5:00 PM',
      day: 'Thurs',
      date: '24',
    },
  ];
  const rightDate = (day, date) => {
    return(
      <View style={{width: 45 }}>
        <Text style={styles.upcomingDateDay}> {day} </Text>
        <Text style={styles.upcomingDateDate}> {date} </Text>
      </View>
    )
  }
  //FIXME put me back in the HeaderBar
  //company={props.screenProps.company.data.name}
  return (
    <View style={StyleSheet.absoluteFill}>
      <HeaderBar navigation={props.navigation} company="ABC Company" />
      <SectionHeader title="Your Next Shift Starts In:" top="true"/>
      <View style={styles.countdownContainer}>
        <TimerCountdown
          initialSecondsRemaining={360000}
          allowFontScaling={true}
          style={styles.countdownText}
        />
      </View>
      <SectionHeader title="Clock In/Out" />
      <View style={{padding: 20}}>
        <Button
          onPress={() => {
            alert('Clocked In');
          }}
          text="Clock In"
          buttonStyle={{height: 60,}}
          textStyle={{fontSize: 25}}
        />
      </View>
      <SectionHeader title="Upcoming Shifts" />
      <ScrollView style={styles.notificationsContainer}>
        {shifts.map((s, i) => {
          return (
            <ListItem
              key={i}
              leftIcon={{name: 'schedule'}}
              title={s.location.toUpperCase()}
              subtitle={s.startTime + ' - ' + s.endTime}
              rightIcon={rightDate(s.day, s.date)}
              rightTitle={i == 0 ? 'Next Shift' : ' '}
            />
          );
        })}
      </ScrollView>
    </View>
  );
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
