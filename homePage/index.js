import React from 'react';
import {View, StyleSheet, Text, ScrollView, Alert} from 'react-native';
import {Card} from 'react-native-elements';
import {CalendarList} from 'react-native-calendars';

import HeaderBar from '../headerBar/index';
import SectionHeader from '../sectionHeader/index';

const Home = props => {
  const events = props.screenProps.company.data.events;
  const articles = props.screenProps.company.data.articles;
  //Converts events array into a marked date object
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
});

export default Home;
