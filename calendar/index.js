import React from 'react';
import {View, StyleSheet, Text, ScrollView, Alert, Button} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import HeaderBar from '../headerBar/index';
import SectionHeader from '../sectionHeader/index';
import ToastBox from '../toastBox/index';

const Documents = props => {
  const events = props.screenProps.company.data.events;
  const articles = props.screenProps.company.data.articles;
  const markedDates = Object.assign.apply(
    Object,
    events.map(elem => {
      var obj = {};
      obj[elem.date] = {
        selected: true,
        marked: true,
        dotColor: 'blue',
      };
      return obj;
    }),
  );

  return (
    <View style={StyleSheet.absoluteFill}>
      <HeaderBar navigation={props.navigation} />
      <SectionHeader title="Documents" top="true" />
      <ScrollView style={styles.articleContainer}>
        <View style={{height: 10}} />
      </ScrollView>
      <SectionHeader title="Calendar" />
        <View style={styles.calendarContainer}>
          <CalendarList
            markedDates={markedDates}
            horizontal={true}
            pagingEnabled={true}
            pastScrollRange={5}
            futureScrollRange={7}
            showScrollIndicator={true}
            current={'2018-06-01'}
            onDayPress={day => {
              const event = getEvent(day.dateString, events);
              Alert.alert(event[0], event[1]);
            }}
            hideExtraDays={true}
            firstDay={1}
            showWeekNumbers={false}
          />
        </View>
    </View>
  );
};

const getEvent = (date, events) => {
  var event = events.find(elem => {
    return elem.date == date;
  });
  if (event) {
    return [event.title, event.description];
  } else {
    return [date, 'no events'];
  }
};

const styles = StyleSheet.create({
  articleContainer: {
    flexDirection: 'column',
  },
  calendarContainer: {
    flexDirection: 'column',
  },
  cardImage: {
    height: 100,
  },
});


export default Documents;
