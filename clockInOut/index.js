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
  ];
  //FIXME put me back in the HeaderBar
  //company={props.screenProps.company.data.name}
  return (
    <View style={StyleSheet.absoluteFill}>
      <HeaderBar navigation={props.navigation} company="company" />
      <View />
      <SectionHeader title="Clock In/Out" top="true" />
      <Button
        onPress={() => {
          alert('hi');
        }}
        text="Clock In"
        buttonStyle={{height: 60, backgroundColor: '#339933'}}
        textStyle={{fontSize: 25}}
      />
      <SectionHeader title="Your Next Shift Starts In:" />
      <View style={styles.countdownContainer}>
        <TimerCountdown
          initialSecondsRemaining={36000000}
          allowFontScaling={true}
          style={styles.countdownText}
        />
      </View>
      <SectionHeader title="Upcoming Shifts" />
      <ScrollView style={styles.notificationsContainer}>
        {shifts.map((s, i) => {
          return (
            <ListItem
              key={i}
              title={s.location.toUpperCase()}
              subtitle={s.startTime + ' - ' + s.endTime}
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
    fontSize: 95,
    fontWeight: 'bold',
  },
});

export default Notifications;
