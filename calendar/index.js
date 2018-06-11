import React from 'react';
import {View, StyleSheet} from 'react-native';
import HeaderBar from '../headerBar/index';
import SectionHeader from '../sectionHeader/index';
import Calendar from './calendar';

const CalendarPage = props => {
  const {schedule, shifts} = props.screenProps.employee.data;
  const {events} = props.screenProps.company.data;
  return (
    <View style={StyleSheet.absoluteFill}>
      <HeaderBar
        navigation={props.navigation}
        company={props.screenProps.company.data.name}
        newNotificationCount={
          props.screenProps.employee.data.newNotifications.length
        }
      />

      <SectionHeader title="Calendar" top="true" />
      <Calendar
        schedule={schedule}
        shifts={shifts}
        events={events}
        navigation={props.navigation}
      />
    </View>
  );
};

export default CalendarPage;
