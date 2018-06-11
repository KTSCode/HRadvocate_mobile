import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {Card} from 'react-native-elements';
import {CalendarList} from 'react-native-calendars';

import HeaderBar from '../headerBar/index';
import SectionHeader from '../sectionHeader/index';

const Home = props => {
  const events = props.screenProps.company.data.events;
  const {schedule, shifts} = props.screenProps.employee.data;
  const articles = props.screenProps.company.data.articles;

  // this marks the dates on which you have shifts or events
  var marked_dates = {};
  // pull schedule and shifts out of props
  const shift = {key: 'shift', color: '#EE3E4B', selectedDotColor: '#EE3E4B'};
  const work_event = {key: 'work_event', color: '#1E98C7'};
  // initializes 50 dates on either side of the current date
  for (let i = -50; i < 50; i++) {
    const time = Date.now() + i * 24 * 60 * 60 * 1000;
    const strTime = timeToString(time); // converts date to string
    const numDay = timeToDay(time); // gets the number for the day of the week
    // initialize
    marked_dates[strTime] = {dots: []};

    //adds employee shifts from schedule
    if (schedule[numDay].work) {
      marked_dates[strTime] = {dots: [shift]};
    }
  }

  // goes through all employee shifts from shift list and adds them
  shifts.forEach(s => {
    marked_dates[s.date].dots.push(shift);
  });

  // goes through all company events and adds them
  events.forEach(event => {
    marked_dates[event.date].dots.push(work_event);
  });

  return (
    <View style={StyleSheet.absoluteFill}>
      <HeaderBar
        navigation={props.navigation}
        company={props.screenProps.company.data.name}
        newNotificationCount={
          props.screenProps.employee.data.newNotifications.length
        }
      />
      <ScrollView style={styles.articleContainer}>
        <SectionHeader title="Company Calendar" top="true" />
        <View style={styles.calendarContainer}>
          <CalendarList
            markedDates={marked_dates}
            markingType={'multi-dot'}
            horizontal={true}
            pagingEnabled={true}
            pastScrollRange={5}
            futureScrollRange={7}
            showScrollIndicator={true}
            current={'2018-06-01'}
            onDayPress={day => {
              props.navigation.navigate('Calendar', {date: day.dateString});
            }}
            hideExtraDays={true}
            firstDay={1}
            showWeekNumbers={false}
          />
        </View>
        <SectionHeader title="News & Announcements" />
        {articles.map((a, i) => {
          return (
            <View key={i}>
              <Card title={a.title} image={{uri: a.image}}>
                <Text>{a.description}</Text>
              </Card>
            </View>
          );
        })}
        <View style={{height: 20}} />
      </ScrollView>
    </View>
  );
};

const timeToString = time => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};
// Sunday - Saturday : 0 - 6
const timeToDay = time => {
  const date = new Date(time);
  return date.getDay();
};

const styles = StyleSheet.create({
  articleContainer: {
    flexDirection: 'column',
  },
  calendarContainer: {
    flexDirection: 'column',
  },
});

export default Home;
